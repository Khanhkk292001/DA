import { AddControlProps, InputControl } from '@/libs/components/Form/Input/InputControl'
import { mono, statusColors } from '@/libs/config/theme'
import {
  FormControlProps,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
  OutlinedInput,
  SelectProps as RawSelectProps,
  Stack,
  SxProps,
  Typography,
  styled,
} from '@mui/material'
import ArrowDownIcon from 'public/assets/svgs/arrow_down_red.svg'
import CheckIcon from 'public/assets/svgs/check.svg'
import IndicatorGreen from 'public/assets/svgs/indicator_green.svg'
import IndicatorGrey from 'public/assets/svgs/indicator_grey.svg'
import IndicatorRed from 'public/assets/svgs/indicator_red.svg'
import IndicatorYellow from 'public/assets/svgs/indicator_yellow.svg'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

export type SelectOption = {
  label: string
  value: unknown
  color: 'red' | 'green' | 'grey' | 'yellow'
}

export type SelectProps<T extends FieldValues> = UseControllerProps<T> &
  RawSelectProps &
  AddControlProps & {
    controlProps?: FormControlProps
    options?: SelectOption[]
    inputSx?: SxProps
    selectSx?: SxProps
    fullWidth?: boolean
    haveIndicator?: boolean
  }

const colorMap = {
  red: {
    bgColor: statusColors.error_pale,
    color: statusColors.error,
    Indicator: IndicatorRed,
  },
  grey: {
    bgColor: 'grey.50',
    color: 'grey.600',
    Indicator: IndicatorGrey,
  },
  yellow: {
    bgColor: statusColors.warn_pale,
    color: statusColors.warn_dark,
    Indicator: IndicatorYellow,
  },
  green: {
    bgColor: statusColors.success_pale,
    color: statusColors.success,
    Indicator: IndicatorGreen,
  },
}

function SelectStatus<T extends FieldValues>({
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
  labelLeft,
  selectSx,
  haveIndicator,
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
      labelLeft={labelLeft}
      helperText={helperText}
      required={required}
      fullWidth={fullWidth}
      {...controlProps}
    >
      <MuiSelect
        ref={ref}
        {...props}
        {...inputProps}
        value={value}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 74,
          },
          disableScrollLock: true,
        }}
        input={
          <OutlinedInput
            sx={{
              '& .MuiSelect-icon': {
                top: '50%',
                transform: 'translateY(-50%)',
              },
              '& .MuiOutlinedInput-input': {
                padding: 0,
                height: '100%',
              },
              '&.MuiOutlinedInput-root': {
                background: 'transparent',
                padding: 0,
                border: 'none',
                fieldset: {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        }
        IconComponent={(prop) => <ArrowDownIcon {...prop} />}
        renderValue={(selected: string) => {
          const selectedOption = options.find((option) => option.value === selected)

          const colorOption = colorMap[selectedOption?.color as 'red' | 'green' | 'grey' | 'yellow']

          if (colorOption) {
            const { bgColor, color, Indicator } = colorOption

            return (
              <Stack
                padding="10px"
                gap="10px"
                bgcolor={bgColor}
                color={color}
                direction="row"
                alignItems="center"
                lineHeight="14px"
                borderRadius={0.5}
              >
                {haveIndicator && <Indicator />}

                <Typography variant="body2" lineHeight="14px">
                  {selectedOption?.label}
                </Typography>
              </Stack>
            )
          }
        }}
      >
        {options.map((option: SelectOption) => {
          const colorOption = colorMap[option?.color as 'red' | 'green' | 'grey' | 'yellow']
          const isActive = option.value === value

          return (
            <MenuItem key={`${option.value}`} value={option.value as string}>
              {colorOption ? (
                <Stack
                  gap="10px"
                  color={!isActive ? mono[500] : colorOption.color}
                  direction="row"
                  alignItems="center"
                  borderRadius={0.5}
                  width="100%"
                  justifyContent="space-between"
                >
                  <Stack direction="row" spacing="10px" alignItems="center">
                    {haveIndicator && <colorOption.Indicator />}

                    <Typography variant="body2" lineHeight="14px">
                      {option?.label}
                    </Typography>
                  </Stack>

                  {isActive && <CheckIcon />}
                </Stack>
              ) : null}
            </MenuItem>
          )
        })}
      </MuiSelect>
    </InputControl>
  )
}

export { SelectStatus }

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  width: 148,
  height: 43,
  paddingRight: 8,
  '&.Mui-selected': {
    backgroundColor: theme.palette.status.error_pale,
    '&:focus': {
      backgroundColor: theme.palette.status.error_pale,
    },
    '&:hover': {
      backgroundColor: theme.palette.status.error_pale,
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.base.white,
  },
}))
