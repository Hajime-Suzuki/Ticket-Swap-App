import axios from 'axios'
export const eventsAxios = axios.create({
  baseURL: 'http://localhost:4000/events'
})

export const ticketsAxios = axios.create({
  baseURL: 'http://localhost:4000/tickets'
})

export const userAxios = axios.create({
  baseURL: 'http://localhost:4000/users'
})

export const authAxios = axios.create({
  baseURL: 'http://localhost:4000/auth'
})

export const commentAxios = axios.create({
  baseURL: 'http://localhost:4000/comments'
})
