import { IsString } from 'class-validator'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import Comment from './Comment'
import Event from './Event'
import User from './User'

@Entity()
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @IsString()
  @Column('numeric', { precision: 5, scale: 2 })
  price: number

  @IsString()
  @Column('text')
  description: string

  @IsString()
  @Column('text', { nullable: true })
  image: string

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ManyToOne(() => User, user => user.tickets, { onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => Event, event => event.tickets, { onDelete: 'CASCADE' })
  event: Event

  @OneToMany(() => Comment, comment => comment.ticket)
  comments: Comment[]
}
