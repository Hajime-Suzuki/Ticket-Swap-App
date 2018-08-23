import {
  Authorized,
  BodyParam,
  CurrentUser,
  Delete,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Patch,
  Post,
  UnauthorizedError,
  Body
} from 'routing-controllers'
import Event from '../entities/Event'
import Ticket from '../entities/Ticket'
import User from '../entities/User'
import Comment from '../entities/Comment'

interface CommentData {
  content: string
}

@JsonController('/comments')
export default class CommentController {
  @Authorized()
  @Patch('/:commentId')
  async updateTicket(
    @Param('commentId') commentId: number,
    @BodyParam('content') content: string,
    @CurrentUser() user: User
  ) {
    if (!user) throw new UnauthorizedError()
    const comment = await Comment.findOne(
      { id: commentId },
      { relations: ['user', 'ticket'] }
    )

    if (!comment) throw new NotFoundError()
    if (comment.user.id !== user.id && !user.admin)
      throw new UnauthorizedError()
    await Comment.update(commentId, { content })
    return true
  }

  @Authorized()
  @Delete('/:commentId')
  async deleteTicket(
    @Param('commentId') commentId: number,
    @CurrentUser() user: User
  ) {
    if (!user) throw new UnauthorizedError()

    const ticket = await Comment.findOne(
      { id: commentId },
      { relations: ['user'] }
    )
    if (!ticket) throw new NotFoundError()
    if (ticket.user.id !== user.id && !user.admin) throw new UnauthorizedError()
    await ticket.remove()
    return true
  }
}
