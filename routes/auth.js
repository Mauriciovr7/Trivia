const { Router } = require('express')
const bcrypt = require('bcrypt')
const { get_user, create_user } = require('../db/users.js')

const router = Router()

// ruta que carga el formulario del login
router.get('/login', (req, res) => {
  const messages = req.flash()
  res.render('login.html', { messages })
})

// ruta que procesa el formulario de Login
router.post('/login', async (req, res) => {
  // 1. me traigo los datos del formulario
  const email = req.body.email.trim()
  const password = req.body.password.trim()

  // 2. intento buscar al usuario en base a su email 
  let user_buscado = await get_user(email)
  if (!user_buscado) {
    req.flash('errors', 'Usuario es inexistente o contraseña incorrecta')
    return res.redirect('/login')
  }

  // 3. verificamos las contraseñas
  const son_coincidentes = await bcrypt.compare(password, user_buscado.password)
  if (!son_coincidentes) {
    req.flash('errors', 'Usuario es inexistente o contraseña incorrecta')
    return res.redirect('/login')
  }
  
  // PARTE FINAL
  req.session.user = {
    name: user_buscado.name,
    email: user_buscado.email,
    id: user_buscado.id
  }
  return res.redirect('/')  
})

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/login')
})

router.get('/register', (req, res) => {
  const messages = req.flash()
  console.log(messages);
  res.render('register.html', {messages})
})

router.post('/register', async (req, res) => {
  // 1. me traigo los datos del formulario
  const name = req.body.name.trim()
  const email = req.body.email.trim()
  const password = req.body.password.trim()
  const password_repeat = req.body.password_repeat.trim()

  // 2. validamos que contraseñas coincidan
  if (password != password_repeat) {
    req.flash('errors', 'Las contraseñas no coinciden')
    return res.redirect('/register')
  }

  // 3. validamos que no exista otro usuario con ese mismo correo
  const current_user = await get_user(email)
  if (current_user) {
    req.flash('errors', 'Ese email ya está ocupado')
    return res.redirect('/register')
  }

  // 4. Finalmente lo agregamos a la base de datos
  const encrypted_pass = await bcrypt.hash(password, 10)
  const new_user = await create_user(name, email, encrypted_pass)
  req.session.user = { id: new_user.id, name, email }

  // 5. y redirigimos a la ruta principal
  res.redirect('/')
})

module.exports = router;
