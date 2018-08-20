import { JsonController, Get } from 'routing-controllers'
import * as faker from 'faker'
import Event from '../entities/Event'
import Ticket from '../entities/Ticket'
import User from '../entities/User'
import Comment from '../entities/Comment'
@JsonController('/populate')
export default class PopulateController {
  @Get('/')
  async populateDatabase() {
    const eventAmount = 30
    const ticketAmount = 100
    const userAmount = 30
    const commentAmount = 50

    const userArr = Array(userAmount)
      .fill('')
      .map(() => {
        return User.create({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          password: 'ashtasht'
        })
      })

    let users = await User.save(userArr)

    const eventsArr = Array(eventAmount)
      .fill('')
      .map(() => {
        return Event.create({
          name: faker.commerce.product(),
          description: faker.lorem.sentence(),
          image: faker.image.imageUrl(),
          startDate: faker.date.between('2018-08-20', '2018-08-31'),
          endDate: faker.date.between('2018-09-01', '2018-9-30')
        })
      })

    const events = await Event.save(eventsArr)

    const ticketsArray = Array(ticketAmount)
      .fill('')
      .map((_, i) => {
        let event
        if (i < eventAmount) {
          event = events[i]
        } else {
          const randomNum = faker.random.number({
            min: 0,
            max: eventAmount - 1
          })
          event = events[randomNum]
        }
        return Ticket.create({
          price: Number(faker.commerce.price(30, 300)),
          description: faker.lorem.sentence(),
          image: faker.image.imageUrl(),
          event
        })
      })

    const tickets = await Ticket.save(ticketsArray)

    tickets.forEach((ticket, i) => {
      if (i < userAmount) {
        users[i].tickets = [ticket]
      } else {
        const randomNum = faker.random.number({ min: 0, max: userAmount - 1 })
        users[randomNum].tickets.push(ticket)
      }
    })

    users = await User.save(users)

    const commentsArr = Array(commentAmount)
      .fill('')
      .map(comment => {
        const randomIndexForTickets = faker.random.number({
          min: 0,
          max: ticketAmount - 1
        })
        const randomIndexForUsers = faker.random.number({
          min: 1,
          max: userAmount
        })

        return Comment.create({
          content: faker.lorem.sentence(),
          ticket: tickets[randomIndexForTickets],
          // user: users[randomIndexForUsers],
          user: { id: randomIndexForUsers },
          createdAt: faker.date.between('2018-08-01', new Date())
        })
      })

    const comments = await Comment.save(commentsArr)
    // const comment = await Comment.create({
    //   content: 'aisehtnioansihoteniaoeshitneoa',
    //   ticket: tickets[1],
    //   user: { id: 1 },
    //   createdAt: faker.date.between('2018-08-01', new Date())
    // }).save()
    // return Event.findOne(
    //   { id: events[0].id },
    //   { relations: ['tickets', 'tickets.user'] }
    // )
    // return User.findOne(
    //   { id: 1 },
    //   { relations: ['comments'], select: ['firstName', 'email', 'id'] }
    // )
    // return Comment.findOne({ id: 1 })

    return 'done'
  }
}
