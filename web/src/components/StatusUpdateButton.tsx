'use client'

import { ButtonHTMLAttributes } from 'react'
import Cookie from 'js-cookie'
import { BadgeCheck } from 'lucide-react'
import { apiUrl } from '@/lib/apiUrl'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  status: string
  ticketId: string
}
export function StatusUpdateButton({ status, ticketId, ...rest }: Props) {
  const token = Cookie.get('token') || ''

  const handleStatusUpdate = async () => {
    const newStatus = status === 'NEW' ? 'OPEN' : 'CLOSED'

    const response = await fetch(
      apiUrl(`/ticket/${ticketId}/status?status=${newStatus}`),
      {
        method: 'PATCH',
        headers: { authorization: token },
      },
    )

    if (status === 'NEW' && response.ok) {
      window.location.href = `/dashboard/ticket/${ticketId}`
    }
  }

  if (status === 'CLOSED') {
    return (
      <span className="flex select-none items-center gap-1 rounded-xl bg-zinc-900 px-3 py-2">
        <BadgeCheck className="h-4 w-4" />
        Finalizado
      </span>
    )
  }
  return (
    <button
      className="select-none rounded-xl bg-zinc-900 px-3 py-2 transition-colors hover:bg-zinc-800"
      onClick={handleStatusUpdate}
      {...rest}
    />
  )
}
