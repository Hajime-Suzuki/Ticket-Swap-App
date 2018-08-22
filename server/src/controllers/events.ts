import { Get, JsonController, QueryParam, BodyParam } from 'routing-controllers'
import Event from '../entities/Event'
import User from '../entities/User'
import Ticket from '../entities/Ticket'

@JsonController('/events')
export default class EventController {
  @Get('/')
  async getAllEvents(@QueryParam('pageNum') pageNum: number) {
    let events = await Event.createQueryBuilder('e')
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
      .where('e.endDate > :date', { date: new Date() })
      .orderBy({
        'e.endDate': 'ASC'
      })
      // multiple orderby doesn't work
      .take(4)
      .skip(4 * pageNum - 4)
      .printSql()
      .getMany()

    // console.log(events.length)

    const { count } = await Event.createQueryBuilder('e')
      .select('COUNT (e.id)', 'count')
      .where('e.endDate > :date', { date: new Date() })
      .getRawOne()

    return { events, count: Math.ceil(count / 4) }
  }

  @Get('/filter')
  async filterEvents(
    @QueryParam('name') name: string,
    @QueryParam('pageNum') pageNum: number,
    @QueryParam('date') date: Date
  ) {
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
      .where('e.name Ilike :name', { name: `%${name}%` })
      .andWhere('e.endDate > :date', { date: date || new Date() })
      // .take(4)
      // .skip(4 * pageNum - 4)
      .getMany()

    console.log(events)

    // const { count } = await Event.createQueryBuilder('e')
    //   .select('COUNT (e.id)', 'count')
    //   .where('e.name Ilike :name', { name: `%${name}%` })
    //   .andWhere('e.endDate > :date', { date: new Date() })
    //   .getRawOne()

    // console.log('total', count)

    return {
      events
      // count: Math.ceil(count / 4)
    }
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
    // .take(4)
    // .skip(0)
    // .orderBy('e.id')
    // .getMany()

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
