import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react'
import { Profile } from './Profile'
import { ChatList } from './ChatList'

export function Sidebar() {
  return (
    <aside className="flex h-screen flex-col space-y-6 bg-zinc-900/20 px-6 py-4">
      <h1 className="px-2 text-3xl">
        <span className="font-bold">Help</span>Desk
      </h1>

      <Profile />
      <nav className="space-y-3">
        <Link
          href="/dashboard"
          className="flex w-max cursor-pointer select-none items-center px-2 text-zinc-500 transition-colors hover:text-zinc-50"
        >
          <LayoutDashboard className="aspect-square w-5" />
          <span className="ml-2 text-xl">Dashboard</span>
        </Link>
        <span className="block h-[2px] w-full rounded-full bg-zinc-900" />
        <span className="flex select-none items-center px-2 text-lg text-zinc-500">
          Tickets
        </span>
        <ChatList />
        <span className="block h-[2px] w-full rounded-full bg-zinc-900" />
      </nav>
    </aside>
  )
}
