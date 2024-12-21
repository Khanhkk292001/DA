// Auth.js
'use client'
import { Box, Stack, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import LoginForm from './Login'
import RegisterForm from './Register'

export default function Auth() {
  const [tab, setTab] = useState(0)

  const handleChange = (event, newValue) => {
    setTab(newValue)
  }

  const handleSwitch = () => {
    setTab((prevTab) => (prevTab === 0 ? 1 : 0))
  }

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 2,
      }}
    >
      <Tabs value={tab} onChange={handleChange} centered sx={{ mt: 10 }}>
        <Tab
          label="Đăng nhập"
          sx={{
            fontSize: 16,
            color: 'black',
            fontWeight: 600,
          }}
        />
        <Tab
          label="Đăng ký"
          sx={{
            fontSize: 16,
            color: 'black',
            fontWeight: 600,
          }}
        />
      </Tabs>

      <Box
        sx={{
          mt: 3,
        }}
      >
        {tab === 0 ? <LoginForm onSwitch={handleSwitch} /> : <RegisterForm onSwitch={handleSwitch} />}
      </Box>
    </Stack>
  )
}
