import { FormControlProps, OutlinedInput, OutlinedInputProps } from '@mui/material'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { AddControlProps } from './InputControl'
import { InputControl } from './InputControl'

export type BaseInputProps<T extends FieldValues> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps
    width?: string
    labelLeft?: boolean
    padding?: string
    labelHeight?: number | string
  }

export type InputProps<T extends FieldValues> = BaseInputProps<T> & OutlinedInputProps

function Input<T extends FieldValues>({
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
  ...props
}: InputProps<T>) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, defaultValue })

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
        sx={{ width: width, padding: padding, ...sx }}
      />
    </InputControl>
  )
}

export { Input }
