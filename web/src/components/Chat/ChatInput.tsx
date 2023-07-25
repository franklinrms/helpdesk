'use client'

import { FormEvent, useState } from 'react'
import { ClipboardCheck, ClipboardPaste, SendHorizonal } from 'lucide-react'

import { Input } from '@/components'
import { ButtonWithTooltip } from '../ButtonWithTooltip'

interface ChatInputProps {
  ticketId: string
}

export function ChatInput({ ticketId }: ChatInputProps) {
  const [hasPasteFromClipboard, setPasteFromClipboard] = useState(false)
  const [message, setMessage] = useState('')

  const handlePasteFromClipboard = async () => {
    const clipboardText = await navigator.clipboard.readText()
    setMessage(clipboardText)
    setPasteFromClipboard(true)
    setTimeout(() => setPasteFromClipboard(false), 2000)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message) return
    console.log({ ticketId, message })

    setMessage('')
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <div className="mt-2 self-start">
        <ButtonWithTooltip data-paste="" onClick={handlePasteFromClipboard}>
          <Input.Icon
            icon={hasPasteFromClipboard ? ClipboardCheck : ClipboardPaste}
          />
        </ButtonWithTooltip>
      </div>
      <Input.Root>
        <Input.Textarea
          name="message"
          placeholder="Digite sua mensagem..."
          required
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <div className="self-end">
          <button
            type="submit"
            aria-label="enviar mensagem"
            className="rounded-xl p-4 text-lg font-semibold transition-all hover:bg-zinc-800/50 hover:text-emerald-500 active:scale-95"
          >
            <Input.Icon icon={SendHorizonal} />
          </button>
        </div>
      </Input.Root>
    </form>
  )
}
