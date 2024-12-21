import { FormControl, FormControlProps, FormHelperText, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import type { FieldError } from 'react-hook-form'

export type AddControlProps = {
  helperText?: string | JSX.Element
  label?: string
  fieldError?: FieldError | boolean
  labelLeft?: boolean
  labelRight?: string
  labelHeight?: number | string
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
  <>
    {label && (
      <Stack direction="row" spacing={1} mb={1} alignItems="center">
        <Typography variant="body2" color="grey.500">
          {label}
        </Typography>

        {required && (
          <Typography color="status.error" variant="subtitle1" fontWeight={400}>
            *
          </Typography>
        )}
      </Stack>
    )}

    {children}

    {!!fieldError && (
      <FormHelperText error sx={{ marginTop: '3px !important' }}>
        {typeof fieldError === 'boolean' ? helperText : fieldError?.message}
      </FormHelperText>
    )}
  </>
)

function RawInputControl({
  fieldError,
  fullWidth,
  label,
  helperText,
  children,
  labelLeft,
  required,
  labelRight,
  labelHeight,
  ...props
}: InputControlProps) {
  return (
    <FormControl
      fullWidth={fullWidth}
      error={!!fieldError}
      {...props}
      sx={{ opacity: props.disabled ? 0.3 : 1 }}
    >
      <Stack direction={labelLeft ? 'row' : 'column'} spacing={1}>
        {labelLeft ? (
          <>
            <Stack
              height={labelHeight || 44}
              minWidth={120}
              padding="0px 8px"
              bgcolor="base.white"
              justifyContent="center"
            >
              <Typography variant="body2" color="grey.500">
                {label}
              </Typography>
            </Stack>

            <Stack width="100%" justifyContent="center">
              <Stack mt="2px !important" direction="row" spacing={1} alignItems="flex-end">
                {children}

                {labelRight && (
                  <Typography variant="subtitle1" color="grey.600" fontWeight={400}>
                    {labelRight}
                  </Typography>
                )}
              </Stack>

              {!!fieldError && (
                <FormHelperText error>
                  {typeof fieldError === 'boolean' ? helperText : fieldError?.message}
                </FormHelperText>
              )}
            </Stack>
          </>
        ) : (
          <LabelAndHelperText
            label={label}
            helperText={helperText}
            fieldError={fieldError}
            required={required}
          >
            {children}
          </LabelAndHelperText>
        )}
      </Stack>
    </FormControl>
  )
}

const InputControl = memo(RawInputControl) as typeof RawInputControl

export { InputControl }
