import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "."
import {
  TCronExpression,
  TInitialState,
  TNotificationParams,
  TPayload,
} from "./types"

export enum cronOptions {
  everyMinute = 1,
  daysOfWeek,
  everyDay,
  everyDayAtMonth,
  custom,
}

const initialState: TInitialState = {
  cronOption: cronOptions.everyMinute,
  everyMinute: {
    params: {
      minutes: 30,
    },
    expression: ["0/30", "*", "*", "*", "?"],
  },
  daysOfWeek: {
    params: {
      days: [2, 4, 6],
      hours: 6,
      minutes: 0,
    },
    expression: ["0", "6", "?", "*", "2,4,6"],
  },
  everyDay: {
    params: {
      slotMinutes: 0,
      firstSlotHours: 6,
      secondSlotHours: 9,
      secondSlotActive: false,
    },
    expression: ["0", "6", "*", "*", "?"],
  },
  everyDayAtMonth: {
    params: {
      months: [1, 6],
      slotMinutes: 30,
      firstSlotHours: 6,
      secondSlotHours: 9,
      secondSlotActive: false,
    },
    expression: ["30", "6", "*", "1,6", "?"],
  },
  cronExpression: ["0/30", "*", "*", "*", "?"],
  notification: null,
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setCronOption: (state, action: PayloadAction<cronOptions>) => {
      state.cronOption = action.payload
      state.notification = null

      switch (action.payload) {
        case cronOptions.everyMinute:
          state.cronExpression = state.everyMinute.expression
          break
        case cronOptions.daysOfWeek:
          state.cronExpression = state.daysOfWeek.expression
          break
        case cronOptions.everyDay:
          state.cronExpression = state.everyDay.expression
          break
        case cronOptions.everyDayAtMonth:
          state.cronExpression = state.everyDayAtMonth.expression
          break

        default:
          break
      }

      return state
    },
    setEveryMinuteParams: (state, action: PayloadAction<TPayload>) => {
      state.everyMinute.params = {
        ...state.everyMinute.params,
        ...action.payload,
      }

      const everyMinuteExpression = [
        `0/${state.everyMinute.params.minutes || "?"}`,
        "*",
        "*",
        "*",
        "?",
      ]

      state.everyMinute.expression = everyMinuteExpression
      state.cronExpression = everyMinuteExpression

      return state
    },
    setDaysOfWeekParams: (state, action: PayloadAction<TPayload>) => {
      state.daysOfWeek.params = {
        ...state.daysOfWeek.params,
        ...action.payload,
      }

      const daysOfWeekExpression = [
        `${state.daysOfWeek.params.minutes}` || "?",
        `${state.daysOfWeek.params.hours || "?"}`,
        "?",
        "*",
        state.daysOfWeek.params.days.join(",") || "?",
      ]

      state.daysOfWeek.expression = daysOfWeekExpression
      state.cronExpression = daysOfWeekExpression

      return state
    },
    setEveryDayParams: (state, action: PayloadAction<TPayload>) => {
      state.everyDay.params = {
        ...state.everyDay.params,
        ...action.payload,
      }

      const expressionHours =
        !state.everyDay.params.secondSlotActive ||
        state.everyDay.params.firstSlotHours ===
          state.everyDay.params.secondSlotHours
          ? `${state.everyDay.params.firstSlotHours}`
          : `${state.everyDay.params.firstSlotHours},${state.everyDay.params.secondSlotHours}`

      const everyDayExpression = [
        `${state.everyDay.params.slotMinutes}`,
        expressionHours,
        "*",
        "*",
        "?",
      ]

      state.everyDay.expression = everyDayExpression
      state.cronExpression = everyDayExpression

      return state
    },
    setEveryDayAtMonthParams: (state, action: PayloadAction<TPayload>) => {
      state.everyDayAtMonth.params = {
        ...state.everyDayAtMonth.params,
        ...action.payload,
      }

      const expressionHours =
        !state.everyDayAtMonth.params.secondSlotActive ||
        state.everyDayAtMonth.params.firstSlotHours ===
          state.everyDayAtMonth.params.secondSlotHours
          ? `${state.everyDayAtMonth.params.firstSlotHours}`
          : `${state.everyDayAtMonth.params.firstSlotHours},${state.everyDayAtMonth.params.secondSlotHours}`

      const everyDayAtMonthExpression = [
        `${state.everyDayAtMonth.params.slotMinutes}`,
        expressionHours,
        "*",
        state.everyDayAtMonth.params.months.join(","),
        "?",
      ]
      console.log(everyDayAtMonthExpression)

      state.everyDayAtMonth.expression = everyDayAtMonthExpression
      state.cronExpression = everyDayAtMonthExpression

      return state
    },
    setNotification: (state, action: PayloadAction<TNotificationParams>) => {
      state.notification = action.payload
    },
    setGlobalCronExpression: (
      state,
      action: PayloadAction<TCronExpression>
    ) => {
      state.cronExpression = action.payload
    },
  },
})

export const {
  setCronOption,
  setEveryMinuteParams,
  setDaysOfWeekParams,
  setEveryDayParams,
  setEveryDayAtMonthParams,
  setNotification,
  setGlobalCronExpression,
} = formSlice.actions
export const selectForm = (state: RootState) => state.form

export default formSlice.reducer
