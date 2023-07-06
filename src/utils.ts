const formatTime = (i: number) => (i < 10 ? `0${i}` : String(i))

function getDayName(dayNumber: number, type: "long" | "short" = "long") {
  const date = new Date(Date.UTC(1970, 0, 4 + dayNumber))

  return date.toLocaleString("ru-RU", { weekday: type }) //toLocaleDateString
}

function getMonthName(monthNumber: number, type: "long" | "short" = "long") {
  const date = new Date()
  date.setMonth(monthNumber)

  return date.toLocaleString("en-EN", { month: type })
}

export const getMinutes_0to23 = Array(24)
  .fill(null)
  .map((_: null, i) => ({ value: i, label: formatTime(i) }))

export const getMinutes_0to59 = Array(60)
  .fill(null)
  .map((_: null, i) => ({ value: i, label: formatTime(i) }))

export const getMinutes_1to60 = Array(60)
  .fill(null)
  .map((_: null, i) => ({ value: i + 1, label: formatTime(i + 1) }))

export const getDaysOfWeek_MON_to_SUN = Array(7)
  .fill(null)
  .map((_: null, i) => ({
    value: i === 6 ? 1 : i + 2,
    label: getDayName(i === 6 ? 0 : i + 1, "short").toUpperCase(),
  }))

export const getMonths_JAN_to_DEC = Array(12)
  .fill(null)
  .map((_, i) => ({
    value: i + 1,
    label: getMonthName(i, "short").toUpperCase(),
  }))
