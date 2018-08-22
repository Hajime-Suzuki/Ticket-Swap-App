import { Get, JsonController, QueryParam } from 'routing-controllers'
import Event from '../entities/Event'
import User from '../entities/User'
import Ticket from '../entities/Ticket'

@JsonController('/events')
export default class EventController {
  @Get('/')
  async getAllEvents(@QueryParam('pageNum') pageNum: number) {
    // const events = await Event.createQueryBuilder('e')
    //   .select([
    //     'e.id',
    //     'e.name',
    //     'e.image',
    //     'e.startDate',
    //     'e.endDate',
    //     'e.description',
    //     // 'u.id',
    //     // 'u.firstName',
    //     // 'u.lastName',
    //     // 'u.email',
    //     // 'u.admin',
    //     // 'c.id',
    //     // 'c.content',
    //     // 'c.createdAt',
    //     'cu.id',
    //     'cu.firstName',
    //     'cu.lastName'
    //   ])
    //   .leftJoinAndSelect('e.tickets', 't')
    //   .leftJoinAndSelect('t.user', 'u')
    //   .leftJoinAndSelect('t.comments', 'c')
    //   .leftJoin('c.user', 'cu')
    //   .take(4)
    //   .skip(0)
    //   .orderBy('e.id')
    //   .getMany()

    const events = await Event.createQueryBuilder('e')
      .leftJoinAndSelect('e.tickets', 't')
      .leftJoinAndSelect('t.user', 'u')
      .leftJoin('t.comments', 'c')
      .leftJoin('c.user', 'cu')
      .leftJoin('u.tickets', 'ut')
      .select([
        'e',
        't',
        'u',
        'c',
        'ut.id',
        'cu.id',
        'cu.firstName',
        'cu.lastName'
      ])
      .take(4)
      .skip(4 * pageNum - 4)
      .orderBy('e.id')
      .getMany()
    console.log(pageNum, events[0].id)
    const count = await Event.count()
    return { events, count: Math.ceil(count / 4) }
  }

  @Get('/test')
  async test() {
    const events = await Event.createQueryBuilder('e')

      // .leftJoinAndSelect('e.tickets', 't')
      // .leftJoinAndSelect('t.user', 'u')
      // .leftJoin('t.comments', 'c')
      // .leftJoin('c.user', 'cu')
      // .leftJoin('u.tickets', 'ut')
      // .select([
      //   'e',
      //   't',
      //   'u',
      //   'c',
      //   'ut.id',
      //   'cu.id',
      //   'cu.firstName',
      //   'cu.lastName'
      // ])
      .take(4)
      .skip(0)
      .orderBy('e.id')
      .getMany()

    // const tickets = await Ticket.createQueryBuilder('t')
    //   .select(['t', 'e.id', 'u.id', 'u.firstName', 'u.lastName', 'ut.id'])
    //   .leftJoin('t.event', 'e')
    //   .leftJoin('t.user', 'u')
    //   .leftJoin('u.tickets', 'ut')
    //   .where('e.id IN (' + events.map(e => e.id) + ')')
    //   .getMany()

    // const userIds = events
    //   .map(d => {
    //     const tickets = d.tickets
    //     return tickets.map(t => t.user.id)
    //   })
    //   .reduce((arr, ids) => arr.concat(ids))
    //   .filter((id, i, arr) => arr.indexOf(id) === i)

    // const cuont = await User.createQueryBuilder('u')
    //   .select(['u.id', 't.id'])
    //   .leftJoin('u.tickets', 't')
    //   .addSelect('COUNT(t.id)', 'ccc')
    //   .groupBy('t.id')
    //   .addGroupBy('u.id')
    //   .getMany()

    // const events = await User.createQueryBuilder('user')
    //   // .select(['u.id', 'u.firstName'])
    //   // .addSelect('COUNT(u.tickets)', 'sum')
    //   .select('COUNT(user.tickets)', 'sum')
    //   .getRawOne()

    // console.log(events[0])

    const count = await Event.count()

    return count
  }
}
