import { FormControl, FormControlProps, FormHelperText, Stack, SxProps, Typography } from '@mui/material'
import React, { memo } from 'react'
import type { FieldError } from 'react-hook-form'

export type AddControlProps = {
  helperText?: string | JSX.Element
  label?: string
  fieldError?: FieldError | boolean
  labelRight?: string
  labelSx?: SxProps
}

export type InputControlProps = FormControlProps<'div', AddControlProps>

const LabelAndHelperText = ({
  label,
  helperText,
  fieldError,
  required,
  children,
}: Pick<InputControlProps, 'label' | 'helperText' | 'fieldError' | 'required'> & {
  children: React.ReactNode
}) => (
  <Stack spacing={1}>
    {label && (
      <Stack direction="row" spacing={1} mb={1} alignItems="center" height="18px">
        <Typography variant="subtitle1" color="grey.500">
          {label}
        </Typography>

        {required && (
          <Typography color="status.error" variant="subtitle1" fontWeight={400}>
            必須
          </Typography>
        )}
      </Stack>
    )}

    <Stack spacing={0.5}>
      {children}

      {!!fieldError && (
        <FormHelperText error sx={{ fontSize: 10.5 }}>
          {typeof fieldError === 'boolean' ? helperText : fieldError?.message}
        </FormHelperText>
      )}
    </Stack>
  </Stack>
)

function RawInputControl({
  fieldError,
  fullWidth,
  label,
  helperText,
  children,
  required,
  labelRight,
  labelSx,
  ...props
}: InputControlProps) {
  return (
    <FormControl fullWidth={fullWidth} error={!!fieldError} {...props} sx={{ opacity: props.disabled ? 0.3 : 1 }}>
      <Stack spacing={0.5}>
        <LabelAndHelperText label={label} helperText={helperText} fieldError={fieldError} required={required}>
          {children}
        </LabelAndHelperText>
      </Stack>
    </FormControl>
  )
}

const InputControl = memo(RawInputControl) as typeof RawInputControl

export { InputControl }
