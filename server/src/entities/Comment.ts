import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  RelationId
} from 'typeorm'
import Ticket from './Ticket'
import User from './User'

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  content: string

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ManyToOne(() => Ticket, ticket => ticket.comments)
  ticket: Ticket

  @ManyToOne(() => User, user => user.comments)
  user: User

  // @RelationId((comment: Comment) => comment.user)
  // userId: number
}
