import { PrismaClient, Status, Ticket } from '@prisma/client'
import { mongoDB } from '../lib/mongo/client'
import { NewTicketDto } from './ticket.dto'
import { ErrorTypes } from '../errors/catalog'
import type { ChangeStreamInsertDocument } from 'mongodb'
import { Observable } from 'rxjs'

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
      orderBy: [{ status: 'asc' }, { createdAt: 'asc' }],
    })
  }

  public async findByUser(id: string) {
    return await this.prisma.ticket.findMany({
      where: {
        OR: [{ authorId: id }, { assigneeId: id }],
      },
      take: 10,
      orderBy: [{ status: 'desc' }, { createdAt: 'desc' }],
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

  private watchTicketChanges(pipeline: any) {
    return mongoDB
      .getDatabase()
      .collection('tickets')
      .watch(pipeline, { fullDocument: 'updateLookup' })
  }

  public subscribeEvents(): Observable<{
    event: 'ticket-created' | 'ticket-updated'
    data: Ticket
  }> {
    return new Observable((observer) => {
      this.watchTicketChanges([
        {
          $match: {
            $or: [{ operationType: 'insert' }, { operationType: 'update' }],
          },
        },
      ]).on('change', async (data: ChangeStreamInsertDocument) => {
        const ticket = await this.prisma.ticket.findUnique({
          where: { id: data.documentKey._id + '' },
        })
        observer.next({
          event:
            data.operationType === 'insert'
              ? 'ticket-created'
              : 'ticket-updated',
          data: ticket!,
        })
      })
    })
  }

  public subscribeEventsByUser(userId: string): Observable<{
    event: 'ticket-updated'
    data: Ticket
  }> {
    return new Observable((observer) => {
      this.watchTicketChanges([
        {
          $match: {
            operationType: 'update',
            $or: [
              { 'fullDocument.assignee_id': userId },
              { 'fullDocument.author_id': userId },
            ],
          },
        },
      ]).on('change', async (data: ChangeStreamInsertDocument) => {
        const ticket = await this.prisma.ticket.findUnique({
          where: { id: data.documentKey._id + '' },
        })
        observer.next({
          event: 'ticket-updated',
          data: ticket!,
        })
      })
    })
  }
}
