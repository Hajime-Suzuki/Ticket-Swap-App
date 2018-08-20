import User from '../src/entities/User'

import * as supertest from 'supertest'
// import { app } from '../src'

const request = supertest.agent('http://localhost:4000/users')

describe('####User#####', () => {
  test('create user with valid name and password', async () => {
    const user = {
      firstName: 'Hajime',
      lastName: 'Suzuki',
      email: 'email@email.com',
      password: 'ashtasht'
    }

    // const request = supertest(app)

    const { body } = await request
      .post('/')
      .send(user)
      .expect(200)

    expect(body.firstName).toBe('Hajime')
    expect(body.lastName).toBe('Suzuki')
    expect(body.password).not.toBe('ashtasht')
  })

  test('decline too short fist name', async () => {
    const user = {
      firstName: 'a',
      lastName: 'Suzuki',
      email: 'email@email.com',
      password: 'ashtasht'
    }

    const { body } = await request
      .post('/')
      .send(user)
      .expect(400)

    expect(body.errors[0].constraints).toEqual({
      minLength: 'firstName must be longer than or equal to 2 characters'
    })
  })

  test('decline too short last name', async () => {
    const user = {
      firstName: 'Hajime',
      lastName: 'a',
      email: 'email@email.com',
      password: 'ashtasht'
    }

    const { body } = await request
      .post('/')
      .send(user)
      .expect(400)

    expect(body.errors[0].constraints).toEqual({
      minLength: 'lastName must be longer than or equal to 2 characters'
    })
  })
  test('decline wrong email', async () => {
    const user = {
      firstName: 'Hajime',
      lastName: 'Suzuki',
      email: 'email.com',
      password: 'ashtasht'
    }

    const { body } = await request
      .post('/')
      .send(user)
      .expect(400)

    expect(body.errors[0].constraints).toEqual({
      isEmail: 'email must be an email'
    })
  })

  test('decline too short password', async () => {
    const user = {
      firstName: 'Hajime',
      lastName: 'Suzuki',
      email: 'email@email.com',
      password: 'a'
    }

    const { body } = await request
      .post('/')
      .send(user)
      .expect(400)

    expect(body.errors[0].constraints).toEqual({
      minLength: 'password must be longer than or equal to 6 characters'
    })
  })
})
