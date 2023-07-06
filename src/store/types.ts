import { cronOptions } from "./formSlice"

export type TPayload =
  | { days: number[] }
  | { hours: number }
  | { minutes: number }
  | { firstSlotHours: number }
  | { secondSlotHours: number }
  | { slotMinutes: number }
  | { secondSlotActive: boolean }
  | { months: number[] }

export type TNotificationParams = {
  message: string
  type: "info" | "success" | "warning" | "error"
} | null

export type TCronExpression = string[]

export type TInitialState = {
  cronOption: cronOptions
  everyMinute: {
    params: {
      minutes: number
    }
    expression: TCronExpression
  }
  daysOfWeek: {
    params: {
      days: number[]
      hours: number
      minutes: number
    }
    expression: TCronExpression
  }
  everyDay: {
    params: {
      slotMinutes: number
      firstSlotHours: number
      secondSlotHours: number
      secondSlotActive: boolean
    }
    expression: TCronExpression
  }
  everyDayAtMonth: {
    params: {
      months: number[]
      slotMinutes: number
      firstSlotHours: number
      secondSlotHours: number
      secondSlotActive: boolean
    }
    expression: TCronExpression
  }
  cronExpression: TCronExpression
  notification: TNotificationParams | null
}
