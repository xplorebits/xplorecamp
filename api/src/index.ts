import { Hono } from 'hono'
import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie'

const app = new Hono()

app.get('/', (c) => {
  setCookie(c, 'user', '239482934jdksfjsdf')
  return c.text('Hello Hono!')
})

app.get('/try', (c) => {
  const user = getCookie(c, 'user')
  console.log(user)
  return c.text('Hello Hono!')
})

export default {
  port: 4000,
  fetch: app.fetch
}
