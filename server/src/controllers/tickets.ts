import {
  Authorized,
  BodyParam,
  CurrentUser,
  Delete,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Patch,
  Post,
  UnauthorizedError
} from 'routing-controllers'
import Event from '../entities/Event'
import Ticket from '../entities/Ticket'
import User from '../entities/User'

interface TicketData {
  price: number
  description?: string
  image?: string
}

@JsonController('/tickets')
export default class TicketController {
  @Authorized()
  @Post('/:eventId')
  @HttpCode(201)
  async addTicket(
    @Param('eventId') eventId: number,
    @BodyParam('ticketData') ticketData: TicketData,
    @CurrentUser() user: User
  ) {
    if (!user) throw new UnauthorizedError()
    const event = await Event.findOne({ id: eventId })
    if (!event) throw new NotFoundError('event not found')
    await Ticket.createQueryBuilder()
      .insert()
      .into(Ticket)
      .values([
        {
          ...ticketData,
          user,
          event: event
        }
      ])
      .execute()

    return true
  }

  @Authorized()
  @Patch('/:ticketId')
  async updateTicket(
    @Param('ticketId') ticketId: number,
    @BodyParam('ticketData') ticketData: TicketData,
    @CurrentUser() user: User
  ) {
    if (!user) throw new UnauthorizedError()
    const ticket = await Ticket.findOne(
      { id: ticketId },
      { relations: ['user'] }
    )

    if (!ticket) throw new NotFoundError()
    if (ticket.user.id !== user.id && !user.admin) throw new UnauthorizedError()
    await Ticket.update(ticketId, { ...ticketData })
    return true
  }

  @Authorized()
  @Delete('/:ticketId')
  async deleteTicket(
    @Param('ticketId') ticketId: number,
    @CurrentUser() user: User
  ) {
    if (!user) throw new UnauthorizedError()

    const ticket = await Ticket.findOne(
      { id: ticketId },
      { relations: ['user'] }
    )
    if (!ticket) throw new NotFoundError()
    if (ticket.user.id !== user.id && !user.admin) throw new UnauthorizedError()
    await ticket.remove()
    return true
  }
}
