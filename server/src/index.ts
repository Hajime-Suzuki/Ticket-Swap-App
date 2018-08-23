import * as dotenv from 'dotenv'
import 'reflect-metadata'
import { Action, BadRequestError, createKoaServer } from 'routing-controllers'
import AuthController from './controllers/auth'
import EventController from './controllers/events'
import LoginController from './controllers/logins'
import PopulateController from './controllers/populate'
import TicketController from './controllers/tickets'
import UserController from './controllers/users'
import { connectDatabase } from './database'
import User from './entities/User'
import { verify } from './jwt/jwt'
import CommentController from './controllers/comments'
dotenv.config()

export const app = createKoaServer({
  cors: true,
  controllers: [
    UserController,
    LoginController,
    EventController,
    TicketController,
    AuthController,
    CommentController,
    PopulateController
  ],
  authorizationChecker: (action: Action) => {
    const token: string = action.request.headers.authorization
    try {
      return !!(token && verify(token))
    } catch (e) {
      throw new BadRequestError(e)
    }
  },
  currentUserChecker: async (action: Action) => {
    const token: string = action.request.headers.authorization

    if (token) {
      const { id } = verify(token)
      return User.findOne({ id })
    }

    return undefined
  }
})

connectDatabase()
  .then(_ => {
    app.listen(4000, () => {
      console.log('4000!!!')
    })
  })
  .catch(err => console.error(err))
