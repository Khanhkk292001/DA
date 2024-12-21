import { DatePicker, Input, Select } from '@/libs/components/Form'
import { useGetMe } from '@/libs/hooks'
import { clearCart } from '@/service/cart.service'
import { getDiscountById } from '@/service/discount.service'
import { createRental } from '@/service/rental.service'
import { formatMoney } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, Divider, Stack, TextField, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PayPalButton } from 'react-paypal-button-v2'
import { toast } from 'sonner'
import { IdentityDocStatus } from '../auth/type'
import { durationOptions } from '../product/option'
import { CartInputSchema, CartInputType, CartType } from './type'
import { calculateDeposit, calculateEndDate, calculatorAmount } from './utils'

interface OrderInfoProps {
  cart: CartType
}

const OrderInfo = ({ cart }: OrderInfoProps) => {
  const { data: currentUser } = useGetMe()
  const queryClient = useQueryClient()
  const [rentalAmount, setRentalAmount] = useState(0)

  const { control, watch, setValue, handleSubmit, reset } = useForm<CartInputType>({
    defaultValues: {
      endDate: '',
      items: [],
      startDate: new Date().toISOString(),
      totalAmount: 0,
      durationType: 'day',
      durationValue: 1,
      address: '',
    },
    resolver: zodResolver(CartInputSchema),
  })

  const durationType = watch('durationType')
  const durationValue = watch('durationValue')
  const startDate = watch('startDate')

  useEffect(() => {
    if (durationType && durationValue && startDate) {
      const formattedStartDate = new Date(startDate)

      if (isNaN(formattedStartDate.getTime())) {
        console.error('Ngày bắt đầu không hợp lệ')
        return
      }

      const calculatedEndDate = calculateEndDate({
        startDate: formattedStartDate.toISOString(),
        durationType,
        durationValue,
      })

      setValue('endDate', calculatedEndDate)
    }
  }, [durationType, durationValue, startDate])

  useEffect(() => {
    if (cart) {
      if (cart?.totalAmount) {
        const total = calculatorAmount({
          durationType,
          durationValue,
          rentalPrice: cart?.totalAmount,
        })

        setRentalAmount(total)
        setValue('totalAmount', total + calculateDeposit(cart))
      }
    }
  }, [durationType, durationValue, cart])

  const { mutate, isPending } = useMutation({
    mutationFn: createRental,
    onSuccess: async () => {
      await clearCart().then(() => {
        queryClient.invalidateQueries({ queryKey: ['Carts'] })
      })
      reset()
      toast.success('Tạo đơn thuê thành công')
    },
    onError: (error) => {
      console.error('Error creating rental:', error)
      toast.error('Tạo đơn thuê thất bại')
    },
  })

  const onSubmit: SubmitHandler<CartInputType> = (data) => {
    const { totalAmount, durationType, durationValue, startDate, endDate, address } = data
    if (currentUser.statusIdentityDoc !== IdentityDocStatus.VERIFIED) {
      toast.error('Tài khoản của bạn phải được xác thực để có thể thuê thiết bị')
      return
    }

    mutate({
      startDate,
      endDate,
      totalAmount,
      address,
      items: cart.items.map((item) => ({
        equipmentId: item.equipmentId,
        packageId: item.packageId,
        quantity: item.quantity,
        durationType: durationType,
        durationValue: Number(durationValue),
        price: data.totalAmount,
      })),
    })
  }

  const isEmptyCart = cart?.items?.length === 0

  const inputRef = useRef<HTMLInputElement>(null)

  const { refetch } = useQuery({
    queryKey: ['Discounts'],
    queryFn: () => getDiscountById(inputRef.current?.value || ''),
    enabled: false,
  })

  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault() // Prevent the default paste behavior

    const pasteData = event.clipboardData.getData('text')
    if (inputRef.current) {
      inputRef.current.value = pasteData // Update the input value
    }

    try {
      const { data: discountData } = await refetch()
      if (discountData && discountData.discountRate) {
        const totalAmount = watch('totalAmount')

        // Validate discountRate to avoid division by zero or invalid values
        const discountRate = discountData.discountRate > 0 ? discountData.discountRate : 1
        const newTotalAmount = totalAmount - (totalAmount * discountRate) / 100

        setValue('totalAmount', newTotalAmount)
        toast.success('Áp dụng mã giảm giá thành công')
      } else {
        toast.error('Không tìm thấy mã giảm giá hoặc mã giảm giá không hợp lệ')
      }
    } catch (error) {
      console.error('Error fetching discount:', error)
      toast.error('Có lỗi xảy ra khi áp dụng mã giảm giá')
    }
  }

  const total = Math.floor(watch('totalAmount') / 24000)

  return (
    <Card sx={{ borderRadius: 2, mb: 2 }}>
      <CardContent component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Thông tin đơn hàng
        </Typography>

        <Stack spacing={2}>
          <DatePicker
            control={control}
            name="startDate"
            label="Ngày bắt đầu"
            fullWidth
            disabled={isEmptyCart || isPending}
          />
          <DatePicker control={control} name="endDate" label="Ngày kết thúc" fullWidth disabled />
          <Select
            name="durationType"
            control={control}
            options={durationOptions}
            label="Loại thời gian"
            fullWidth
            hiddenEmpty
            disabled={isEmptyCart || isPending}
          />
          <Input
            control={control}
            name="durationValue"
            label="Thời lượng"
            type="number"
            fullWidth
            disabled={isEmptyCart || isPending}
          />

          <Input control={control} name="totalAmount" type="number" fullWidth disabled sx={{ display: 'none' }} />

          <Input control={control} name="address" fullWidth label="Địa chỉ nhận hàng" />

          <TextField
            inputRef={inputRef}
            fullWidth
            onPaste={handlePaste}
            placeholder="Dán mã giảm giá"
            inputProps={{
              readOnly: true,
            }}
          />

          <Divider sx={{ mb: 2 }} />

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Thông tin thanh toán
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
            Tiền đặt cọc: <strong style={{ color: 'red' }}>{formatMoney(calculateDeposit(cart))}</strong>
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
            Tiền thuê: <strong style={{ color: 'red' }}>{formatMoney(rentalAmount)}</strong>
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
            Giảm:{' '}
            <strong style={{ color: 'red' }}>
              {formatMoney(watch('totalAmount') - rentalAmount - calculateDeposit(cart))}
            </strong>
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
            Tổng tiền: <strong style={{ color: 'red' }}>{formatMoney(watch('totalAmount'))}</strong>
          </Typography>
          <ul>
            <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
            <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
          </ul>

          {!currentUser ? (
            <Stack spacing={2}>
              <Typography variant="body2" sx={{ color: 'red' }} textAlign="center">
                Bạn cần đăng nhập để thanh toán
              </Typography>
            </Stack>
          ) : (
            <>
              {currentUser && currentUser?.statusIdentityDoc !== IdentityDocStatus.VERIFIED ? (
                <Stack spacing={2}>
                  <Typography variant="body2" sx={{ color: 'red' }}>
                    Tài khoản của bạn chưa được xác thực. Vui lòng xác thực tài khoản để có thể thuê thiết bị.
                  </Typography>
                </Stack>
              ) : (
                <Stack direction="row" spacing={6}>
                  <Stack width={800} bgcolor="base.white" borderRadius={1} spacing={3}>
                    <Typography fontSize={20} fontWeight={700}>
                      Phương thức thanh toán online
                    </Typography>

                    <PayPalButton
                      amount={total}
                      onSuccess={() => {
                        handleSubmit(onSubmit)()
                      }}
                      onError={() => {
                        toast.error('Thanh toán thất bại')
                      }}
                    />
                  </Stack>
                </Stack>
              )}
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default OrderInfo
