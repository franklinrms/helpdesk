import z from 'zod'

export const NewTicketSchema = z.object({
  title: z.string(),
  message: z.string(),
})

export type NewTicketDto = z.infer<typeof NewTicketSchema>
