import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { IsEmail, IsString, MinLength } from 'class-validator'
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { sign } from '../jwt/jwt'
import Comment from './Comment'
import Ticket from './Ticket'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('varchar', { length: 255 })
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('varchar', { length: 255 })
  lastName: string

  @IsEmail()
  @Column('text')
  email: string

  @IsString()
  @MinLength(6)
  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string

  @OneToMany(() => Ticket, ticket => ticket.user, { cascade: true })
  tickets: Ticket[]

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[]

  @Column('boolean', { default: false })
  admin: boolean

  @BeforeInsert()
  async setPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  @AfterLoad()
  assignCount() {
    if (!this.tickets || !this.tickets.length) return null
    this.tickets = this.tickets ? this.tickets.length : null
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

  generateToken(): string {
    return sign({ id: this.id, admin: this.admin })
  }
}
