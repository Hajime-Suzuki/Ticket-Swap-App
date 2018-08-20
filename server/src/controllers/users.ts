import {
  JsonController,
  Post,
  Get,
  Body,
  Authorized,
  Param
} from 'routing-controllers'
import User from '../entities/User'
import { create } from 'domain'
import Ticket from '../entities/Ticket'
import Event from '../entities/Event'

@JsonController('/users')
export default class UserController {
  @Post('/')
  async signup(@Body() data: User) {
    const user = await User.create(data).save()
    return user
  }

  @Get('/test')
  async test() {
    const event = await Event.create({
      name: 'event',
      description: 'sohie',
      image: 'asihote',
      startDate: new Date(),
      endDate: new Date()
    }).save()
    const user = await User.findOne({ id: 1 })
    const tickets = Ticket.create({
      price: 200,
      description: 'something',
      image: 'image',
      user,
      event
    }).save()

    const t = Ticket.findOne({ id: 1 }, { relations: ['user', 'event'] })
    return t
  }
  // @Authorized()
  // @Get('/users/:id([0-9]+)')
  // getUser(@Param('id') id: number) {
  //   return User.findOne({ id })
  // }

  // @Authorized()
  @Get('/')
  allUsers() {
    return User.find()
  }

  @Get('/:id([0-9]+)')
  getSingleUser(@Param('id') id: number) {
    return User.findOne(
      { id: id },
      { select: ['firstName', 'email', 'id'], relations: ['comments'] }
    )
  }
}
