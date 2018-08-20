import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm'
import Ticket from './Ticket'

@Entity()
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { length: 255 })
  name: string

  @Column('varchar')
  description: string

  @Column('text')
  image: string

  @Column('timestamp')
  startDate: Date

  @Column('timestamp')
  endDate: Date

  @OneToMany(() => Ticket, ticket => ticket.event)
  tickets: Ticket[]
}
