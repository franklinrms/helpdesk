import { ChevronDown, LayoutDashboard, Server } from 'lucide-react'
import { Profile } from './Profile'

export function Sidebar() {
  return (
    <aside className="flex h-screen flex-col space-y-6 bg-zinc-900/20 px-6 py-4">
      <h1 className="px-2 text-3xl">
        <span className="font-bold">Help</span>Desk
      </h1>

      <Profile />
      <nav>
        <a
          href="/dashboard"
          className="flex w-max cursor-pointer select-none items-center px-2 text-zinc-500 transition-colors hover:text-zinc-50"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="ml-2 text-xl">Dashboard</span>
        </a>

        <div className="flex cursor-pointer items-center px-2 text-zinc-500 transition-colors hover:text-zinc-50">
          <Server className="h-5 w-5" />
          <span className="ml-2 text-xl">Tickets</span>
          <ChevronDown className="ml-auto h-4 w-4" />
        </div>
      </nav>
    </aside>
  )
}
