import { Hono } from 'hono'
import signin from './auth/signin'
import signup from './auth/signup'

const route = new Hono()

route.post('/signin', signin)
route.post('/signup', signup)

export default route
