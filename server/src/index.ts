import * as dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata'
import {
  Action,
  BadRequestError,
  useKoaServer,
  createKoaServer
} from 'routing-controllers'
import { connectDatabase } from './database'
import { verify } from './src/jwt'
import UserController from './controllers/users'
import User from './entities/User'
import LoginController from './controllers/logins'

export const app = createKoaServer({
  controllers: [UserController, LoginController],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [, token] = header.split(' ')

      try {
        return !!(token && verify(token))
      } catch (e) {
        throw new BadRequestError(e)
      }
    }

    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [, token] = header.split(' ')

      if (token) {
        const { id } = verify(token)
        return User.findOne({ id })
      }
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
