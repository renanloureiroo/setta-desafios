import jtw from "jsonwebtoken"
import { UsersRepository } from "../modules/accounts/repositories/UsersRepository.js"

async function ensureAuthenticate(req, res, next) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "Token missing!" })
  }
  const [, accessToken] = authorization.split(" ")
  try {
    const { sub: userId } = jtw.verify(accessToken, process.env.JWT_SECRET_KEY)

    const repository = new UsersRepository()

    const userExists = await repository.findById(userId)

    if (!userExists) {
      return res.status(401).json({ error: "User not found!" })
    }
    req.user = {
      id: userId,
    }
    next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid token!" })
  }
}

export { ensureAuthenticate }
