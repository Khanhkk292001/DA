import { Input } from '@/libs/components/Form'
import { register } from '@/service/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { RegisterInputSchema, RegisterInputType } from './type'

export default function RegisterForm({ onSwitch }) {
  const { handleSubmit, control, reset } = useForm<RegisterInputType>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      passwordconf: '',
    },
    resolver: zodResolver(RegisterInputSchema),
  })

  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success('Đăng ký thành công')
      reset()
    },
    onError: () => {
      toast.error('Đăng ký thất bại')
    },
  })

  const onSubmit: SubmitHandler<RegisterInputType> = (data) => {
    mutate(data)
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      width={{
        xs: '100%',
        sm: 400,
        md: 500,
        lg: 600,
      }}
    >
      <Input name="name" control={control} fullWidth placeholder="Nhập tên của bạn" />

      <Input name="email" control={control} fullWidth placeholder="Email" />

      <Input name="password" control={control} fullWidth type="password" placeholder="Nhập mật khẩu của bạn" />

      <Input name="passwordconf" control={control} fullWidth type="password" placeholder="Nhập lại mật khẩu của bạn" />

      <Stack direction="row" spacing={3}>
        <Button type="submit" variant="contained" color="primary">
          Đăng ký
        </Button>

        <Stack gap={0.5} justifyContent="center">
          <Stack direction="row" alignItems="center" spacing="4px">
            <Typography variant="body2" align="center">
              Bạn đã có tài khoản?
            </Typography>
            <Typography onClick={onSwitch} color="#009dde" variant="body2" sx={{ cursor: 'pointer' }}>
              Đăng nhập ngay
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
