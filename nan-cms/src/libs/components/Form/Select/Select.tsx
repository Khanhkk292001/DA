import { mono } from '@/libs/config/theme'
import {
  FormControlProps,
  MenuItem,
  Select as MuiSelect,
  SelectProps as RawSelectProps,
  SxProps,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { TextOverflow } from '../../TextOverflow'
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
  labelLeft,
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
      labelLeft={labelLeft}
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
        sx={{
          '& .MuiSelect-select': {
            color: selectedColor || mono[600],
            whiteSpace: 'pre',
          },
          width: width || '100%',
          height: 40,
          ...sx,
        }}
        displayEmpty
        IconComponent={(prop) => (
          <Image
            src="/assets/svgs/arrow_down.svg"
            width={24}
            height={24}
            alt="icon-chevron-down"
            {...prop}
          />
        )}
        renderValue={(value) => {
          const valueString = value
          const option = options.find((option) => option.value == valueString)

          return Boolean(value) ? (
            option?.label
          ) : (
            <Typography variant="body2" color="grey.200">
              {placeholder || 'NAN'}
            </Typography>
          )
        }}
      >
        {!hiddenEmpty && <MenuItem value={defaultValue}>Empty</MenuItem>}
        {options.map((option: SelectOption) => (
          <MenuItem key={`${option.value}`} value={option.value as string}>
            <TextOverflow width={width} fontSize={14} fontWeight={500} sx={{ cursor: 'pointer' }}>
              {option.label}
            </TextOverflow>
          </MenuItem>
        ))}
      </MuiSelect>
    </InputControl>
  )
}

export { Select }
