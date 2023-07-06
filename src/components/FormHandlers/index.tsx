import parser from "cron-parser"
import { Button } from "antd"
import {
  cronOptions,
  selectForm,
  setCronOption,
  setDaysOfWeekParams,
  setEveryDayAtMonthParams,
  setEveryDayParams,
  setEveryMinuteParams,
  setGlobalCronExpression,
  setNotification,
} from "../../store/formSlice"
import { useAppDispatch, useAppSelector } from "../../hooks"

type TProps = {
  cronExpression: string
  setCronExpression: (value: string) => void
}

export const FormHandlers = ({ cronExpression, setCronExpression }: TProps) => {
  const dispatch = useAppDispatch()
  const form = useAppSelector((state) => selectForm(state))

  const loadExpressionHandler = () => {
    const success = (cronOption: cronOptions) => {
      dispatch(setCronOption(cronOption))
      dispatch(
        setNotification({
          message: "Выражение успеешно распознано.",
          type: "success",
        })
      )
    }

    try {
      parser.parseExpression(cronExpression)

      const [minutes, hours, dom, months, dow] = cronExpression.split(" ")

      if (
        cronExpression.length === 0 ||
        cronExpression.split(" ").length !== 5
      ) {
        dispatch(setCronOption(cronOptions.custom))
        dispatch(setGlobalCronExpression([]))
        dispatch(
          setNotification({
            message:
              "Текущая версия поддерживает только cron формат без секунд и года: * * * * *",
            type: "warning",
          })
        )
        return
      } else if (
        // everyMinute Case
        /^0\/([0-9]|[0-5][0-9])$/.test(minutes) &&
        hours === "*" &&
        (dom === "*" || dom === "?") &&
        months === "*" &&
        (dow === "*" || dow === "?")
      ) {
        dispatch(
          setEveryMinuteParams({
            minutes: Number(minutes.split("/")[1]),
          })
        )
        success(cronOptions.everyMinute)
        return
      } else if (
        // daysOfWeek Case
        /^([0-9]|[1-5][0-9])$/.test(minutes) &&
        /^([0-9]|[1-2][0-3])$/.test(hours) &&
        (dom === "*" || dom === "?") &&
        months === "*" &&
        /^(?:[1-7],){0,6}[1-7]$/.test(dow)
      ) {
        dispatch(
          setDaysOfWeekParams({
            minutes: Number(minutes),
            hours: Number(hours),
            days: dow.split(",").map((e) => Number(e)),
          })
        )
        success(cronOptions.daysOfWeek)
        return
      } else if (
        // everyDay Case
        /^([0-9]|[1-5][0-9])$/.test(minutes) &&
        /^(?:([0-9]|[1-2][0-3]),){0,1}(?:[0-9]|[1-2][0-3])$/.test(hours) &&
        (dom === "*" || dom === "?") &&
        months === "*" &&
        (dow === "*" || dow === "?")
      ) {
        dispatch(
          setEveryDayParams({
            slotMinutes: Number(minutes),
            firstSlotHours: Number(hours.split(",")[0]),
            secondSlotHours: Number(hours.split(",")[1] || 9),
            secondSlotActive: !!hours.split(",")[1],
          })
        )
        success(cronOptions.everyDay)
        return
      } else if (
        // everyDayAtMonth Case
        /^([0-9]|[1-5][0-9])$/.test(minutes) &&
        /^(?:([0-9]|[1-2][0-3]),){0,1}(?:[0-9]|[1-2][0-3])$/.test(hours) &&
        (dom === "*" || dom === "?") &&
        /^(?:([1-9]|[1-2][0-2]),){0,11}(?:[1-9]|[1-2][0-2])$/.test(months) &&
        (dow === "*" || dow === "?")
      ) {
        dispatch(
          setEveryDayAtMonthParams({
            slotMinutes: Number(minutes),
            firstSlotHours: Number(hours.split(",")[0]),
            secondSlotHours: Number(hours.split(",")[1] || 9),
            secondSlotActive: !!hours.split(",")[1],
            months: months.split(",").map((e) => Number(e)),
          })
        )
        success(cronOptions.everyDayAtMonth)
        return
      } else {
        dispatch(setCronOption(cronOptions.custom))
        dispatch(setGlobalCronExpression(cronExpression.split(" ")))
        dispatch(
          setNotification({
            message:
              "Выражение корректно, но не поддерживается интерфейсом формы.",
            type: "warning",
          })
        )
      }
    } catch (err) {
      dispatch(setCronOption(cronOptions.custom))
      dispatch(setGlobalCronExpression([]))
      dispatch(
        setNotification({ message: "Выражение некорректно.", type: "error" })
      )
    }
  }

  const saveExpressionHandler = () => {
    if (form.cronExpression.length === 0) {
      dispatch(
        setNotification({
          message: "Параметры не опеределены.",
          type: "warning",
        })
      )
      setCronExpression("")
    } else {
      setCronExpression(form.cronExpression.join(" "))
      dispatch(
        setNotification({
          message: "Выражение сформированно.",
          type: "info",
        })
      )
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 8,
      }}
    >
      <Button
        style={{ flex: 1 }}
        type="primary"
        onClick={loadExpressionHandler}
      >
        ↑ Загрузить cron выражение
      </Button>
      <Button style={{ flex: 1 }} onClick={saveExpressionHandler}>
        ↓ Выгрузить cron выражение
      </Button>
    </div>
  )
}
