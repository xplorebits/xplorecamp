import { Hono } from 'hono'
import authRoutes from './routes/auth'
import 'dotenv/config'
import db from './database'

db()
const app = new Hono()
app.route('/auth', authRoutes)

export default {
  port: 4000,
  fetch: app.fetch
}
