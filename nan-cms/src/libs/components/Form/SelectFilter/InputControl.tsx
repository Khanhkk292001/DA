import { FormControl, FormControlProps, FormHelperText, Stack, Typography } from '@mui/material'
import { memo } from 'react'
import type { FieldError } from 'react-hook-form'

export type AddControlProps = {
  helperText?: string | JSX.Element
  label?: string
  fieldError?: FieldError | boolean
}

export type InputControlProps = FormControlProps<'div', AddControlProps>

function RawInputControl({
  fieldError,
  fullWidth,
  label,
  helperText,
  children,
  required,
  ...props
}: InputControlProps) {
  return (
    <FormControl fullWidth={fullWidth} error={!!fieldError} {...props}>
      {label ? (
        <Stack direction="row" spacing={1} mb={1} alignItems="center">
          <Typography variant="subtitle1" color="grey.500">
            {label}
          </Typography>

          {children}
        </Stack>
      ) : (
        children
      )}

      {!!fieldError && (
        <FormHelperText error>
          {typeof fieldError === 'boolean' ? helperText : fieldError?.message}
        </FormHelperText>
      )}
    </FormControl>
  )
}

const InputControl = memo(RawInputControl) as typeof RawInputControl

export { InputControl }
