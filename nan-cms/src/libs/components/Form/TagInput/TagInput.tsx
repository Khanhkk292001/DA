'use client'

import { base, mono, statusColors } from '@/libs/config/theme'
import {
  Autocomplete,
  Chip,
  FormControlProps,
  OutlinedInputProps,
  Paper,
  Stack,
  TextField,
} from '@mui/material'
import DeleteTagIcon from 'public/assets/svgs/chip_close.svg'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { TextOverflow } from '../../TextOverflow'
import { AddControlProps, InputControl } from '../Input/InputControl'

export type SelectOption = {
  label: string
  value: unknown
}
export type UnknownObj = Record<string, unknown>
export type LabelValueType<T> = [keyof T, keyof T]
export type BaseSelectProps<T, F extends FieldValues> = UseControllerProps<F> &
  AddControlProps &
  OutlinedInputProps & {
    controlProps?: FormControlProps
    options?: SelectOption[]
    multiple?: boolean
    width?: string
    onChangeValue?: (newValue: SelectOption | SelectOption[] | undefined) => void
    isLoading?: boolean
  }
export type SelectProps<T extends UnknownObj, F extends FieldValues> = BaseSelectProps<T, F>

function TagInput<T extends UnknownObj, F extends FieldValues = any>({
  name,
  control,
  fullWidth,
  label,
  helperText,
  controlProps,
  options: rawOptions,
  multiple,
  labelLeft,
  labelRight,
  disabled,
  width,
  required,
  onChangeValue,
  isLoading,
  ...props
}: SelectProps<T, F>) {
  const {
    field: { onChange, onBlur, value: rawValue, ref },
    fieldState: { error },
  } = useController({ name, control })
  const [inputValue, setInputValue] = useState('')

  const filterValue = useCallback(
    (value: unknown | unknown[]) => {
      const _options = rawOptions

      if (!_options) {
        return multiple ? [] : null
      }

      if (multiple) {
        const filterValue =
          _options.filter(
            (option) =>
              ((value as unknown[]) || []).findIndex((el) => el == `${option.value}`) !== -1,
          ) || []

        return filterValue
      }

      return _options.find((option) => option.value === value) || null
    },
    [rawOptions, multiple],
  )

  const [value, setValue] = useState(filterValue(rawValue))

  useEffect(() => {
    setValue(filterValue(rawValue))
  }, [rawValue, filterValue, multiple])

  const handleChangeValue = (
    e: SyntheticEvent<Element, Event>,
    newValue: SelectOption | SelectOption[] | null,
  ) => {
    if (!newValue) return

    if (multiple) {
      const _value = (newValue as SelectOption[]).map((option) => option.value)
      onChange(_value)
    } else {
      onChange((newValue as SelectOption).value)
      setInputValue((newValue as SelectOption).label)
    }

    setValue(newValue)
  }

  const handleChangeInputValue = (e: SyntheticEvent<Element, Event>, newValue: string) => {
    setInputValue(newValue)
    const isHaveValue = rawOptions?.length !== 0

    if (!newValue && !isHaveValue) {
      onChange(null)
    }
  }

  const filterOptions = (options: SelectOption[], value: SelectOption[]) => {
    return options.filter((option) => {
      return !value.some((el) => el.value === option.value)
    })
  }

  const optionValue = filterOptions(rawOptions || [], value as SelectOption[]) || []

  return (
    <Stack flexDirection="row" alignItems="center">
      <InputControl
        fieldError={error}
        fullWidth={fullWidth}
        label={label}
        required={required}
        helperText={helperText}
        labelLeft={labelLeft}
        labelRight={labelRight}
        {...controlProps}
      >
        <Autocomplete
          multiple={multiple}
          autoHighlight={true}
          blurOnSelect
          id="size-small-filled-multi"
          onBlur={onBlur}
          options={optionValue}
          ref={ref}
          value={value ? (value as SelectOption[]) : []}
          inputValue={inputValue}
          onChange={handleChangeValue}
          onInputChange={handleChangeInputValue}
          getOptionLabel={(option) => option.label}
          popupIcon={null}
          clearIcon={false}
          loading={isLoading}
          isOptionEqualToValue={(options, value) => options.value === value.value}
          noOptionsText="データなし"
          renderOption={(props, option) => (
            <li {...props} key={String(option.value)}>
              <TextOverflow
                fontSize={14}
                fontWeight={500}
                lineHeight="14px"
                color="inherit"
                sx={{ cursor: 'pointer' }}
              >
                {option.label}
              </TextOverflow>
            </li>
          )}
          sx={{
            cursor: 'pointer',
            '&.MuiInput-root': {
              paddingLeft: 10,
            },
          }}
          renderTags={(value, getTagProps) => {
            return value.map((option: SelectOption, index: number) => {
              const { key, ...tagProps } = getTagProps({ index })

              return (
                <Chip
                  variant="filled"
                  key={key}
                  label={
                    <TextOverflow
                      fontWeight={500}
                      fontSize="11px"
                      lineHeight="11px"
                      sx={{ cursor: 'text' }}
                    >
                      {option.label}
                    </TextOverflow>
                  }
                  deleteIcon={<DeleteTagIcon />}
                  {...tagProps}
                  sx={{
                    cursor: 'pointer',
                    '& .MuiChip-label': {
                      flex: 1,
                      padding: 0,
                    },
                  }}
                />
              )
            })
          }}
          PaperComponent={(props) => (
            <Paper
              sx={{
                width: 120,
                backgroundColor: base.white,
                '&.MuiPaper-root': {
                  ul: {
                    '&::-webkit-scrollbar': {
                      width: 2,
                    },
                    '&::-webkit-scrollbar-track': {
                      background: base.white,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: mono[200],
                      height: '10px',
                    },
                    padding: 0,
                    fontSize: 14,
                    lineHeight: '14px',
                    fontWeight: 500,
                    li: {
                      padding: '14.5px 16px',
                      height: 43,
                      '&:not(:last-child)': {
                        borderBottom: `1px solid ${mono[50]}`,
                      },
                      ':hover': {
                        backgroundColor: base.primary_pale,
                        color: base.primary,
                      },
                      '&.Mui-focused': {
                        backgroundColor: base.primary_pale,
                        color: base.primary,
                      },
                    },
                  },
                },
              }}
              {...props}
            />
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              placeholder={props.placeholder}
              multiline
              sx={{
                width: width,
                background: base.white,
                border: `1px solid ${!!error ? statusColors.error : base.separate_nav}`,
                borderRadius: '4px',
                padding: 0,
                '&. MuiInputBase-root': {
                  paddingRight: 0,
                },
              }}
              InputProps={{
                ...params.InputProps,
                sx: {
                  padding: 0,
                  '&.MuiInputBase-root': {
                    paddingRight: 0,
                    py: '4px',
                    paddingLeft: 1,
                    minHeight: 40,
                    '&::before': { display: 'none' },
                    '&::after': { display: 'none' },
                    textarea: {
                      background: base.white,
                      color: mono[600],
                      fontSize: 14,
                      lineHeight: '20px',
                      fontStyle: 'normal',
                    },
                  },
                },
              }}
            />
          )}
        />
      </InputControl>
    </Stack>
  )
}
export { TagInput }
