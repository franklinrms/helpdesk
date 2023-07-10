export interface ITicket {
  id: string
  title: string
  status: string
  rating?: string | null
  authorId: string
  assigneeId?: string | null
  createdAt: string
  updatedAt: string
}
