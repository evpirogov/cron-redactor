import { Select, Space } from "antd"
import {
  getDaysOfWeek_MON_to_SUN,
  getMinutes_0to23,
  getMinutes_0to59,
} from "../../utils"
import { useAppDispatch, useAppSelector } from "../../hooks"
import {
  cronOptions,
  selectForm,
  setCronOption,
  setDaysOfWeekParams,
} from "../../store/formSlice"

export const DaysOfWeek = () => {
  const dispatch = useAppDispatch()
  const { daysOfWeek } = useAppSelector((state) => selectForm(state))
  const handleChangeDays = (value: number[]) => {
    dispatch(setDaysOfWeekParams({ days: value }))
    dispatch(setCronOption(cronOptions.daysOfWeek))
  }
  const handleChangeHours = (value: number) => {
    dispatch(setDaysOfWeekParams({ hours: value }))
    dispatch(setCronOption(cronOptions.daysOfWeek))
  }
  const handleChangeMinutes = (value: number) => {
    dispatch(setDaysOfWeekParams({ minutes: value }))
    dispatch(setCronOption(cronOptions.daysOfWeek))
  }

  return (
    <Space direction="vertical">
      <Space style={{ marginLeft: 24 }}>
        <span style={{ fontSize: "14px" }}>Дни: </span>
        <Select
          showArrow={false}
          mode="multiple"
          size="small"
          value={daysOfWeek.params.days}
          style={{ width: 360 }}
          defaultValue={[1, 3, 5]}
          onChange={handleChangeDays}
          onClick={(e) => e.preventDefault()}
          options={getDaysOfWeek_MON_to_SUN}
        />
      </Space>
      <Space style={{ marginLeft: 24 }}>
        <span style={{ fontSize: "14px", marginRight: 8 }}>Время: </span>
        <Select
          showArrow={false}
          size="small"
          value={daysOfWeek.params.hours}
          style={{ width: 52 }}
          onChange={handleChangeHours}
          onClick={(e) => e.preventDefault()}
          options={getMinutes_0to23}
        />
        <span style={{ fontSize: "14px" }}>:</span>
        <Select
          showArrow={false}
          size="small"
          value={daysOfWeek.params.minutes}
          style={{ width: 52 }}
          onChange={handleChangeMinutes}
          onClick={(e) => e.preventDefault()}
          options={getMinutes_0to59}
        />
      </Space>
    </Space>
  )
}
