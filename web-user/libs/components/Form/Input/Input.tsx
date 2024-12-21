import { FormControlProps, OutlinedInput, OutlinedInputProps, SxProps } from '@mui/material'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { AddControlProps } from './InputControl'
import { InputControl } from './InputControl'

export type BaseInputProps<T extends FieldValues> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps
    width?: string
    height?: string
    labelRight?: string
    labelSx?: SxProps
  }

export type InputProps<T extends FieldValues> = BaseInputProps<T> & OutlinedInputProps

function Input<T extends FieldValues>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
  width = '100%',
  required,
  height,
  labelRight,
  labelSx,
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
      helperText={helperText}
      labelRight={labelRight}
      labelSx={labelSx}
      {...controlProps}
    >
      <OutlinedInput {...inputProps} {...props} inputRef={ref} sx={{ width, height, ...sx }} />
    </InputControl>
  )
}

export { Input }
