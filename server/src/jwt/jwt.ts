import * as jwt from 'jsonwebtoken'

export const secret = process.env.JWT_SECRET || 'secret'
const ttl = 3600 * 24

interface JwtPayload {
  id: number
  admin: boolean
}

export const sign = (data: JwtPayload) =>
  jwt.sign(data, secret, { expiresIn: ttl })

export const verify = (token: string): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload
