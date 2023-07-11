'use client'

import useSWR from 'swr'
import { Ticket } from '@/components'
import { ITicket } from '@/models'
import { fetcher } from '@/lib/fetcher'

export default function DashboardPage() {
  const { data } = useSWR<ITicket[]>('/ticket', fetcher, {
    fallbackData: [],
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return (
    <main className="flex min-h-screen flex-col p-8">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {data?.map((ticket) => (
          <Ticket key={ticket.id} data={ticket} />
        ))}
      </section>
    </main>
  )
}
