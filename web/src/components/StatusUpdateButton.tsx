'use client'

import { ButtonHTMLAttributes } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { BadgeCheck } from 'lucide-react'
import { apiUrl } from '@/lib/apiUrl'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  status: string
  ticketId: string
}
export function StatusUpdateButton({ status, ticketId, ...rest }: Props) {
  const token = Cookie.get('token') || ''

  const { push } = useRouter()

  const handleStatusUpdate = async () => {
    const response = await fetch(
      apiUrl(`/ticket/${ticketId}/status?status=${status}`),
      {
        method: 'PATCH',
        headers: { authorization: token },
      },
    )

    if (status === 'OPEN' && response.ok) {
      push(`/dashboard/ticket/${ticketId}`)
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
