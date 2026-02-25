"use client";

import { primaryColor } from "@/components/utils/Colors";
import { getAuth } from "@/lib/auth-storage";
import { Alert, Box, Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import { FiArrowLeft } from "react-icons/fi";

const INPUT_BG = "rgba(236, 236, 237, 1)";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#000",
      "::placeholder": { color: "#a0a0a0" },
    },
    invalid: {
      color: "#dc2626",
    },
  },
  hidePostalCode: true,
};

function PaymentForm({ clientSecret, paymentIntentId, onSuccess, disabled }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      Swal.fire({ icon: "warning", title: "Error", text: "Card field not found" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
      if (error) {
        await Swal.fire({ icon: "error", title: "Payment failed", text: error.message || "Try again" });
        setLoading(false);
        return;
      }
      const token = getAuth().token;
      const res = await fetch("/api/stripe/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentIntentId }),
      });
      const data = await res.json();
      if (!res.ok) {
        await Swal.fire({ icon: "error", title: "Error", text: data.message || "Could not record payment" });
        setLoading(false);
        return;
      }
      await Swal.fire({ icon: "success", title: "Payment successful!", text: data.message });
      onSuccess();
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong" });
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 440, mx: "auto" }}>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: "rgba(236, 236, 237, 0.5)",
          mb: 2,
        }}
      >
        <CardElement options={CARD_OPTIONS} />
      </Box>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={disabled || loading || !stripe}
        sx={{
          bgcolor: primaryColor,
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
          py: 1.5,
          borderRadius: 2,
          textTransform: "none",
          "&:hover": { bgcolor: "#7A2FE5" },
        }}
      >
        {loading ? <BeatLoader color="#fff" size={10} /> : "Pay $29 / month"}
      </Button>
    </Box>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  useEffect(() => {
    const { token } = getAuth();
    if (!token) {
      router.replace("/login");
      return;
    }
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.paymentStatus === "active") {
          setAlreadyPaid(true);
          setLoading(false);
          return null;
        }
        return fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => r.json());
      })
      .then((data) => {
        if (data === null) return;
        if (data?.success && data?.clientSecret) {
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
        } else if (data?.message) {
          setError(data.message);
        } else {
          setError("Could not start payment");
        }
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleSuccess = () => {
    router.replace("/user/dashboard");
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <BeatLoader color={primaryColor} size={14} />
      </Box>
    );
  }
  if (alreadyPaid) {
    return (
      <Box sx={{ p: 4, maxWidth: 440, mx: "auto" }}>
        <Alert
          severity="success"
          sx={{ mb: 3, borderRadius: 2 }}
        >
          You have already paid. You have full access to the dashboard.
        </Alert>
        <Button
          fullWidth
          variant="contained"
          disabled
          sx={{
            bgcolor: "rgba(0,0,0,0.2)",
            color: "#666",
            fontWeight: 700,
            fontSize: 16,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            mb: 2,
          }}
        >
          Already paid
        </Button>
        <Button
          fullWidth
          component={Link}
          href="/user/dashboard"
          variant="contained"
          sx={{
            bgcolor: primaryColor,
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            mb: 2,
            "&:hover": { bgcolor: "#7A2FE5" },
          }}
        >
          Go to dashboard
        </Button>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "stretch" }}>
          <Button
            component={Link}
            href="/login"
            variant="outlined"
            startIcon={<FiArrowLeft size={18} />}
            sx={{
              borderColor: "transparent",
              bgcolor: INPUT_BG,
              color: "#000",
              fontWeight: 600,
              fontSize: 16,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { bgcolor: "rgba(220, 220, 221, 1)", borderColor: "transparent" },
            }}
          >
            Back to login
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Button
              component={Link}
              href="/"
              sx={{
                color: primaryColor,
                fontWeight: 600,
                fontSize: 15,
                textTransform: "none",
                "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
              }}
            >
              Back to home
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  if (error || !clientSecret) {
    return (
      <Box sx={{ p: 4, maxWidth: 440, mx: "auto", textAlign: "center" }}>
        <Box sx={{ color: "#dc2626", mb: 3 }}>{error || "Missing payment setup"}</Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
          <Button
            component={Link}
            href="/login"
            variant="outlined"
            startIcon={<FiArrowLeft size={18} />}
            sx={{
              borderColor: "transparent",
              bgcolor: INPUT_BG,
              color: "#000",
              fontWeight: 600,
              fontSize: 16,
              py: 1.5,
              px: 3,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { bgcolor: "rgba(220, 220, 221, 1)", borderColor: "transparent" },
            }}
          >
            Back to login
          </Button>
          <Button
            component={Link}
            href="/"
            sx={{
              color: primaryColor,
              fontWeight: 600,
              fontSize: 15,
              textTransform: "none",
              "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
            }}
          >
            Back to home
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 440, mx: "auto" }}>
      <Box
        component="h1"
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: "#000",
          m: 0,
          mb: 1,
        }}
      >
        Complete your payment
      </Box>
      <Box sx={{ fontSize: 15, color: "#000", mb: 3 }}>
        Starter plan — $29/month. Secure payment powered by Stripe.
      </Box>
      <Elements stripe={stripePromise}>
        <PaymentForm
          clientSecret={clientSecret}
          paymentIntentId={paymentIntentId}
          onSuccess={handleSuccess}
        />
      </Elements>
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2, alignItems: "stretch" }}>
        <Button
          component={Link}
          href="/login"
          variant="outlined"
          startIcon={<FiArrowLeft size={18} />}
          sx={{
            borderColor: "transparent",
            bgcolor: INPUT_BG,
            color: "#000",
            fontWeight: 600,
            fontSize: 16,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            "&:hover": { bgcolor: "rgba(220, 220, 221, 1)", borderColor: "transparent" },
          }}
        >
          Back to login
        </Button>
        <Box sx={{ textAlign: "center" }}>
          <Button
            component={Link}
            href="/"
            sx={{
              color: primaryColor,
              fontWeight: 600,
              fontSize: 15,
              textTransform: "none",
              "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
            }}
          >
            Back to home
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
