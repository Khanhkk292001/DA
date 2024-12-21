'use client'

import { FormControlProps, Stack } from '@mui/material'
import React from 'react'
import { BreadcrumbType } from '../../BreadCrumbs'
import { ModalLeavePage } from '../../Modal/ModalLeavePage'
import { FormSkeleton } from '../../Skeleton'
import { FORM_LAYOUT_FOOTER_HEIGHT, Footer } from './Footer'
import { Header } from './Header'

type FormLayoutProps = {
  children: React.ReactNode
  title: string
  isDirty: boolean
  pathArrCustom?: BreadcrumbType[]
  hiddenBreadcrumb?: boolean
  isLoading?: boolean
  skeleton?: {
    rows?: number
    cols?: number
  }
  submitLoading?: boolean
  closeFormPath?: string
} & FormControlProps

export type ProxyInstance = [string | undefined, (tips?: string) => void]

const FormLayout = ({
  children,
  title,
  isDirty,
  onKeyDown,
  pathArrCustom,
  hiddenBreadcrumb = false,
  isLoading,
  submitLoading,
  skeleton,
  closeFormPath,
  ...props
}: FormLayoutProps) => {
  const hasOnKeyDown = !!onKeyDown
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  if (isLoading) return <FormSkeleton {...skeleton} />

  return (
    <Stack spacing={5}>
      <Header title={title} pathArrCustom={pathArrCustom} hiddenBreadcrumb={hiddenBreadcrumb} />

      <Stack
        component="form"
        marginBottom={`${FORM_LAYOUT_FOOTER_HEIGHT}px !important`}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          hasOnKeyDown ? onKeyDown(e) : handleKeyDown(e)
        }}
        {...props}
      >
        {children}

        <Footer isDirty={isDirty} isPending={submitLoading} closeFormPath={closeFormPath} />
      </Stack>

      <ModalLeavePage isDirty={isDirty} />
    </Stack>
  )
}

export { FormLayout }
