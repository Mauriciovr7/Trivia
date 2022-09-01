const { Router } = require('express')

const router = Router()

// Vamos a crear un middleware para ver si el usuario está logueado o no
function protected_route (req, res, next) {
  if (!req.session.user) {
    req.flash('errors', 'Debe loguearse primero')
    return res.redirect('/login')
  }
  // si llegamos hasta acá, guardamos el usuario de la sesión en una variable de los templates
  res.locals.user = req.session.user;
  // finalmente, seguimos el camino original
  next()
}


router.get('/', protected_route, (req, res) => {
  res.render('index.html')
})

router.get('/dos', protected_route, (req, res) => {
  res.render('dos.html')
})

router.get('/tres', protected_route, (req, res) => {
  res.render('tres.html')
})

router.get('*', (req, res) => {
  res.render('404.html')
})

module.exports = router;