'use client'

import { useAutoSizeTextArea } from '@/hooks/useAutoSizeTextArea'
import { DetailedHTMLProps, TextareaHTMLAttributes, useRef } from 'react'

interface InputTextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  name: string
  value: string
}

export function InputTextarea({ name, value, ...props }: InputTextareaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useAutoSizeTextArea(textAreaRef.current, value)
  return (
    <textarea
      id={name}
      name={name}
      rows={1}
      ref={textAreaRef}
      className="flex-1 resize-none bg-transparent p-2 text-lg text-zinc-50 placeholder-zinc-600 outline-none transition-colors"
      {...props}
      value={value}
    />
  )
}
