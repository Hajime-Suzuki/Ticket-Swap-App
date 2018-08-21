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
import { getRepository } from 'typeorm'

@JsonController('/users')
export default class UserController {
  @Post('/')
  async signup(@Body() data: User) {
    const user = await User.create(data).save()
    return user
  }

  @Get('/count-tickets/:id')
  async test(@Param('id') ticketId: number) {
    // const data = await User.findOne(
    //   { id },
    //   { select: ['id'], relations: ['tickets'], where:{
    //     {tickets.id: id}
    //   } }
    // )
    const { id } = await User.createQueryBuilder('u')
      .select(['u.id'])
      .innerJoin('u.tickets', 't')
      .where('t.id =:id', { id: ticketId })
      .getOne()

    const { tickets } = await User.createQueryBuilder('u')
      .select(['u.id', 't.id'])
      .innerJoin('u.tickets', 't')
      .where('u.id =:id', { id })
      .getOne()

    // console.log()

    // const data = await User.createQueryBuilder('u')
    //   .leftJoinAndSelect('u.tickets', 't')
    //   .where(qb => {
    //     const subQuery = qb.subQuery()
    //       .select(['u.id'])
    //       .from(Tickets, "t")
    //       .where("user.registered = :registered")
    //       .getQuery();
    //     return 'u.id = ' subQuery;
    //   })
    //   .getOne()

    // const data = await Ticket.createQueryBuilder('t')
    //   .leftJoinAndSelect('t.user', 'u')
    //   .where('t.id = :id', { id: 1 })
    //   .getOne()

    return tickets.length
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
