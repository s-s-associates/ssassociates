export const whiteColor = "rgb(255, 255, 255)"
export const blackColor = "rgb(0, 0, 0)"


// ================= PRIMARY COLOR SYSTEM =================

export const primaryColor = "rgb(239, 139, 0)"
export const primaryLight = "rgb(255, 195, 120)"
export const primaryDark = "rgb(190, 100, 0)"
export const primaryHover = "rgb(210, 100, 0)"
export const primaryBg = "rgba(239, 139, 0, 0.08)"
export const primaryGradient =
  "linear-gradient(135deg, rgb(239, 139, 0), rgb(255, 195, 120))"


// ================= SECONDARY COLOR SYSTEM =================

export const secondaryColor = "rgb(16, 24, 40)"
export const secondaryLight = "rgb(45, 55, 72)"
export const secondaryDark = "rgb(8, 12, 20)"
export const secondaryHover = "rgb(25, 35, 55)"
export const secondaryBg = "rgba(16, 24, 40, 0.08)"
export const secondaryGradient =
  "linear-gradient(135deg, rgb(16, 24, 40), rgb(45, 55, 72))"



// ================= GRAY COLOR SYSTEM =================
export const textGrayDark = "rgb(74, 85, 101)"
export const textGrayLight = "rgb(209, 213, 220)"
export const textGrayHover = "rgb(100, 116, 139)"

// Existing colors (unchanged)
export const primaryColorOld = "rgba(138, 56, 245, 1)"
export const grayColor = "rgba(21, 21, 29, 1)"
export const bggrayColor = "rgba(244, 244, 244, 1)"
export const bordergrayColor = "rgba(217, 217, 217, 1)"

export const statusGreen = "rgba(0, 152, 16, 1)"
export const statusGreenBg = "rgba(217, 255, 221, 1)"
export const statusYellow = "rgba(136, 142, 0, 1)"
export const statusYellowBg = "rgba(253, 255, 208, 1)"
export const statusRed = "rgba(255, 0, 0, 1)"
export const statusRedBg = "rgba(255, 232, 232, 1)"



/** Get status pill style { color, bgcolor } for Ready | Process | Error */
export function getStatusColors(status) {
  switch (status) {
    case "Ready":
      return { color: statusGreen, bgcolor: statusGreenBg }
    case "Process":
      return { color: statusYellow, bgcolor: statusYellowBg }
    case "Error":
      return { color: statusRed, bgcolor: statusRedBg }
    default:
      return { color: grayColor, bgcolor: "#F5F5F5" }
  }
}