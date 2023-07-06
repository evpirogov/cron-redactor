import { Button, Select, Space } from "antd"
import {
  getMinutes_0to23,
  getMinutes_0to59,
  getMonths_JAN_to_DEC,
} from "../../utils"
import { useAppDispatch, useAppSelector } from "../../hooks"
import {
  cronOptions,
  selectForm,
  setCronOption,
  setEveryDayAtMonthParams,
} from "../../store/formSlice"

export const EveryDayAtMonth = () => {
  const dispatch = useAppDispatch()
  const { params } = useAppSelector(
    (state) => selectForm(state).everyDayAtMonth
  )

  const handleChangeMonths = (value: number[]) => {
    dispatch(setEveryDayAtMonthParams({ months: value }))
    dispatch(setCronOption(cronOptions.everyDayAtMonth))
  }
  const handleChangeFirstSlotHours = (value: number) => {
    dispatch(setEveryDayAtMonthParams({ firstSlotHours: value }))
    dispatch(setCronOption(cronOptions.everyDayAtMonth))
  }
  const handleChangeSecondSlotHours = (value: number) => {
    dispatch(setEveryDayAtMonthParams({ secondSlotHours: value }))
    dispatch(setCronOption(cronOptions.everyDayAtMonth))
  }
  const handleChangeSlotMinutes = (value: number) => {
    dispatch(setEveryDayAtMonthParams({ slotMinutes: value }))
    dispatch(setCronOption(cronOptions.everyDayAtMonth))
  }
  const handleActivateSecondSlot = (secondSlotActive: boolean) => {
    dispatch(setEveryDayAtMonthParams({ secondSlotActive }))
    dispatch(setCronOption(cronOptions.everyDayAtMonth))
  }

  return (
    <Space style={{ marginLeft: 24 }} direction="vertical">
      <Space>
        <span style={{ fontSize: "14px" }}>Выберите месяцы: </span>
        <Select
          mode="multiple"
          showArrow={false}
          size="small"
          value={params.months}
          style={{ width: 370 }}
          onChange={handleChangeMonths}
          onClick={(e) => e.preventDefault()}
          options={getMonths_JAN_to_DEC}
        />
      </Space>
      <Space>
        <span style={{ fontSize: "14px", marginRight: 8 }}>Время: </span>
        <Select
          showArrow={false}
          size="small"
          value={params.firstSlotHours}
          style={{ width: 52 }}
          onChange={handleChangeFirstSlotHours}
          onClick={(e) => e.preventDefault()}
          options={getMinutes_0to23}
        />
        <span style={{ fontSize: "14px" }}>:</span>
        <Select
          showArrow={false}
          size="small"
          value={params.slotMinutes}
          style={{ width: 52 }}
          onChange={handleChangeSlotMinutes}
          onClick={(e) => e.preventDefault()}
          options={getMinutes_0to59}
        />
      </Space>
      <Space>
        {!params.secondSlotActive ? (
          <Button
            type="link"
            style={{ padding: 0 }}
            onClick={() => {
              handleActivateSecondSlot(true)
            }}
          >
            + Добавить время
          </Button>
        ) : (
          <>
            <span style={{ fontSize: "14px", marginRight: 8 }}>Время: </span>
            <Select
              showArrow={false}
              size="small"
              value={params.secondSlotHours}
              style={{ width: 52 }}
              onChange={handleChangeSecondSlotHours}
              onClick={(e) => e.preventDefault()}
              options={getMinutes_0to23}
            />
            <span style={{ fontSize: "14px" }}>:</span>
            <Select
              disabled
              showArrow={false}
              size="small"
              value={params.slotMinutes}
              style={{ width: 52 }}
              onClick={(e) => e.preventDefault()}
              options={getMinutes_0to59}
            />
            <Button
              size="small"
              danger
              onClick={() => {
                handleActivateSecondSlot(false)
              }}
            >
              X
            </Button>
          </>
        )}
      </Space>
    </Space>
  )
}
