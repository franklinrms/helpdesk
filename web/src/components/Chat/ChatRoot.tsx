import { HTMLAttributes, ReactNode } from 'react'

interface ChatRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function ChatRoot({ children, ...props }: ChatRootProps) {
  return (
    <main className="flex min-h-screen flex-col gap-2 p-6" {...props}>
      {children}
    </main>
  )
}
