import {
  Authorized,
  CurrentUser,
  Get,
  JsonController
} from 'routing-controllers'
import User from '../entities/User'

@JsonController('/auth')
export default class AuthController {
  @Authorized()
  @Get('/')
  checkAuth(@CurrentUser() user: User) {
    if (!user) return false
    return true
  }
}
