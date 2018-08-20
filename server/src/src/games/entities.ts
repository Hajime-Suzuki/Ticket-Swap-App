import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  OneToMany,
  ManyToOne,
  BeforeInsert,
  ManyToMany
} from 'typeorm'
import User from '../users/entity'
import { getRandomBoard, getEmptyBoard } from '../libs/gameFunctions'
import { boardSetting } from './gameSettings'

export type Symbol = 'x' | 'o' | 'z' | 'm' | null
export type Row = [Symbol, Symbol, Symbol]
export type Board = [Row, Row, Row]

type Status = 'pending' | 'started' | 'finished'

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', { default: getEmptyBoard() })
  board

  @Column('json')
  generatedBoard

  @Column('int', { nullable: true })
  turn: number

  @Column('text', { nullable: true })
  winner: string

  @Column('text', { default: 'pending' })
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, { eager: true })
  players: Player[]

  @OneToMany(_ => Character, character => character.game, { eager: true })
  characters: Character[]

  @BeforeInsert()
  getRandomBoard() {
    this.generatedBoard = getRandomBoard()
  }
}

@Entity()
@Index(['game', 'user'], { unique: true })
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column({ default: 0 })
  point: number

  @Column()
  userId: number
}

@Entity()
export class Character extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  name: string

  @ManyToOne(_ => Game, game => game.characters)
  game: Game

  @Column({ default: 0 })
  count: number
}
