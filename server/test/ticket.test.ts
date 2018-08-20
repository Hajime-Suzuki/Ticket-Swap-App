import * as supertest from 'supertest'

const request = supertest.agent('http://localhost:4000/tickets')

test('####Login#####', () => {
  expect(1).toBe(1)
})
