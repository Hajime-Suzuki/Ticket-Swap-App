import * as faker from 'faker'
import { Get, JsonController } from 'routing-controllers'
import Comment from '../entities/Comment'
import Event from '../entities/Event'
import Ticket from '../entities/Ticket'
import User from '../entities/User'

@JsonController('/populate')
export default class PopulateController {
  @Get('/')
  async populateDatabase() {
    const eventAmount = 30
    const ticketAmount = 100
    const userAmount = 30
    const commentAmount = 100

    faker.seed(1)

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
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          image: 'https://source.unsplash.com/random',
          startDate: faker.date.between('2018-08-20', '2018-08-10'),
          endDate: faker.date.between('2018-08-10', '2018-9-20')
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
          image: 'https://source.unsplash.com/random',
          createdAt: faker.date.between('2018-08-01', new Date()),
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
          max: userAmount - 1
        })

        return Comment.create({
          content: faker.lorem.sentence(),
          ticket: tickets[randomIndexForTickets],
          user: users[randomIndexForUsers],
          createdAt: faker.date.between('2018-08-01', new Date())
        })
      })

    await Comment.save(commentsArr)

    await Promise.all([
      User.create({
        firstName: 'Hajime',
        lastName: 'Suzuki',
        email: 'asht@asht.asht',
        password: 'ashtasht',
        admin: true
      }).save(),
      User.create({
        firstName: 'Guest',
        lastName: 'User',
        email: 'aaa@aaa.aaa',
        password: 'ashtasht'
      }).save()
    ])

    return 'done'
  }
}
