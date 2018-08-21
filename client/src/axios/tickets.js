import axios from 'axios'
export const ticketsAxios = axios.create({
  baseURL: 'http://localhost:4000/tickets'
})
