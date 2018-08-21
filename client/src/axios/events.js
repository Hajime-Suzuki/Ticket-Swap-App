import axios from 'axios'
export const eventsAxios = axios.create({
  baseURL: 'http://localhost:4000/events'
})
