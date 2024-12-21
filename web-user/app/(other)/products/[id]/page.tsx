import { ProductDetail } from '@/features/product'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense>
      <ProductDetail />
    </Suspense>
  )
}
