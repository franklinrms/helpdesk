import { ReactNode } from 'react'
import { Sidebar } from '@/components'

export const metadata = {
  title: 'Dashboard - HelpDesk',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-[20rem_1fr]">
      <Sidebar />
      <div className="max-h-screen overflow-y-auto">{children}</div>
    </div>
  )
}
