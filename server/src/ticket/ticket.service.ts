import { PrismaClient, Status } from '@prisma/client'
import { NewTicketDto } from './ticket.dto'
import { ErrorTypes } from '../errors/catalog'

export class TicketService {
  constructor(private prisma: PrismaClient) {}

  public async create(userId: string, data: NewTicketDto) {
    await this.prisma.ticket.create({
      data: {
        title: data.title,
        authorId: userId,
        messages: {
          create: {
            content: data.message,
            authorId: userId,
          },
        },
      },
    })
  }

  public async findAll() {
    return await this.prisma.ticket.findMany({
      where: {
        NOT: { status: Status.CLOSED },
      },
      orderBy: { createdAt: 'asc' },
    })
  }

  private async hasTicket(id: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
    })
    if (ticket === null) throw new Error(ErrorTypes.EntityNotFound)
  }

  public async updateStatus(id: string, status: Status, userId: string) {
    await this.hasTicket(id)

    await this.prisma.ticket.update({
      where: { id },
      data: {
        status,
        assigneeId: userId,
      },
    })
  }
}
