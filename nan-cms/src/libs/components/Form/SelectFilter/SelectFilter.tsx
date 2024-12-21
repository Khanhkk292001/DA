import {
  Autocomplete,
  FormControlProps,
  OutlinedInput,
  OutlinedInputProps,
  Stack,
} from '@mui/material'
import Image from 'next/image'
import { SyntheticEvent, useRef, useState } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { AddControlProps, InputControl } from './InputControl'

export type SelectOption = {
  label: string
  value: unknown
}
export type UnknownObj = Record<string, unknown>
export type LabelValueType<T> = [keyof T, keyof T]
export type BaseSelectProps<T, F extends FieldValues> = UseControllerProps<F> &
  AddControlProps &
  OutlinedInputProps & {
    controlProps?: FormControlProps
    options?: SelectOption[]
    multiple?: boolean
    onChangeValue?: (newValue: SelectOption | SelectOption[] | undefined) => void
  }
export type SelectProps<T extends UnknownObj, F extends FieldValues> = BaseSelectProps<T, F>

function SelectFilter<T extends UnknownObj, F extends FieldValues = any>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
  options,
  multiple,
  disabled,
  required,
  onChangeValue,
  ...props
}: SelectProps<T, F>) {
  const {
    field: { onChange, onBlur, value: rawValue },
    fieldState: { error },
  } = useController({ name, control, defaultValue })
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState<SelectOption | SelectOption[] | undefined>(undefined)

  const handleChangeValue = (
    e: SyntheticEvent<Element, Event>,
    newValue: SelectOption | SelectOption[],
  ) => {
    if (!newValue) {
      return
    }
    if (multiple) {
      const _value = (newValue as SelectOption[]).map((option) => option.value)
      onChange(_value)
    } else {
      onChange((newValue as SelectOption).value)
      setInputValue((newValue as SelectOption).label)
    }

    setValue(newValue)

    if (onChangeValue) {
      onChangeValue(newValue)
    }
  }
  const handleChangeInputValue = (e: SyntheticEvent<Element, Event>, newValue: string) => {
    setInputValue(newValue)
    if (!newValue) {
      onChange('')
    }
  }
  const selectRef = useRef<HTMLDivElement | null>(null)
  const handleSelectClick = () => {
    if (selectRef.current) {
      selectRef.current.blur()
    }
  }

  return (
    <Stack flexDirection="row" alignItems="center">
      <InputControl
        fieldError={error}
        fullWidth={fullWidth}
        label={label}
        required={required}
        helperText={helperText}
        {...controlProps}
      >
        <Autocomplete
          value={value}
          inputValue={inputValue}
          onChange={handleChangeValue}
          onInputChange={handleChangeInputValue}
          multiple={multiple}
          onBlur={onBlur}
          sx={{
            cursor: 'pointer',
            '& .MuiOutlinedInput-root': {
              paddingRight: '10px' + '!important',
              padding: 0,
              height: 40,
              '& .MuiAutocomplete-input': {
                padding: '7.5px 0px 7.5px 16px',
              },
            },
          }}
          ref={selectRef}
          disablePortal
          options={options || []}
          isOptionEqualToValue={(options, value) => options.value === value.value}
          disabled={disabled}
          onClick={handleSelectClick}
          popupIcon={
            <Image
              src="assets/svgs/arrow_down.svg"
              width={24}
              height={24}
              alt="icon-chevron-down"
            />
          }
          disableClearable={true}
          renderInput={(params) => (
            <OutlinedInput
              fullWidth
              disabled={disabled}
              {...params.InputProps}
              inputProps={{
                ...params.inputProps,
              }}
              {...props}
            />
          )}
        />
      </InputControl>
    </Stack>
  )
}
export { SelectFilter }
