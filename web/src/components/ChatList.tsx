'use client'

import useSWR from 'swr'
import useSWRSubscription, { SWRSubscriptionOptions } from 'swr/subscription'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CheckSquare, MessagesSquare } from 'lucide-react'
import { fetcher } from '@/lib/fetcher'
import { eventSource } from '@/lib/eventSource'
import { ITicket } from '@/models'

export function ChatList() {
  const pathname = usePathname().split('/')[3] || ''

  const { data, mutate } = useSWR<ITicket[]>('/ticket?byUser=true', fetcher, {
    fallbackData: [],
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  useSWRSubscription(
    '/ticket/subscribe?byUser=true',
    (path, { next }: SWRSubscriptionOptions) => {
      const es = eventSource(path)

      es.addEventListener('ticket-updated', async (event) => {
        const ticketChanged: ITicket = JSON.parse(event.data)
        await mutate((prev) => {
          const foundIndex = prev!.findIndex(
            (ticket) => ticket.id === ticketChanged.id,
          )
          if (foundIndex === -1) {
            prev!.unshift(ticketChanged)
          } else {
            prev![foundIndex] = ticketChanged
          }
          return [...prev!]
        }, false)
        next(null, ticketChanged)
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
    <div className="flex max-h-full flex-col space-y-1 pl-4">
      {data!.map((ticket) => (
        <Link
          key={ticket.id}
          data-active={pathname === ticket.id}
          data-status={ticket.status}
          href={`/dashboard/ticket/${ticket.id}`}
          className="flex cursor-pointer items-center space-x-2 rounded-xl p-3 transition-colors hover:bg-zinc-800/30 data-[active=true]:bg-zinc-800/80 data-[active=true]:text-zinc-50 data-[status='CLOSED']:text-zinc-700"
        >
          <div className="aspect-square">
            {ticket.status === 'OPEN' ? (
              <MessagesSquare className="h-4 w-4" />
            ) : (
              <CheckSquare className="h-4 w-4" />
            )}
          </div>
          <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-none">
            {ticket.title}
          </h3>
        </Link>
      ))}
    </div>
  )
}
