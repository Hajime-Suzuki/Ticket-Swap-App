import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm'
import Ticket from './Ticket'
import User from './User'

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  content: string

  @ManyToOne(() => Ticket, ticket => ticket.comments)
  ticket: Ticket

  @ManyToOne(() => User, user => user.comments)
  user: User[]
}
