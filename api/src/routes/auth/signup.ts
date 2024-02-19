import { HTTPException } from 'hono/http-exception'
import User from '../../models/User'
import { setSignedCookie } from 'hono/cookie'

export default async function (c: any) {
  let data;

  try {
    data = await c.req.json() || {}
  } catch (_) {
    throw new HTTPException(400, { message: "Bad Request" })
  }

  const snapshotUser = await User.findOne({ email: data.email })
  if (snapshotUser) {
    throw new HTTPException(409, { message: "User already exist" })
  }

  let newSnapshotUser = { id: '' }
  try {
    await User.validate(data)
    newSnapshotUser = await (new User(data)).save()
  } catch (err) {
    console.log(err)
    throw new HTTPException(500, { message: "Internal Server Error" })
  }

  await setSignedCookie(c, 'uid', newSnapshotUser.id, process.env.XPLORECAMP_API_SECRET || '')
  return c.text(newSnapshotUser.id)
}
