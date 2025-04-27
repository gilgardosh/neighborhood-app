// Hebrew month names
export const hebrewMonths = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
]

// Hebrew day names
export const hebrewDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

// Format date to Hebrew format
export function formatDateHebrew(date: Date): string {
  const day = date.getDate()
  const month = hebrewMonths[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ב${month} ${year}`
}

// Format time to Hebrew format
export function formatTimeHebrew(date: Date): string {
  return date.toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

// Get day name in Hebrew
export function getDayNameHebrew(date: Date): string {
  return hebrewDays[date.getDay()]
}

// Format date range for events
export function formatDateRangeHebrew(startDate: Date, endDate: Date): string {
  const sameDay = startDate.toDateString() === endDate.toDateString()

  if (sameDay) {
    return `${formatDateHebrew(startDate)}, ${formatTimeHebrew(startDate)} - ${formatTimeHebrew(endDate)}`
  } else {
    return `${formatDateHebrew(startDate)}, ${formatTimeHebrew(startDate)} - ${formatDateHebrew(endDate)}, ${formatTimeHebrew(endDate)}`
  }
}
