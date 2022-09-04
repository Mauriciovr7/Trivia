const { Router } = require('express')
const { get_preguntas, create_pregunta } = require('../db/preguntas.js')
const { get_jugadas, create_jugada } = require('../db/jugadas.js')
const { mostrarRespuesta } = require('../functions.js')

const router = Router()
let info_div = false

// Vamos a crear un middleware para ver si el usuario está logueado o no
function protected_route(req, res, next) {
  if (!req.session.user) {
    req.flash('errors', 'Debe loguearse primero')
    return res.redirect('/login')
  }
  // si llegamos hasta acá, guardamos el usuario de la sesión en una variable de los templates
  res.locals.user = req.session.user;
  // finalmente, seguimos el camino original
  next()
}


// index GET
router.get('/', protected_route, async (req, res) => {
  req.session.user
  const jugadas = await get_jugadas()

  //console.log('userios************************** ', req.session);  
  //console.log('jugadas ', jugadas)
 //console.log('##########',info_div)
  res.render('index.html', { jugadas, info_div})
})


// new_question GET
router.get('/new_question', protected_route, (req, res) => {
  res.render('new_question.html')
})


// new_question POST
router.post('/new_question', protected_route, async (req, res) => {
  //console.log('isadmin ', req.session.user);
  if (req.session.user.isadmin == true) {
    ////console.log('req.body', req.body);
    const pregunta = req.body.pregunta
    const respuesta_correcta = req.body.respuesta_correcta
    const falsa1 = req.body.respuesta_falsa1
    const falsa2 = req.body.respuesta_falsa2
    const falsa3 = req.body.respuesta_falsa3
    const falsa4 = req.body.respuesta_falsa4
    await create_pregunta(pregunta, respuesta_correcta, falsa1, falsa2, falsa3, falsa4)
  }

  res.redirect('/')
})


// lets_play GET
router.get('/lets_play', protected_route, async (req, res) => {
  const datos = await get_preguntas() // const
  //console.log('datos ', datos) // preguntas
  mostrarRespuesta(datos) // funciones
  res.render('lets_play.html', { datos })
})

// respuestas del juego POST
router.post('/lets_play', async (req, res) => {
  const pregunta1 = req.body.pregunta1
  const pregunta2 = req.body.pregunta2
  const pregunta3 = req.body.pregunta3
  info_div = req.body.info_div
  //console.log('********************', info_div)

  const user_id = req.session.user.id
  let resultado = 0;
  let porcentaje = 0;
  if (pregunta1 == '1') {
    resultado++
  }
  if (pregunta2 == '1') {
    resultado++
  }
  if (pregunta3 == '1') {
    resultado++
  }

  porcentaje = ((resultado * 100) / 3).toFixed(1)
  //console.log('score % id_us', resultado, porcentaje, user_id)
  create_jugada(resultado, porcentaje, user_id)
  res.redirect('/')
})

// 404 GET>
router.get('*', (req, res) => {
  res.render('404.html')
})

module.exports = router;