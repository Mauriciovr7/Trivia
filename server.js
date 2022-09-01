const express = require('express');
const session = require('express-session');
const nunjucks = require('nunjucks')
const path = require('path')
const flash = require('connect-flash')
const pool = require('./db/pool.js')
const pgSession = require('connect-pg-simple')(session)

const secrets = require('./secrets');
const { env } = require('process');

const app = express()

// se configura uso de sesiones
// https://github.com/voxpelli/node-connect-pg-simple
app.use(session({
  store: new pgSession({
    pool: pool
  }),
  secret: 'hmit',
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}))

// se configuran archivos estáticos
app.use(express.static('./node_modules/bootstrap/dist'))
app.use(express.static('./public'))

// se configura nunjucks
const nunj_env = nunjucks.configure(path.resolve(__dirname, "templates"), {
  express: app,
  autoscape: true,
  noCache: true,
  watch: true,
});
nunj_env.addGlobal('app_name', secrets.app_name)

// se configura uso de formularios
app.use(express.urlencoded({extended: true}))

// se configura uso de mensajes flash
app.use(flash())

// se traen las rutas
app.use(require('./routes/auth'))
app.use(require('./routes/routes'))


app.listen(3000, () => {
  console.log('servidor ejecutando en el puerto 3000');
})
