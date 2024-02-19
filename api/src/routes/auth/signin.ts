import { HTTPException } from 'hono/http-exception'
import User from '../../models/User'

export default async function (c: any) {
  let email, password;

  try {
    console.log(User)
    const credentials = await c.req.json() || {}
    email = credentials.email
    password = credentials.password
  } catch (_) {
    throw new HTTPException(400, { message: "Bad Request" })
  }

  const snapshotUser = await User.findOne({ email }).select('+password')

  if (!snapshotUser) {
    throw new HTTPException(400, { message: 'User not found' })
  }

  return snapshotUser
}
