'use client'

import {
  Server,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  MessagesSquare,
} from 'lucide-react'
import { useState } from 'react'

export function ChatList() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center px-2 text-zinc-500 transition-colors hover:text-zinc-50"
      >
        {/* <LayoutList className="h-5 w-5" /> */}
        <Server className="h-5 w-5" />
        <span className="ml-2 text-xl">Tickets</span>
        {isOpen ? (
          <ChevronDown className="ml-auto h-4 w-4" />
        ) : (
          <ChevronUp className="ml-auto h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="flex flex-col space-y-3 pl-4">
          {/* chat ativo */}
          <a className="flex cursor-pointer items-center space-x-2 rounded-xl bg-zinc-800/80 p-3 transition-colors hover:bg-zinc-800/30">
            <div className="aspect-square">
              <MessagesSquare className="h-4 w-4" />
            </div>
            <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-none">
              Quaerat minus minima nemo vel, at maxime.
            </h3>
          </a>

          {/* chat com mensagens pendentes */}
          <a className="flex cursor-pointer items-center space-x-2 rounded-xl bg-zinc-800/10 p-3 text-zinc-300 transition-colors hover:bg-zinc-800/30">
            <div className="aspect-square">
              <MessagesSquare className="h-4 w-4" />
            </div>
            <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-none">
              Sapiente nesciunt ut commodi recusandae doloribus?
            </h3>
            <span className="ml-auto flex aspect-square h-5 w-5 items-center justify-center rounded-full bg-zinc-800/40 text-[10px]">
              2
            </span>
          </a>

          {/* chat finalizado */}
          <a className="flex cursor-pointer items-center space-x-2 rounded-xl bg-zinc-800/10 p-3 text-zinc-700 transition-colors hover:bg-zinc-800/30">
            <div className="aspect-square">
              <CheckSquare className="h-4 w-4" />
            </div>
            <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm  leading-none">
              Si probarem, quae ille diceret?
            </h3>
          </a>
        </div>
      )}
    </>
  )
}
