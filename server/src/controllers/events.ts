import { Get, JsonController, QueryParam } from 'routing-controllers'
import Event from '../entities/Event'
import User from '../entities/User'

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
        // 'u.id',
        // 'u.firstName',
        // 'u.lastName',
        // 'u.email',
        // 'u.admin',
        // 'c.id',
        // 'c.content',
        // 'c.createdAt',
        'cu.id',
        'cu.firstName',
        'cu.lastName'
      ])
      .leftJoinAndSelect('e.tickets', 't')
      .leftJoinAndSelect('t.user', 'u')
      .leftJoinAndSelect('t.comments', 'c')
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
      .leftJoinAndSelect('e.tickets', 't')
      .leftJoinAndSelect('t.user', 'u')
      // .addSelect('COUNT(u.tickets)', 'sum')
      .take(4)
      .skip(0)
      .orderBy('e.id')
      .getMany()

    // const events = await User.createQueryBuilder('user')
    //   // .select(['u.id', 'u.firstName'])
    //   // .addSelect('COUNT(u.tickets)', 'sum')
    //   .select('COUNT(user.tickets)', 'sum')
    //   .getRawOne()

    // console.log(events[0])

    return events
  }
}
