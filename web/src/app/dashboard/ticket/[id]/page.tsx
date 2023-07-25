import { Chat } from '@/components'

export default function TicketPage({ params }: { params: { id: string } }) {
  return (
    <div className="grid grid-cols-[1fr_24rem]">
      <Chat.Root>
        <section className="flex-1">messages</section>
        <Chat.Input ticketId={params.id} />
      </Chat.Root>
      {/* barra lateral */}
      <aside className="min-h-screen bg-zinc-900/20"></aside>
    </div>
  )
}
