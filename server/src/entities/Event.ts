import { IsString } from 'class-validator'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import Ticket from './Ticket'

@Entity()
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('varchar', { length: 255 })
  name: string

  @IsString()
  @Column('varchar')
  description: string

  @IsString()
  @Column('text')
  image: string

  @Column('timestamp')
  startDate: Date

  @Column('timestamp')
  endDate: Date

  @OneToMany(() => Ticket, ticket => ticket.event)
  tickets: Ticket[]
}
