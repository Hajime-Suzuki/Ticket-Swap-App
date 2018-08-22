import {
  Get,
  JsonController,
  QueryParam,
  Authorized
} from 'routing-controllers'

@JsonController('/auth')
export default class AuthController {
  @Authorized()
  @Get('/')
  checkAuth() {
    return true
  }
}
