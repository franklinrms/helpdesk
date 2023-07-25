import { ButtonHTMLAttributes } from 'react'

export function ButtonWithTooltip({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      //   data-paste=""
      //   data-copy=""
      type="button"
      className="relative rounded-2xl p-4 text-lg font-semibold text-zinc-700 transition-all hover:bg-zinc-800/40 hover:text-emerald-500 hover:after:absolute hover:after:-bottom-4 hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:rounded hover:after:bg-emerald-500 hover:after:px-2 hover:after:font-light hover:after:text-zinc-50 active:scale-95 data-[copy]:hover:after:content-['copiar'] data-[paste]:hover:after:content-['colar']"
      {...props}
    />
  )
}
