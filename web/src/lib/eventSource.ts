import Cookie from 'js-cookie'
import EventSource from 'eventsource'
import { apiUrl } from './apiUrl'

const token = Cookie.get('token') || ''

export const eventSource = (path: string) =>
  new EventSource(apiUrl(path), {
    headers: {
      authorization: token,
    },
  })
