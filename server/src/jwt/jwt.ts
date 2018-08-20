import * as jwt from 'jsonwebtoken'

export const secret = process.env.JWT_SECRET || 'secret'
const ttl = 3600 * 24 * 7 // our JWT tokens are valid for 4 hours

interface JwtPayload {
  id: number
}

export const sign = (data: JwtPayload) =>
  jwt.sign(data, secret, { expiresIn: ttl })

export const verify = (token: string): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload
