'use client'

import useSWR from 'swr'
import useSWRSubscription, { SWRSubscriptionOptions } from 'swr/subscription'
import { Ticket } from '@/components'
import { ITicket } from '@/models'
import { fetcher } from '@/lib/fetcher'
import { eventSource } from '@/lib/eventSource'

export default function DashboardPage() {
  const { data, mutate } = useSWR<ITicket[]>('/ticket', fetcher, {
    fallbackData: [],
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  useSWRSubscription(
    '/ticket/subscribe',
    (path, { next }: SWRSubscriptionOptions) => {
      const es = eventSource(path)

      es.addEventListener('ticket-updated', async (event) => {
        const ticketChanged: ITicket = JSON.parse(event.data)
        await mutate((prev) => {
          const foundIndex = prev!.findIndex(
            (ticket) => ticket.id === ticketChanged.id,
          )
          if (foundIndex === -1) {
            prev!.push(ticketChanged)
          } else {
            prev![foundIndex] = ticketChanged
          }
          return [...prev!]
        }, false)
        next(null, ticketChanged)
      })
      es.addEventListener('ticket-created', async (event) => {
        const ticketCreated: ITicket = JSON.parse(event.data)
        await mutate((prev) => {
          prev!.push(ticketCreated)

          return [...prev!]
        }, false)
        next(null, ticketCreated)
      })

      es.onerror = (event) => {
        console.error(event)
        es.close()
      }
      return () => {
        console.log('close event source')
        es.close()
      }
    },
    {},
  )

  return (
    <main className="flex min-h-screen flex-col p-8">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {data!.map((ticket) => (
          <Ticket key={ticket.id} data={ticket} />
        ))}
      </section>
    </main>
  )
}
