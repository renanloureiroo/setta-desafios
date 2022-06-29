import jtw from "jsonwebtoken"

function ensureAuthenticate(req, res, next) {
  const { authorization } = req.headers

  const [, accessToken] = authorization.split(" ")

  //TODO
}

export { ensureAuthenticate }
