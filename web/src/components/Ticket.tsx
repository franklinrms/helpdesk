/* eslint-disable @next/next/no-img-element */
import Cookie from 'js-cookie'
import { MessagesSquare } from 'lucide-react'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { apiUrl } from '@/lib/apiUrl'
import { ITicket } from '@/models'

dayjs.locale(ptBR)

export function Ticket({ data: ticket }: { data: ITicket }) {
  const token = Cookie.get('token') || ''

  const answer = async () => {
    const response = await fetch(
      apiUrl(`/ticket/${ticket.id}/status?status=OPEN`),
      {
        method: 'PATCH',
        headers: { authorization: token },
      },
    )

    if (response.ok) {
      window.location.href = `/dashboard/ticket/${ticket.id}`
    }
  }

  return (
    <div
      data-status={ticket.status}
      className="relative divide-y-2 divide-zinc-900 overflow-hidden rounded-xl bg-zinc-900/20 p-4 text-zinc-300 before:absolute before:left-0 before:top-0 before:-z-10 before:h-44 before:w-44 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-zinc-500 before:opacity-70 before:blur-2xl before:content-[''] data-[status=NEW]:before:bg-orange-400 data-[status=OPEN]:before:bg-green-500"
    >
      <div className="flex flex-col pb-2">
        <div className="flex justify-between">
          <MessagesSquare />
          <time className="select-none text-sm font-medium text-zinc-500">
            {dayjs(ticket.createdAt).format('DD/MM/YYYY [ às ] HH:mm')}
          </time>
        </div>
        <div className="flex flex-col items-center py-6">
          <h3 className="text-center text-lg font-medium">{ticket.title}</h3>
          <span className="text-sm text-zinc-500 before:content-['#']">
            {ticket.id}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-1 gap-1">
          {ticket.assigneeId && (
            <span className="h-7 w-7 overflow-hidden rounded-lg bg-zinc-900">
              <img src="/avatars/helper_avatar.png" alt="avatar do atendente" />
            </span>
          )}
        </div>
        <button
          onClick={answer}
          className="select-none rounded-xl bg-zinc-900 px-3 py-2 transition-colors hover:bg-zinc-800"
        >
          Responder
        </button>
      </div>
    </div>
  )
}
