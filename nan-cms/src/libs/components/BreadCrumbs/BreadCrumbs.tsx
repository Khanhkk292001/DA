'use client'

import { statusColors } from '@/libs/config/theme'
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { menuText } from 'public/locales'
import { useMemo } from 'react'
import { TextOverflow } from '../TextOverflow'

const action: { [key: string]: string } = {
  create: 'Tạo mới',
}

export type BreadcrumbType = { label: string | number; href?: string }

type BreadcrumbsProps = {
  pathArrCustom?: BreadcrumbType[]
}

export const Breadcrumbs = ({ pathArrCustom }: BreadcrumbsProps) => {
  const pathname = usePathname()
  let pathArr: BreadcrumbType[]

  pathArrCustom
    ? (pathArr = pathArrCustom.reduce((acc, cur, idx, arr) => {
        const isLast = arr.length - 1 === idx
        return [
          ...acc,
          {
            label: cur.label,
            href: isLast ? '' : cur.href,
          },
        ]
      }, [] as BreadcrumbType[]))
    : (pathArr = pathname
        .split('/')
        .filter(Boolean)
        .slice(0, 2)
        .reduce((acc, cur, idx, arr) => {
          const isLast = arr.length - 1 === idx
          return [
            ...acc,
            {
              label:
                menuText[cur as keyof typeof menuText] || action[cur as keyof typeof action] || cur,
              href: isLast ? '' : '/' + cur,
            },
          ]
        }, [] as BreadcrumbType[]))

  const breadcrumbs = useMemo(
    () =>
      (pathArr.length > 1 ? pathArr : []).map((b: BreadcrumbType, index) =>
        b.href ? (
          <TextOverflow
            component={Link}
            color={statusColors.assistant}
            key={index}
            href={b.href}
            variant="body2"
            display="block"
            maxWidth="200px"
            textDecoration="underline"
            sx={{ textUnderlineOffset: '2px' }}
          >
            {b.label}
          </TextOverflow>
        ) : (
          <TextOverflow
            key={index}
            variant="body2"
            lineHeight="14px"
            color="grey.500"
            maxWidth="200px"
          >
            {b.label}
          </TextOverflow>
        ),
      ),
    [pathArr],
  )

  return <MuiBreadcrumbs separator="／">{breadcrumbs}</MuiBreadcrumbs>
}
