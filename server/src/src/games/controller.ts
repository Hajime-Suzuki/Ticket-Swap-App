import {
  JsonController,
  Authorized,
  CurrentUser,
  Post,
  Param,
  BadRequestError,
  HttpCode,
  NotFoundError,
  ForbiddenError,
  Get,
  Body,
  Patch
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, Board, Character } from './entities'
import { IsBoard, isValidTransition, calculateWinner, finished } from './logic'
import { Validate } from 'class-validator'
import { io } from '../index'
import {
  calculatePoints,
  addPointInfoToCharacters
} from '../libs/gameFunctions'
import { boardSetting } from './gameSettings'
import { calculatePoints } from '../../target/libs/gameFunctions'

class updatedGameData {
  // @Validate(IsBoard, {
  //   message: 'Not a valid board'
  // })
  position: {
    columnIndex: number
    rowIndex: number
  }
  isSharkBeaten: boolean
}

@JsonController()
export default class GameController {
  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(@CurrentUser() user: Partial<User>) {
    console.log('post gaems')

    const gameEntity = await Game.create().save()

    // add characters
    const characters = Object.values(boardSetting.characters)
      .filter(character => character.amount)
      .map(character => {
        return Character.create({
          game: gameEntity,
          name: character.symbol,
          count: character.amount
        })
      })

    // save characters and palyer
    const [player] = await Promise.all([
      Player.create({
        user,
        game: gameEntity
      }).save(),
      Character.save(characters)
    ])

    gameEntity.turn = player.id!

    await gameEntity.save()
    const game = await Game.findOneById(gameEntity.id)

    const { generatedBoard, ...data } = game

    console.log(game!.characters)
    io.emit('action', {
      type: 'ADD_GAME',
      payload: data
    })

    return data
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: Partial<User>,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError('Game does not exist')
    if (game.status !== 'pending')
      throw new BadRequestError('Game is already started')

    game.status = 'started'
    await game.save()
    console.log(game)

    const player = await Player.create({
      game,
      user
    }).save()

    const updatedGame = await Game.findOneById(game.id)

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: updatedGame
    })

    return { game: updatedGame }
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() { position, isSharkBeaten }: updatedGameData
  ) {
    console.log('=================', Date.now())

    try {
      const game = await Game.findOneById(gameId)

      if (!game) throw new NotFoundError('Game does not exist')

      const player = await Player.findOne({ user, game })

      if (!player) throw new ForbiddenError('You are not part of this game')
      if (game.status !== 'started')
        throw new BadRequestError('The game is not started yet')

      if (player.id !== game.turn)
        throw new BadRequestError("It's not your turn")

      if (game.board[position.rowIndex][position.columnIndex] !== null) {
        throw new BadRequestError('Invalid move')
      }

      // fetch item from the generated board
      const character =
        game.generatedBoard[position.rowIndex][position.columnIndex]

      // if shark, don't update the database and send the user the previous position and character
      if (character === 'shark' && isSharkBeaten === undefined) {
        game.board[position.rowIndex][position.columnIndex] = character
        game.previousPosition = {
          rowIndex: position.rowIndex,
          columnIndex: position.columnIndex
        }
        game.character = character

        io.emit('action', {
          type: 'UPDATE_GAME',
          payload: game
        })

        return game
      }

      // update board with the character
      game.board[position.rowIndex][position.columnIndex] = character
      //update remainig count
      if (character !== 'seaweed') {
        const fishCharacter = await Character.findOne({ name: character, game })
        if (!fishCharacter) throw new Error('invalid character')
        if (fishCharacter.count !== 0) {
          fishCharacter.count -= 1
          await fishCharacter.save()
        }
      }
      // add/subtract points accordingly

      player.point += calculatePoints(character, isSharkBeaten)

      // set the player to the game before updating the points
      const playerIndex = game.players.findIndex(p => p.id === player.id)
      game.players[playerIndex] = player

      // change turn
      const otherPlayerId = game.players.filter(p => p.id !== game.turn)[0].id
      game.turn = otherPlayerId!

      //update
      await Promise.all([player.save(), game.save()])

      let updatedGame = await Game.findOneById(game.id)
      if (!updatedGame) throw new NotFoundError('no game found')

      // calculate winner
      const totalAmount = updatedGame.characters.reduce(
        (total, character) => (total += character.count),
        0
      )

      const sortedPlayers = updatedGame.players.sort(
        (a, b) => b.point - a.point
      )

      if (totalAmount === 0) {
        if (sortedPlayers[0].point === sortedPlayers[1].point) {
          updatedGame.winner = 'draw'
        } else {
          updatedGame.winner = String(sortedPlayers[0].id)
        }
        updatedGame.board = updatedGame.generatedBoard
        updatedGame = await updatedGame.save()
      }

      // add point reference to the characters

      updatedGame.characters = addPointInfoToCharacters(updatedGame.characters)

      updatedGame.character = isSharkBeaten === undefined ? character : null
      updatedGame.pointAdded = calculatePoints(character, isSharkBeaten)

      io.emit('action', {
        type: 'UPDATE_GAME',
        payload: updatedGame
      })
      console.log('update')

      return updatedGame
    } catch (e) {
      console.log(e)
    }
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  async getGame(@Param('id') id: number) {
    const game = await Game.findOneById(id)
    if (!game) throw new NotFoundError('game not found')
    const { generatedBoard, ...data } = game
    return { game: data }
  }

  @Authorized()
  @Get('/games')
  async getGames() {
    const games = await Game.find()
    return games
  }
}
