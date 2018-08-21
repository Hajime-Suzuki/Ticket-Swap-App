import { Get, JsonController, Param } from 'routing-controllers'
import Event from '../entities/Event'
import Ticket from '../entities/Ticket'

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
}
