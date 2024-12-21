import { base, mono, statusColors } from '@/libs/config/theme'
import { StackProps, SxProps } from '@mui/material'
import { DatePickerProps, DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { FieldError, FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { InputControl } from '../Form/Input/InputControl'

type AddControlProps = {
  helperText?: string
  label?: string
  fieldError?: FieldError | boolean
  required?: boolean
  inputContainerProps?: StackProps
  horizontal?: boolean
  errorText?: string
}

type ControlProps = AddControlProps & {
  fullWidth?: boolean
  inputSx?: SxProps
  required?: boolean
  horizontal?: boolean
}

type DatePickerType<T extends FieldValues> = UseControllerProps<T> &
  ControlProps &
  Omit<DatePickerProps<Date>, 'onChange' | 'value'> & {
    required?: boolean
    labelLeft?: boolean
    placeholder?: string
    width?: string
  }

function DatePicker<T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  helperText,
  fullWidth,
  required,
  inputSx,
  placeholder,
  width,
  horizontal,
  labelLeft,
  ...props
}: DatePickerType<T>) {
  const {
    field: { onChange, value, ref, ...inputProps },
    fieldState: { error: fieldError },
  } = useController({ name, control, defaultValue })

  const handleChange = (newValue: unknown) => {
    onChange(newValue)
  }

  return (
    <>
      <InputControl
        required={required}
        fieldError={fieldError}
        fullWidth={fullWidth as boolean}
        label={label}
        helperText={helperText}
        labelLeft={labelLeft}
        onKeyDown={(e) => {
          e.preventDefault()
        }}
        sx={{
          label: { fontWeight: 500, marginBottom: 0, fontSize: 12 },
        }}
      >
        <MuiDatePicker
          onOpen={() => {}}
          {...props}
          {...inputProps}
          value={value ? new Date(value) : defaultValue ? defaultValue : null}
          onChange={handleChange}
          inputRef={ref}
          slotProps={{
            textField: {
              variant: 'outlined',
              disabled: true,
              placeholder: placeholder ? placeholder : '',
            },
            day: {
              sx: {
                '&.Mui-selected': {
                  backgroundColor: statusColors.assistant_pale,
                  color: statusColors.assistant,
                  '&:hover': {
                    backgroundColor: statusColors.assistant_pale,
                    color: statusColors.assistant,
                  },
                  '&:focus': {
                    backgroundColor: statusColors.assistant_pale,
                    color: statusColors.assistant,
                  },
                },
                '&:hover': {
                  backgroundColor: statusColors.assistant_pale,
                },
              },
            },
          }}
          format="yyyy/MM/dd"
          sx={{
            ...inputSx,
            width: width ? width : '100%',
            '&& .MuiInputBase-root': {
              paddingRight: '6px',
              '&.Mui-disabled': {
                color: mono[200] + '!important',
              },
            },
            '&& .Mui-focused fieldset': {
              borderColor: base.primary,
              borderWidth: 1,
            },
            '&& .Mui-disabled': {
              WebkitTextFillColor: value ? mono[600] : mono[200],
              borderColor: base.separate_nav + '!important',
            },
            '& .MuiOutlinedInput-input': {
              fontSize: 14,
              fontWeight: 500,
              lineHeight: 'normal',
              paddingRight: 8,
              padding: '12px 10px 12px 16px',
            },
            '&& .MuiOutlinedInput-notchedOutline': {
              borderColor: fieldError ? statusColors.error : base.separate_nav + '!important',
              '&:hover': {
                borderColor: base.separate_nav,
              },
              '&:focus': {
                borderColor: 'transparent !important',
              },
            },
            '&& .MuiButtonBase-root': {
              padding: 0,
              marginRight: 0,
            },
            '&.Mui-error': {
              border: `1px solid ${statusColors.error}`,
              '&.Mui-focused fieldset': {
                border: `1px solid ${statusColors.error}`,
              },
              '&:hover fieldset': {
                border: `1px solid ${statusColors.error}`,
              },
            },
          }}
        />
      </InputControl>
    </>
  )
}

export { DatePicker }
