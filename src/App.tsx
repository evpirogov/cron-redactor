import "./App.css"
import {
  Alert,
  Card,
  Divider,
  Input,
  Radio,
  RadioChangeEvent,
  Space,
} from "antd"
import { ChangeEvent, useState } from "react"
import { EveryMinute } from "./components/EveryMinute"
import { DaysOfWeek } from "./components/DaysOfWeek"
import { EveryDay } from "./components/EveryDay"
import { EveryDayAtMonth } from "./components/EveryDayAtMonth"
import { useAppDispatch, useAppSelector } from "./hooks"
import { selectForm, setCronOption, setNotification } from "./store/formSlice"
import { cronOptions } from "./store/formSlice"
import { FormHandlers } from "./components/FormHandlers"

function App() {
  const dispatch = useAppDispatch()
  const form = useAppSelector((state) => selectForm(state))
  const [cronExpression, setCronExpression] = useState("")

  const onRadioChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value)
    dispatch(setCronOption(e.target.value))
    setCronExpression("")
  }

  const onExpressionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNotification(null))
    setCronExpression(e.target.value)
  }

  return (
    <>
      <h1 style={{ fontSize: 24 }}>Редактор Cron расписания</h1>
      <div
        style={{
          minHeight: 410,
        }}
      >
        <Card
          size="small"
          title="Периодичность запуска"
          style={{ width: "100%" }}
        >
          <Radio.Group onChange={onRadioChange} value={form.cronOption}>
            <Space direction="vertical">
              <Radio value={cronOptions.everyMinute}>
                <EveryMinute />
              </Radio>

              <Radio value={cronOptions.daysOfWeek}>
                В выбранные дни недели в заданное время
              </Radio>
              {form.cronOption === 2 && <DaysOfWeek />}

              <Radio value={cronOptions.everyDay}>
                Каждый день в заданное время
              </Radio>
              {form.cronOption === 3 && <EveryDay />}

              <Radio value={cronOptions.everyDayAtMonth}>
                Каждый день месяца
              </Radio>
              {form.cronOption === 4 && <EveryDayAtMonth />}

              <Radio disabled value={cronOptions.custom}>
                Пользовательский интервал
              </Radio>
            </Space>
          </Radio.Group>
        </Card>
        {form.notification && (
          <Alert
            message={form.notification.message}
            type={form.notification.type}
            showIcon
            style={{ marginTop: 18 }}
          />
        )}
      </div>
      <FormHandlers
        cronExpression={cronExpression}
        setCronExpression={setCronExpression}
      />
      <Divider orientation="left" orientationMargin="0">
        Cron выражение
      </Divider>
      <Input onChange={onExpressionInputChange} value={cronExpression} />
    </>
  )
}

export default App
