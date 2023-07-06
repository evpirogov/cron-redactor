import { Button, Select, Space } from "antd"
import { getMinutes_0to23, getMinutes_0to59 } from "../../utils"
import { useAppDispatch, useAppSelector } from "../../hooks"
import {
  cronOptions,
  selectForm,
  setCronOption,
  setEveryDayParams,
} from "../../store/formSlice"

export const EveryDay = () => {
  const dispatch = useAppDispatch()
  const { params } = useAppSelector((state) => selectForm(state).everyDay)

  const handleChangeFirstSlotHours = (value: number) => {
    dispatch(setEveryDayParams({ firstSlotHours: value }))
    dispatch(setCronOption(cronOptions.everyDay))
  }
  const handleChangeSecondSlotHours = (value: number) => {
    dispatch(setEveryDayParams({ secondSlotHours: value }))
    dispatch(setCronOption(cronOptions.everyDay))
  }
  const handleChangeSlotMinutes = (value: number) => {
    dispatch(setEveryDayParams({ slotMinutes: value }))
    dispatch(setCronOption(cronOptions.everyDay))
  }
  const handleActivateSecondSlot = (secondSlotActive: boolean) => {
    dispatch(setEveryDayParams({ secondSlotActive }))
    dispatch(setCronOption(cronOptions.everyDay))
  }

  return (
    <Space style={{ marginLeft: 24 }} direction="vertical">
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
