import { IsString } from 'class-validator'
import {
  JsonController,
  Post,
  Body,
  BadRequestError
} from 'routing-controllers'
import User from '../entities/User'
import { sign } from '../jwt/jwt'

class AuthenticatePayload {
  @IsString()
  email: string

  @IsString()
  password: string
}

@JsonController('/logins')
export default class LoginController {
  @Post('/')
  async authenticate(@Body() { email, password }: AuthenticatePayload) {
    const user = await User.findOne({ where: { email } })
    if (!user || !user.id)
      throw new BadRequestError('A user with this email does not exist')

    if (!(await user.checkPassword(password)))
      throw new BadRequestError('The password is not correct')

    const jwt = sign({ id: user.id })
    return { jwt }
  }
}
