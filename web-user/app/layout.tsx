'use client'

import { AxiosInterceptor } from '@/libs/configs'
import { ThemeProvider } from '@/libs/providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'sonner'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../libs/styles/global.module.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // default: true
          },
        },
      }),
  )

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
    currency: 'USD',
    intent: 'capture',
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeProvider
          options={{
            key: 'theme-provider',
          }}
        >
          <RecoilRoot>
            <QueryClientProvider client={queryClient}>
              <PayPalScriptProvider options={initialOptions}>
                {/* <FacebookProvider appId="123456789"> */}
                <AxiosInterceptor>
                  {/* <MessageUs messengerAppId="123456789" pageId="123456789" /> */}
                  <Toaster position="top-right" richColors closeButton />

                  {children}
                </AxiosInterceptor>
                {/* </FacebookProvider> */}
              </PayPalScriptProvider>
            </QueryClientProvider>
          </RecoilRoot>
        </ThemeProvider>
      </body>
    </html>
  )
}
