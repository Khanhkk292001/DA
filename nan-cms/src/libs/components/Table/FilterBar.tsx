'use client'

import { base } from '@/libs/config/theme'
import {
  Box,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  Stack,
  Typography,
} from '@mui/material'
import { DatePickerProps } from '@mui/x-date-pickers'
import { useRouter } from 'next/navigation'
import SearchIcon from 'public/assets/svgs/search.svg'
import { useCallback } from 'react'
import { FieldValues, Path, useForm } from 'react-hook-form'
import { Select, SelectFormProps, SelectProps } from '../Form/Select'
import { MakePaginationOptional } from './ReactTable/types'
import { useTableContext } from './context'
import { ButtonCreate, ButtonSearch } from './styled'

type ValueType = 'string' | 'number' | 'date' | 'boolean'

export type FilterGroupColumn<F> = {
  fields: keyof Exclude<F, void>[]
}

export type FilterColumnBase<F> = {
  field: keyof Exclude<F, void>
  valueType?: ValueType
  parseValue?: (value: unknown) => unknown
  label?: string
  fieldOptions?: {
    searchIcon?: boolean
    hasLine?: boolean
    groupField?: boolean
    hasTilde?: boolean
  }
}

type InputFilterColumn = { type: 'text' } & Partial<OutlinedInputProps>
type SelectFilterColumn<F extends FieldValues> = { type: 'select' } & Partial<SelectProps<F>>
type CustomFilterColumn<F> = { type: 'custom' } & {
  render: (props: {
    handleChangeParams: (
      newParams: MakePaginationOptional<F>,
      mergeParams?: boolean,
      resetPaginationMeta?: boolean,
    ) => void
  }) => React.ReactNode
}
type DateFilterColumn<F extends FieldValues> = { type: 'date' } & Partial<
  Omit<DatePickerProps<F>, 'type'>
>

export type FilterColumn<F extends FieldValues> = FilterColumnBase<F> &
  (InputFilterColumn | SelectFilterColumn<F> | CustomFilterColumn<F> | DateFilterColumn<F>)

export type FilterBarProps<F extends FieldValues> = {
  columns: FilterColumn<F>[]
  createPath?: string | null
  onCreate?: () => void
  createBtnText?: string
  buttonSearchUnderButtonCreate?: boolean
  isDisabledCreate?: boolean
  key?: string
}

function getColumnByField<F extends FieldValues>(columns: FilterColumn<F>[], field: keyof F) {
  return columns.find((column) => column.field === field) as FilterColumn<F>
}

function defaultParseValue(value: unknown, valueType?: ValueType) {
  const _value = value?.toString().trim()
  if (_value === null) return value

  switch (valueType) {
    case 'number':
      return Number(_value)
    case 'date':
      return new Date(_value as string)
    case 'boolean':
      return Boolean(_value)
    default:
      return _value
  }
}

type FilterComponentProps<F extends FieldValues> = {
  column: FilterColumn<F>
  register: any
  control: any
  handleChangeParams: (
    newParams: MakePaginationOptional<F>,
    mergeParams?: boolean,
    resetPaginationMeta?: boolean,
  ) => void
}

