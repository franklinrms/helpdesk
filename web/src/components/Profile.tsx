import { getUser } from '@/lib/auth'
import { LogOut } from 'lucide-react'
import Image from 'next/image'

export async function Profile() {
  const { name, avatarUrl } = await getUser()

  return (
    <div className="flex items-center gap-3 rounded-xl bg-zinc-800/50 p-3">
      <div className="h-12 w-12 overflow-hidden rounded-xl bg-zinc-700">
        <Image width={150} height={150} src={avatarUrl} alt="" />
      </div>
      <div className="leading-none">
        <h1 className="text-zinc-3000 font-medium">{name}</h1>
        <span className="text-sm text-zinc-500 before:mr-1 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-green-500 before:content-['']">
          online
        </span>
      </div>
      <a
        aria-label="sair"
        href="/api/auth/logout"
        className="ml-auto cursor-pointer text-zinc-500 transition-colors hover:text-zinc-50"
      >
        <LogOut className="h-5 w-5" />
      </a>
    </div>
  )
}
