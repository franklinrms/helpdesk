import { HTMLAttributes, ReactNode } from 'react'

interface InputRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function InputRoot({ children, ...props }: InputRootProps) {
  return (
    <div
      {...props}
      className="flex w-full items-center justify-between rounded-xl border-2 border-zinc-900 bg-zinc-950 px-3 py-2 text-zinc-700 transition-colors focus-within:border-emerald-500 focus-within:text-emerald-500 data-[error=true]:border-red-500 data-[error=true]:text-red-500"
    >
      {children}
    </div>
  )
}
