import { IsString } from 'class-validator'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import Ticket from './Ticket'
import User from './User'

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  content: string

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ManyToOne(() => Ticket, ticket => ticket.comments, { onDelete: 'CASCADE' })
  ticket: Ticket

  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
  user: User
}
