'use client'

import { getPolicies } from '@/service/policy.service'
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

const PoliciesPage = () => {
  const { data: policies } = useQuery({
    queryKey: ['policies'],
    queryFn: getPolicies,
  })

  return (
    <Box padding={3}>
      <Typography variant="h1" textAlign="center" mb={4}>
        Danh sách chính sách
      </Typography>

      <Grid container spacing={3}>
        {policies &&
          policies?.map((policy) => (
            <Grid item xs={12} sm={6} md={4} key={policy.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Typography variant="h6" mb={2}>
                    Chính sách
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {policy.description}
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <Typography>
                      <b>Tỷ lệ đặt cọc:</b> {policy.depositRate * 100}%
                    </Typography>
                    <Typography>
                      <b>Phí xử lý hỏng hóc:</b> {policy.damageProcessingFee.toLocaleString('vi-VN')}₫
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}

export { PoliciesPage }
