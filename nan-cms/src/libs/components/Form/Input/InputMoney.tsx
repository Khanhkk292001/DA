import { Box, FormControlProps, OutlinedInput, OutlinedInputProps } from '@mui/material'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { AddControlProps } from './InputControl'
import { InputControl } from './InputControl'

export type BaseInputMoneyProps<T extends FieldValues> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps
    width?: string
    labelLeft?: boolean
    padding?: string
    labelHeight?: number | string
    currencySymbol?: string // Thuộc tính tuỳ chọn cho ký hiệu tiền tệ, mặc định là "₫"
  }

export type InputMoneyProps<T extends FieldValues> = BaseInputMoneyProps<T> & OutlinedInputProps

// Hàm định dạng tiền tệ cho Việt Nam (dấu chấm phân cách và thêm ₫)
const formatMoney = (value: string | number) => {
  // Chuyển đổi value thành chuỗi nếu nó không phải là chuỗi
  const stringValue = String(value).replace(/[^\d]/g, '') // Loại bỏ tất cả ký tự không phải số

  // Định dạng số thành dạng tiền tệ
  const formattedValue = new Intl.NumberFormat('vi-VN').format(Number(stringValue) || 0)

  return formattedValue
}

function InputMoney<T extends FieldValues>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  labelRight,
  helperText,
  controlProps,
  width = '100%',
  padding,
  required,
  labelLeft,
  labelHeight,
  sx,
  currencySymbol = '₫',
  ...props
}: InputMoneyProps<T>) {
  const {
    field: { ref, onChange, value, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, defaultValue })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d]/g, '')
    onChange(rawValue)
  }

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      required={required}
      labelLeft={labelLeft}
      helperText={helperText}
      labelRight={labelRight}
      labelHeight={labelHeight}
      {...controlProps}
    >
      <OutlinedInput
        {...inputProps}
        {...props}
        inputRef={ref}
        value={value ? formatMoney(value) : ''}
        onChange={handleChange}
        sx={{ width, padding, ...sx }}
        endAdornment={<Box marginRight={1}>{currencySymbol}</Box>}
      />
    </InputControl>
  )
}

export { InputMoney }
