import { IsString } from 'class-validator'
import {
  BadRequestError,
  Body,
  JsonController,
  Post
} from 'routing-controllers'
import User from '../entities/User'

class AuthenticatePayload {
  @IsString()
  email: string

  @IsString()
  password: string
}

@JsonController('/users')
export default class UserController {
  @Post('/')
  async signup(@Body() data: User) {
    const user = await User.create(data).save()
    return { jwt: user.generateToken() }
  }

  @Post('/logins')
  async authenticate(@Body() { email, password }: AuthenticatePayload) {
    const user = await User.findOne({ where: { email } })

    if (!user || !user.id)
      throw new BadRequestError('Username and password do not match')

    if (!(await user.checkPassword(password)))
      throw new BadRequestError('Username and password do not match')

    return { jwt: user.generateToken() }
  }
}
