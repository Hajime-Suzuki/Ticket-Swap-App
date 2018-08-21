import { Get, JsonController, QueryParam } from 'routing-controllers'
import Event from '../entities/Event'

@JsonController('/events')
export default class EventController {
  @Get()
  getAllEvents(@QueryParam('pageNum') pageNum: number) {
    // return Event.find({
    //   select: ['id', 'name', 'image', 'description'],
    //   relations: ['tickets', 'tickets.user'],
    //   take: 4
    // })
    return (
      Event.createQueryBuilder('e')
        .select([
          'e.id',
          'e.name',
          'e.image',
          'e.startDate',
          'e.endDate',
          't.id',
          't.price',
          't.description',
          't.image',
          't.event_id',
          'u.id',
          'u.firstName',
          'u.lastName',
          'u.email',
          'u.admin',
          'c.id',
          'c.content',
          'c.createdAt',
          'c.user',
          'cu.firstName'
        ])
        .innerJoin('e.tickets', 't')
        .innerJoin('t.comments', 'c')
        .innerJoin('t.user', 'u')
        .innerJoinAndSelect('c.user', 'cu')
        // .innerJoin('c.user', 'cu')
        .take(4)
        .skip(pageNum)
        .orderBy('e.id')
        .printSql()
        .getMany()
    )
  }
}
