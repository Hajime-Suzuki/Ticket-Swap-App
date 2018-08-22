import {
  Get,
  JsonController,
  QueryParam,
  Authorized,
  BodyParam,
  CurrentUser
} from 'routing-controllers'
import User from '../entities/User'

@JsonController('/auth')
export default class AuthController {
  @Authorized()
  @Get('/')
  checkAuth(@CurrentUser() user: User) {
    console.log(user)

    return true
  }
}
