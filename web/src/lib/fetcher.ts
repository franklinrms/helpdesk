import Cookie from 'js-cookie'
import { apiUrl } from './apiUrl'

const token = Cookie.get('token') || ''

export const fetcher = (url: string) =>
  fetch(apiUrl(url), {
    headers: {
      authorization: token,
    },
  }).then((res) => res.json())
