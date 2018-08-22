import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne
} from 'typeorm'
import User from './User'
import Event from './Event'
import Comment from './Comment'

@Entity()
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('numeric', { precision: 5, scale: 2 })
  price: number

  @Column('text')
  description: string

  @Column('text')
  image: string

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ManyToOne(() => User, user => user.tickets)
  user: User

  @ManyToOne(() => Event, event => event.tickets)
  event: Event | number

  @OneToMany(() => Comment, comment => comment.ticket)
  comments: Comment[]

  eventId: number
}
