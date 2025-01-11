import { formatMoney } from '@/utils'
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { useState } from 'react'
import { RentalType } from '../type'
import { ModalFeedback } from './ModalFeedback'
import { ModalFeedbackItem } from './ModalFeedbackItem'
import { ModalReport } from './ModalReport'

export const RentalHistoryItem = ({ rental }: { rental: RentalType }) => {
  const [open, setOpen] = useState(false)
  const [feedbackItemOpen, setFeedbackItemOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  const isCurrentTimeInRange = (rental: RentalType): boolean => {
    const currentTime = new Date()
    const startDate = new Date(rental.startDate)
    const endDate = new Date(rental.endDate)

    return currentTime >= startDate && currentTime <= endDate
  }

  const isAfterEndDate = (endDate: string): boolean => {
    const currentTime = new Date()
    const endDateTime = new Date(endDate)

    return currentTime.getTime() > endDateTime.getTime()
  }
  console.log(rental);
  return (
    <Paper key={rental.id} sx={{ marginBottom: 3, padding: 2, position: 'relative' }}>
      <Stack direction="row" justifyContent="space-between" position="absolute" top={20} right={20}>
        {isAfterEndDate(rental.endDate) && (
          <Button color="error" onClick={() => setFeedbackOpen(true)}>
            Đánh giá
          </Button>
        )}
      </Stack>
      <Typography>
        <b>Mã đơn thuê</b>: {rental.id}
      </Typography>
      <Typography>
        <b>Trạng thái</b>: {rental.status}
      </Typography>
      <Typography>
        <b>Thời gian thuê</b>: {format(rental.startDate, 'dd/MM/yyyy')} - {format(rental.endDate, 'dd/MM/yyyy')}
      </Typography>
      <Typography>
        <b>Tổng giá thuê</b>: {formatMoney(rental.totalAmount)}
      </Typography>

      <ModalFeedback handleClose={() => setFeedbackOpen(false)} open={feedbackOpen} rentalId={rental.id} />

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell>Mã thiết bị hoặc gói</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Loại thời gian</TableCell>
              <TableCell>Đơn vị thời gian</TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rental.items.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.equipmentId ?? item.packageId ?? '-'}</TableCell>
                  <TableCell>{item?.equipment?.name ?? item?.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.durationType}</TableCell>
                  <TableCell>{item.durationValue}</TableCell>
                  <TableCell>
                    {isCurrentTimeInRange(rental) && rental.status === 'confirmed' && (
                      <Button color="error" onClick={() => setOpen(true)}>
                        Báo hỏng
                      </Button>
                    )}

                    {isAfterEndDate(rental.endDate) && (
                      <Button color="error" onClick={() => setFeedbackItemOpen(true)}>
                        Đánh giá thiết bị
                      </Button>
                    )}
                  </TableCell>

                  <ModalFeedbackItem
                    equipmentId={item.equipmentId}
                    packageId={item.packageId}
                    rentalId={item.id}
                    handleClose={() => setFeedbackItemOpen(false)}
                    open={feedbackItemOpen}
                  />
                  <ModalReport handleClose={() => setOpen(false)} open={open} equipmentId={item.equipmentId} />
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
