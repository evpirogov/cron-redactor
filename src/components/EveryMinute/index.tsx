import { Select, Space } from "antd"
import { getMinutes_1to60 } from "../../utils"
import { useAppDispatch, useAppSelector } from "../../hooks"
import {
  cronOptions,
  selectForm,
  setCronOption,
  setEveryMinuteParams,
} from "../../store/formSlice"

export const EveryMinute = () => {
  const dispatch = useAppDispatch()
  const { everyMinute } = useAppSelector((state) => selectForm(state))
  const handleChange = (value: number) => {
    dispatch(setEveryMinuteParams({ minutes: value }))
    dispatch(setCronOption(cronOptions.everyMinute))
  }

  return (
    <Space>
      <span>Каждые </span>
      <Select
        showArrow={false}
        size="small"
        value={everyMinute.params.minutes}
        style={{ width: 52 }}
        onChange={handleChange}
        onClick={(e) => e.preventDefault()}
        options={getMinutes_1to60}
      />
      <span> минут</span>
    </Space>
  )
}
