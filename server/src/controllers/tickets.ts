import {
  Get,
  JsonController,
  Param,
  Post,
  Body,
  HttpCode
} from 'routing-controllers'
import Event from '../entities/Event'
import Ticket from '../entities/Ticket'
import User from '../entities/User'

interface TicketInfo {
  price: number
  description?: string
  image?: string
}

@JsonController('/tickets')
export default class TicketController {
  @Get('/:id')
  getSingleTicket(@Param('id') id: number) {
    return Ticket.createQueryBuilder('t')
      .select([
        't.id',
        't.price',
        't.description',
        't.image',
        'e.id',
        'e.name',
        'e.description',
        'e.startDate',
        'e.endDate',
        'c.content',
        'c.createdAt',
        'u.firstName',
        'u.lastName'
      ])
      .innerJoin('t.event', 'e')
      .innerJoin('t.comments', 'c')
      .innerJoin('c.user', 'u')
      .where('t.event = :eventId', { eventId: id })
      .getOne()
  }
  @Post('/:eventId')
  @HttpCode(201)
  async addTicket(
    @Param('eventId') eventId: number,
    @Body() ticketInfo: TicketInfo
  ) {
    // const user = await User.findOne({ id: 32 }, { relations: ['tickets'] })
    // const newTicket = await Ticket.create({
    //   ...ticketInfo,
    //   event: eventId
    // }).save()
    // user.tickets.push(newTicket)
    // await user.save()

    // const { event, ...ticket } = await Ticket.findOne(
    //   { id: newTicket.id },
    //   { relations: ['user', 'event', 'comments', 'user.tickets'] }
    // )

    const ticket = await Ticket.createQueryBuilder('t')
      .select(['t', 'u.id', 'u.firstName', 'ut.id'])
      .leftJoin('t.user', 'u')
      .leftJoin('u.tickets', 'ut')
      .where('u.id=:id', { id: 32 })
      .getOne()

    // ticket.eventId = eventId

    return {
      ticket
    }
  }
}
