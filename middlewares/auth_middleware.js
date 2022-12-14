module.exports = {
    authenticatedOnly: (req, res, next) => {
      if (!req.session.user) {
          res.redirect('/login')
          return
      }
      next()
  },
    setUserVaribleMiddleware: (req, res, next) => {
      res.locals.authUser = null
      if (req.session.user) {
          res.locals.authUser = req.session.user
      }
      next()
  }

}