export function FilterBar<FilterInput extends FieldValues, TData>({
  columns,
  createPath,
  onCreate,
  createBtnText = 'Tạo mới',
  buttonSearchUnderButtonCreate = false,
  isDisabledCreate = false,
}: FilterBarProps<FilterInput>) {
  const { handleChangeParams } = useTableContext<TData, FilterInput>()
  const { handleSubmit, register, control } = useForm<FilterInput>({})
  const route = useRouter()
  const hasCreateFn = typeof onCreate === 'function'

  const handleFilter = useCallback(
    (column: FilterColumn<FilterInput>, value: unknown) => {
      const field = column.field
      const parseValue = column.parseValue || defaultParseValue
      const filters = {
        [field]: parseValue(value, column.valueType),
      } as MakePaginationOptional<FilterInput>

      handleChangeParams(filters)
    },
    [handleChangeParams],
  )

  const onSubmit = (data: FilterInput) => {
    Object.entries(data).forEach(([name, value]) => {
      const column = getColumnByField(columns, name as keyof FilterInput)
      handleFilter(column, value)
    })
  }

  const columnGroupFields = columns.filter((column) => column.fieldOptions?.groupField)
  const columnNotGroupFields = columns.filter((column) => !column.fieldOptions?.groupField)

  const FieldComponent = ({
    column,
    control,
    handleChangeParams,
    register,
  }: FilterComponentProps<FilterInput>) => {
    const {
      type,
      field: _field,
      valueType: _vt,
      parseValue: _pv,
      fieldOptions,
      label,
      ...props
    } = column
    const field = _field.toString() as Path<FilterInput>
    const { searchIcon, hasLine, hasTilde } = fieldOptions || {}

    if (type === 'text') {
      return (
        <Stack spacing={2} direction="row" alignItems="center" key={field}>
          <Stack direction="row" spacing={1} alignItems="center">
            {hasTilde && (
              <Typography variant="subtitle1" color="grey.500" ml="-8px !important">
                〜
              </Typography>
            )}

            {label && (
              <Typography variant="subtitle1" color="grey.500">
                {label}
              </Typography>
            )}

            <OutlinedInput
              {...(props as OutlinedInputProps)}
              {...register(field)}
              startAdornment={
                searchIcon && <InputAdornment position="start">{<SearchIcon />}</InputAdornment>
              }
            />
          </Stack>

          {hasLine && <Box height="40px" width="1px" bgcolor={base.separate_nav} />}
        </Stack>
      )
    }

    if (type === 'select') {
      const { sx, ...selectProps } = props as SelectFormProps

      return (
        <Stack direction="row" spacing={1} alignItems="center" key={field}>
          {hasTilde && (
            <Typography variant="subtitle1" color="grey.500" ml="-8px !important">
              〜
            </Typography>
          )}

          {label && (
            <Typography variant="subtitle1" color="grey.500" whiteSpace="pre-line">
              {label}
            </Typography>
          )}

          <Select control={control} name={field} sx={sx} {...selectProps} />
        </Stack>
      )
    }

    if (type === 'custom') {
      return column.render({ handleChangeParams })
    }

    return <div key={field} />
  }

  return (
    <Stack
      justifyContent="space-between"
      flexWrap="nowrap"
      flexDirection="row"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        mb={3}
        minHeight={111}
        gap={2}
        flexDirection="row"
        alignItems="flex-start"
        flexWrap="wrap"
      >
        {columnNotGroupFields.map((column) => (
          <FieldComponent
            key={column.field.toString()}
            column={column}
            register={register}
            control={control}
            handleChangeParams={handleChangeParams}
          />
        ))}

        {columnGroupFields.length > 0 && (
          <Stack
            mb={3}
            minHeight={111}
            flexDirection="row"
            columnGap={2}
            alignItems="flex-start"
            flexWrap="wrap"
            width={620}
          >
            {columnGroupFields.map((column) => (
              <FieldComponent
                key={column.field.toString()}
                column={column}
                register={register}
                control={control}
                handleChangeParams={handleChangeParams}
              />
            ))}
          </Stack>
        )}

        {!buttonSearchUnderButtonCreate && (
          <ButtonSearch variant="outlined" type="submit">
            Tìm kiếm
          </ButtonSearch>
        )}
      </Stack>
      <Stack spacing={2}>
        {buttonSearchUnderButtonCreate && (
          <ButtonSearch variant="outlined" type="submit">
            Tìm kiếm
          </ButtonSearch>
        )}
        {createPath && (
          <ButtonCreate
            variant="contained"
            onClick={() => route.push(createPath)}
            disabled={isDisabledCreate}
          >
            {createBtnText}
          </ButtonCreate>
        )}

        {hasCreateFn && (
          <ButtonCreate variant="contained" onClick={onCreate}>
            {createBtnText}
          </ButtonCreate>
        )}
      </Stack>
    </Stack>
  )
}
