import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi tiết',
}

export default function Page({ children }: { children: React.ReactNode }) {
  return children
}
