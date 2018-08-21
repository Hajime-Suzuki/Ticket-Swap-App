import { Get, JsonController, QueryParam } from 'routing-controllers'
import Event from '../entities/Event'

@JsonController('/events')
export default class EventController {
  @Get('/')
  async getAllEvents(@QueryParam('pageNum') pageNum: number) {
    const events = await Event.createQueryBuilder('e')
      .select([
        'e.id',
        'e.name',
        'e.image',
        'e.startDate',
        'e.endDate',
        'e.description',
        't.id',
        't.price',
        't.description',
        't.image',
        't.event_id',
        'u.id',
        'u.firstName',
        'u.lastName',
        'u.email',
        // 'u.admin',
        'c.id',
        'c.content',
        'c.createdAt',
        'cu.id',
        'cu.firstName',
        'cu.lastName'
      ])
      .leftJoin('e.tickets', 't')
      .leftJoin('t.user', 'u')
      .leftJoin('t.comments', 'c')
      .leftJoin('c.user', 'cu')
      .take(4)
      .skip(0)
      .orderBy('e.id')
      .getMany()

    return events
  }

  @Get('/test')
  async test() {
    const events = await Event.createQueryBuilder('e')
      .select([
        'e.id',
        'e.name',
        'e.image',
        'e.startDate',
        'e.endDate',
        'e.description',
        't.id',
        't.price',
        't.description',
        't.image',
        't.event_id',
        'u.id',
        'u.firstName',
        'u.lastName',
        'u.email',
        // 'u.admin',
        'c.id',
        'c.content',
        'c.createdAt',
        'cu.id',
        'cu.firstName',
        'cu.lastName'
      ])
      .leftJoin('e.tickets', 't')
      .leftJoin('t.user', 'u')
      .leftJoin('t.comments', 'c')
      .leftJoin('c.user', 'cu')
      .take(4)
      .skip(0)
      .orderBy('e.id')
      .getMany()

    // const events = await Event.find({
    //   relations: ['tickets', 'tickets.comments', 'tickets.comments.user']
    // })

    console.log(events[0].tickets[0].comments)

    return events
  }
}
