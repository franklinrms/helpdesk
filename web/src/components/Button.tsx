import { ButtonHTMLAttributes } from 'react'

export function Button({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="mt-5 w-full rounded-xl bg-emerald-700 px-6 py-4 text-lg font-semibold text-white outline-none transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed"
      {...props}
    />
  )
}
