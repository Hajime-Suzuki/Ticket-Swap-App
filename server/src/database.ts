import { createConnection, getConnectionOptions } from 'typeorm'
import { DefaultNamingStrategy } from 'typeorm/naming-strategy/DefaultNamingStrategy'
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface'
import { snakeCase } from 'typeorm/util/StringUtils'
import User from './entities/User'
import Event from './entities/Event'
import Ticket from './entities/Ticket'
import Comment from './entities/Comment'

class CustomNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName) + 's'
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[]
  ): string {
    return snakeCase(
      embeddedPrefixes.concat(customName ? customName : propertyName).join('_')
    )
  }

  columnNameCustomized(customName: string): string {
    return customName
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName)
  }
}

export const connectDatabase = async () => {
  console.log(process.env.NODE_ENV)
  const dbSettings = await getConnectionOptions()
  const settings = { ...dbSettings, namingStrategy: new CustomNamingStrategy() }

  if (process.env.NODE_ENV === 'test') {
    settings.database = 'codaisseur_final_assignment_test'
  }

  return createConnection(settings).then(async () => {
    console.log('Connected to Postgres with TypeORM')
  })
}

const defaultConfig = {
  type: 'postgres',
  url:
    process.env.DATABASE_URL ||
    'postgres://postgres:secret@localhost:5432/game',
  entities: [User, Event, Ticket, Comment],
  synchronize: true,
  logging: true
}
