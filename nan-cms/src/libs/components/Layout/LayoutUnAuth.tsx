'use client'

import { useAuth } from '@/libs/context'
import { CircularProgress } from '@mui/material'
import { Stack } from '@mui/system'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LayoutUnAuth = ({ children }: { children: React.ReactNode }) => {
  const { admin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (admin && !loading) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, loading])

  return loading || admin ? (
    <Stack width="100%" height="100vh" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  ) : (
    children
  )
}

export { LayoutUnAuth }
