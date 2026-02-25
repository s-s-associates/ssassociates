import Payment from "@/models/Payment";

export async function getActivePaymentForUser(userId) {
  const payment = await Payment.findOne({
    userId,
    status: "active",
  }).sort({ paidAt: -1 });
  return payment;
}

export async function hasActivePayment(userId) {
  const payment = await getActivePaymentForUser(userId);
  return !!payment;
}
