export const primaryColor = "#8A38F5"
export const grayColor = "#15151D"
export const bggrayColor = "#f4f4f4"
export const bordergrayColor = "#D9D9D9"

// Status pill colors (text + background pairs)
export const statusGreen = "#009810"
export const statusGreenBg = "#D9FFDD"
export const statusYellow = "#888E00"
export const statusYellowBg = "#FDFFD0"
export const statusRed = "#FF0000"
export const statusRedBg = "#FFE8E8"

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