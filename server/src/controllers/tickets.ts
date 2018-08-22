import {
  Get,
  JsonController,
  Param,
  Post,
  Body,
  HttpCode,
  Authorized,
  CurrentUser,
  NotFoundError,
  BodyParam,
  Patch
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
  // @Get('/:id')
  // getSingleTicket(@Param('id') id: number) {
  //   return Ticket.createQueryBuilder('t')
  //     .select([
  //       't.id',
  //       't.price',
  //       't.description',
  //       't.image',
  //       'e.id',
  //       'e.name',
  //       'e.description',
  //       'e.startDate',
  //       'e.endDate',
  //       'c.content',
  //       'c.createdAt',
  //       'u.firstName',
  //       'u.lastName'
  //     ])
  //     .innerJoin('t.event', 'e')
  //     .innerJoin('t.comments', 'c')
  //     .innerJoin('c.user', 'u')
  //     .where('t.event = :eventId', { eventId: id })
  //     .getOne()
  // }
  @Authorized()
  @Post('/:eventId')
  @HttpCode(201)
  async addTicket(
    @Param('eventId') eventId: number,
    @BodyParam('ticketData') ticketData: TicketData,
    @CurrentUser() user: User
  ) {
    if (!user) throw new NotFoundError('user not found')
    // const user = await User.findOne({ id: user.id }, { relations: ['tickets'] })

    // const newTicket = await Ticket.create({
    //   ...ticketData,
    //   user: user
    // }).save()

    const res = await Ticket.createQueryBuilder()
      .insert()
      .into(Ticket)
      .values([
        {
          ...ticketData,
          user,
          event: await Event.findOne({ id: eventId })
        }
      ])
      .execute()
    // console.log()

    // user.tickets.push(newTicket)
    // await user.save()
    // console.log()

    // const ticket = await Ticket.createQueryBuilder('t')
    //   .select(['t', 'u.id', 'u.firstName', 'u.lastName', 'ut.id', 'e.id'])
    //   .leftJoinAndSelect('t.comments', 'c')
    //   .leftJoin('t.user', 'u')
    //   .leftJoin('u.tickets', 'ut')
    //   .leftJoin('t.event', 'e')
    //   .where('t.id=:id', { id: res.identifiers[0].id })
    //   .getOne()

    // const ticket = await Ticket.createQueryBuilder('t')
    //   .select(['t', 'u.id', 'u.firstName', 'ut.id'])
    //   .leftJoin('t.user', 'u')
    //   .leftJoin('u.tickets', 'ut')
    //   .where('u.id=:id', { id: 32 })
    //   .getOne()
    return true
  }

  @Authorized()
  @Patch('/:ticketId')
  async updateTicke(
    @Param('ticketId') ticketId: number,
    @BodyParam('ticketData') ticketData: TicketData
  ) {
    await Ticket.update(ticketId, { ...ticketData })
    return true
  }
}
