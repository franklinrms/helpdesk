'use client'

import { FormEvent, useState } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { Button, Input } from '@/components'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [deniedUser, setDeniedUser] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      window.location.href = '/dashboard'
    } else {
      setDeniedUser(true)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        className="flex w-96 flex-col items-center gap-4 rounded-xl bg-zinc-900 p-10"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-5 text-dynamic font-semibold">Acesse sua conta</h2>

        {deniedUser && (
          <span className="text-red-500">Usuário ou senha inválidos</span>
        )}

        <Input.Root data-error={deniedUser}>
          <Input.Icon icon={Mail} />
          <Input.Element
            name="email"
            required
            type="email"
            placeholder="E-mail"
          />
        </Input.Root>

        <Input.Root data-error={deniedUser}>
          <Input.Icon icon={Lock} />
          <Input.Element
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-zinc-700 outline-none transition-colors hover:text-zinc-100"
          >
            <Input.Icon icon={showPassword ? Eye : EyeOff} />
          </button>
        </Input.Root>

        <Button type="submit">Entrar</Button>
      </form>
    </main>
  )
}
