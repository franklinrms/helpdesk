import { InputHTMLAttributes } from 'react'

interface InputElementProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function InputElement({ name, ...props }: InputElementProps) {
  return (
    <input
      id={name}
      name={name}
      className="flex-1 bg-transparent p-2 text-lg text-zinc-50 placeholder-zinc-600 outline-none transition-colors"
      {...props}
    />
  )
}
