'use client'

import request from '@/libs/config/axios'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'

const DashboardForm = () => {
  type DataRespose = {
    totalUsers: number
    totalEquipments: number
    totalStock: number
    totalRentals: number
    totalCartItems: number
    totalMaintenance: number
    totalDamageReports: number
    totalFeedbacks: number
  }

  const { data } = useQuery({
    queryKey: ['statistical-overview'],
    queryFn: async () => {
      const resonse = await request.get<DataRespose>('/statistical/overview')

      return resonse.data
    },
  })

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h2" gutterBottom mb={3}>
        Trang Thống Kê
      </Typography>

      <Grid container spacing={3}>
        {/* Tổng người dùng */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: 'center',
                backgroundColor: '#e3f2fd', // Màu nền cho Tổng người dùng
              }}
            >
              <Typography variant="h6">Tổng người dùng</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {data?.totalUsers}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Tổng thiết bị */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: 'center',
                backgroundColor: '#ffeb3b', // Màu nền cho Tổng thiết bị
              }}
            >
              <Typography variant="h6">Tổng thiết bị</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {data?.totalEquipments}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Tổng số lượng hàng tồn kho */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: 'center',
                backgroundColor: '#c8e6c9', // Màu nền cho Tổng hàng tồn kho
              }}
            >
              <Typography variant="h6">Tổng số lượng hàng tồn kho</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {data?.totalStock}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Tổng đơn thuê */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: 'center',
                backgroundColor: '#ff7043', // Màu nền cho Tổng đơn thuê
              }}
            >
              <Typography variant="h6">Tổng đơn thuê</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {data?.totalRentals}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Tổng mặt hàng trong giỏ hàng */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: 'center',
                backgroundColor: '#f8bbd0', // Màu nền cho Tổng mặt hàng trong giỏ hàng
              }}
            >
              <Typography variant="h6">Tổng mặt hàng trong giỏ hàng</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {data?.totalCartItems}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Tổng bảo trì */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: 'center',
                backgroundColor: '#fbc02d', // Màu nền cho Tổng bảo trì
              }}
            >
              <Typography variant="h6">Tổng bảo trì</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {data?.totalMaintenance}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Tổng báo cáo hỏng */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: 'center',
                backgroundColor: '#d32f2f', // Màu nền cho Tổng báo cáo hỏng
              }}
            >
              <Typography variant="h6">Tổng báo cáo hỏng</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {data?.totalDamageReports}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Tổng đánh giá */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: 'center',
                backgroundColor: '#81c784', // Màu nền cho Tổng đánh giá
              }}
            >
              <Typography variant="h6">Tổng đánh giá</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {data?.totalFeedbacks}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  )
}

export { DashboardForm }
