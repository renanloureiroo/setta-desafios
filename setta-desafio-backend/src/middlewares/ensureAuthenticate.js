import jtw from "jsonwebtoken"
import { AccountRepository } from "../modules/accounts/repositories/AccountRepository.js"

async function ensureAuthenticate(req, res, next) {
  const token = req.headers.authorization

  const [, accessToken] = token.split(" ")

  if (!accessToken) {
    return res.status(401).json({ error: "Token missing!" })
  }
  try {
    const { sub: userId } = jtw.verify(accessToken, process.env.JWT_SECRET_KEY)

    const repository = new AccountRepository()

    const userExists = await repository.findById(userId)

    if (!userExists) {
      return res.status(401).json({ error: "User not found!" })
    }
    req.user = {
      id: userId,
    }
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: "Invalid token!" })
  }
}

export { ensureAuthenticate }
