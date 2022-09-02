const { Router } = require('express')
const { get_preguntas, create_pregunta } = require('../db/preguntas.js')
const { get_jugadas, create_jugada } = require('../db/jugadas.js')
const { mostrarRespuesta } = require('../functions.js')

const router = Router()

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


router.get('/', protected_route, (req, res) => {
  res.render('index.html')
})

router.post('/respuestas', async (req, res) => {
  //console.log('revisando parametro', req.params.id)
  const datos = req.body
  let pregunta1 = req.body.pregunta1
  let pregunta2 = req.body.pregunta2
  let pregunta3 = req.body.pregunta3

  const user_id = req.session.user.id  
  let resultado = 0;
  let porcentaje = 0;
  if (pregunta1 == 'correcta') {
    resultado++
  }
  if (pregunta2 == 'correcta') {
    resultado++
  }
  if (pregunta3 == 'correcta') {
    resultado++
  }
  

  porcentaje = (resultado * 100) / 3;

  await datos.id.forEach((item)=>{
    console.log('id', resultado, porcentaje, user_id, item)
    create_jugada(resultado, porcentaje, user_id, item) 
  }) 


/* let pregunta_id = datos.id.forEach((item)=>{
  console.log('id', item)
}) */

  res.redirect('/')
})



router.get('/new_question', protected_route, (req, res) => {
  res.render('new_question.html')
})
router.post('/new_question', protected_route, async (req, res) => {
  //console.log('req.body', req.body);
  const pregunta = req.body.pregunta
  const respuesta_correcta = req.body.respuesta_correcta
  const falsa1 = req.body.respuesta_falsa1
  const falsa2 = req.body.respuesta_falsa2
  const falsa3 = req.body.respuesta_falsa3
  const falsa4 = req.body.respuesta_falsa4
  await create_pregunta(pregunta, respuesta_correcta, falsa1, falsa2, falsa3, falsa4)

  res.redirect('/')
})

//---- Ruta para que nos muestre las preguntas y respuestas random --->
router.get('/lets_play', protected_route, async (req, res) => {
  let datos = await get_preguntas()
  mostrarRespuesta(datos) // funciones
  res.render('lets_play.html', { datos })
})




router.get('*', (req, res) => {
  res.render('404.html')
})

module.exports = router;