import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Patch,
  Post,
  QueryParam,
  UnauthorizedError
} from 'routing-controllers'
import Event from '../entities/Event'
import User from '../entities/User'

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
      .getMany()

    return {
      events
    }
  }

  @Authorized()
  @Post('/')
  @HttpCode(201)
  async createEvent(@CurrentUser() user: User, @Body() eventData: Event) {
    if (!user) throw new UnauthorizedError()
    if (!user.admin) throw new UnauthorizedError()
    const event = await Event.create(eventData).save()
    return event
  }

  @Authorized()
  @Patch('/:eventId')
  async updateEvent(
    @Param('eventId') eventId: number,
    @CurrentUser() user: User,
    @Body() eventData: Event
  ) {
    if (!user) throw new UnauthorizedError()
    if (!user.admin) throw new UnauthorizedError()
    const event = await Event.findOne({ id: eventId })
    if (!event) throw new NotFoundError()
    await Event.update(eventId, eventData)
    return true
  }

  @Authorized()
  @Delete('/:eventId')
  async deleteEvent(
    @CurrentUser() user: User,
    @Param('eventId') eventId: number
  ) {
    if (!user) throw new UnauthorizedError()
    if (!user.admin) throw new UnauthorizedError()

    const event = await Event.findOne({ id: eventId })

    if (!event) throw new NotFoundError()

    await event.remove()

    return true
  }
}
