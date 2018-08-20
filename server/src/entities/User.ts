import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinTable,
  BeforeInsert
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { MinLength, IsString, IsEmail } from 'class-validator'
import * as bcrypt from 'bcrypt'
import Ticket from './Ticket'
import Comment from './Comment'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text')
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text')
  lastName: string

  @IsEmail()
  @Column('text')
  email: string

  @IsString()
  @MinLength(6)
  @Column('text')
  // @Exclude({ toPlainOnly: true })
  password: string

  @OneToMany(() => Ticket, ticket => ticket.user)
  tickets: Ticket[]

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[]

  @Column('boolean', { default: false })
  admin: boolean

  @BeforeInsert()
  async setPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}