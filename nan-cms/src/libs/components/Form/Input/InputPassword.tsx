import { InputAdornment, OutlinedInput } from '@mui/material'
import HideIcon from 'public/assets/svgs/hide.svg'
import ShowIcon from 'public/assets/svgs/show.svg'
import { useState } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { InputProps } from './Input'
import { InputControl } from './InputControl'
import { ButtonActionPassword } from './styled'

function InputPassword<T extends FieldValues>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  width = '100%',
  controlProps,
  required,
  labelLeft,
  ...props
}: InputProps<T>) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, defaultValue })
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    if (props.disabled) return
    setShowPassword(!showPassword)
  }

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      required={required}
      helperText={helperText}
      labelLeft={labelLeft}
      disabled={props.disabled}
      {...controlProps}
    >
      <OutlinedInput
        sx={{ width: width }}
        {...inputProps}
        {...props}
        inputRef={ref}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <ButtonActionPassword onClick={togglePasswordVisibility} disableRipple>
              {showPassword ? <ShowIcon /> : <HideIcon />}
            </ButtonActionPassword>
          </InputAdornment>
        }
      />
    </InputControl>
  )
}

export { InputPassword }
