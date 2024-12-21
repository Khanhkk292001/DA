import { base, mono } from '@/libs/configs'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  FormControlProps,
  MenuItem,
  Select as MuiSelect,
  SelectProps as RawSelectProps,
  SxProps,
  Typography,
} from '@mui/material'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { AddControlProps, InputControl } from '../Input/InputControl'

type SelectOption = {
  label: string
  value: unknown
}

export type SelectProps<T extends FieldValues> = UseControllerProps<T> &
  RawSelectProps &
  AddControlProps & {
    controlProps?: FormControlProps
    options?: SelectOption[]
    inputSx?: SxProps
    fullWidth?: boolean
    width?: string
    hiddenEmpty?: boolean
    selectedColor?: string
  }

export type SelectFormProps = {
  options?: SelectOption[]
  sx?: SxProps
}

function Select<T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  options = [],
  helperText,
  controlProps,
  required,
  inputSx,
  fullWidth,
  placeholder,
  hiddenEmpty,
  selectedColor,
  sx,
  width,
  ...props
}: SelectProps<T>) {
  const {
    field: { ref, value, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, defaultValue })

  return (
    <InputControl
      fieldError={error}
      label={label}
      helperText={helperText}
      required={required}
      fullWidth={fullWidth}
      defaultValue={defaultValue}
      {...controlProps}
    >
      <MuiSelect
        ref={ref}
        {...props}
        value={value}
        {...inputProps}
        MenuProps={{
          sx: {
            maxWidth: 800,
            maxHeight: {
              xs: 200,
              sm: 300,
              md: 400,
            },
            width: width || '100%',
          },
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'bottom',
          },
          disableScrollLock: true,
          PaperProps: {
            sx: {
              '&::-webkit-scrollbar': {
                width: 5,
              },
              '&::-webkit-scrollbar-track': {
                background: base.white,
              },
              '&::-webkit-scrollbar-thumb': {
                background: mono[200],
                height: '10px',
              },
            },
          },
        }}
        sx={{
          '& .MuiSelect-select': {
            color: selectedColor || mono[600],
          },
          width: width || '100%',
          height: 55,
          ...sx,
        }}
        displayEmpty
        IconComponent={(prop) => <KeyboardArrowDownIcon {...prop} />}
        renderValue={(value) => {
          const valueString = value
          const option = options.find((option) => option.value == valueString)

          return Boolean(value) ? (
            option?.label
          ) : (
            <Typography variant="body2" color="grey.200">
              {placeholder || ' 選択'}
            </Typography>
          )
        }}
      >
        {!hiddenEmpty && <MenuItem value={defaultValue}>Empty</MenuItem>}
        {options.map((option: SelectOption) => (
          <MenuItem key={`${option.value}`} value={option.value as string}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </InputControl>
  )
}

export { Select }
