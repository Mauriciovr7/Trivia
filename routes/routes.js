const { Router } = require('express')
const { get_preguntas, create_pregunta } = require('../db/preguntas.js')
const { get_jugadas, create_jugada } = require('../db/jugadas.js')

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

router.get('/new_question', protected_route, (req, res) => {
  res.render('new_question.html')
})

router.get('/lets_play', protected_route, async (req, res) => {

  const datos = await get_preguntas()
  console.log('datos ', datos)

  res.render('lets_play.html', {datos})
})

/* router.get('/tres', protected_route, (req, res) => {
  res.render('tres.html')
}) */

router.post('/new_question', protected_route, async (req, res) => {
  console.log('req.body', req.body);
  const pregunta = req.body.pregunta
  const respuesta_correcta = req.body.respuesta_correcta
  const falsa1 = req.body.respuesta_falsa1
  const falsa2 = req.body.respuesta_falsa2
  const falsa3 = req.body.respuesta_falsa3
  const falsa4 = req.body.respuesta_falsa4
  await create_pregunta(pregunta, respuesta_correcta, falsa1, falsa2, falsa3, falsa4)
  
  res.render('new_question.html')
})

router.get('*', (req, res) => {
  res.render('404.html')
})

module.exports = router;