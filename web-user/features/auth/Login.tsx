'use client'

import { Input } from '@/libs/components/Form'
import { login } from '@/service/auth.service'
import { setAccessTokenToStorage } from '@/utils/localStorage'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { LoginInputSchema, LoginInputType } from './type'

export default function LoginForm({ onSwitch }) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { handleSubmit, control } = useForm<LoginInputType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginInputSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onError: () => {
      toast.error('Đăng nhập thất bại, vui lòng kiểm tra lại email hoặc mật khẩu')
    },
    onSuccess: async (data) => {
      toast.success('Đăng nhập thành công')
      const { token, user } = data
      router.push('/')
      await setAccessTokenToStorage(token)
      queryClient.setQueryData(['ME'], user)
    },
  })

  const onSubmit: SubmitHandler<LoginInputType> = (data) => {
    mutate(data)
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      maxWidth={{
        xs: '100%',
        sm: 400,
        md: 500,
        lg: 600,
      }}
    >
      <Input name="email" control={control} fullWidth placeholder="Email" autoComplete="email" disabled={isPending} />

      <Input
        name="password"
        control={control}
        fullWidth
        placeholder="Vui lòng nhập mật khẩu"
        type="password"
        autoComplete="new-password"
        disabled={isPending}
      />

      <Typography variant="subtitle1">
        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </Typography>

      <Stack direction="row" spacing={3}>
        <Button type="submit" variant="contained" color="primary" disabled={isPending}>
          Đăng nhập
        </Button>

        <Stack gap={0.5} justifyContent="center">
          {/* <Stack direction="row" alignItems="center" spacing="4px">
            <Typography variant="body2" align="center">
              Bạn quên mật khẩu?
            </Typography>
            <Typography
              component={Link}
              href="#"
              color="#009dde"
              variant="body2"
              sx={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              Quên mật khẩu?
            </Typography>
          </Stack> */}

          <Stack direction="row" alignItems="center" spacing="4px">
            <Typography variant="body2" align="center">
              Chưa có tài khoản?
            </Typography>
            <Typography onClick={onSwitch} color="#009dde" variant="body2" sx={{ cursor: 'pointer' }}>
              Đăng ký ngay
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
