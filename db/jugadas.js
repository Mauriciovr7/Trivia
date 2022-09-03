const pool = require('./pool.js')

async function create_table () {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL (me traigo un array de arrays)
  await client.query(`
    create table if not exists jugadas (
      id serial primary key,
      score int not null ,
      percentage float not null,
      user_id int not null references users(id)      
    )
  `)

  // 3. Devuelvo el cliente al pool
  client.release()
}
create_table()


/* async function get_jugadas (id) {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL (me traigo un array de arrays)
  const { rows } = await client.query(
    `select * from jugadas where id=$1`,
    [id]
  )
  // 3. Devuelvo el cliente al pool
  client.release()

  // 4. retorno el primer usuario, en caso de que exista
  return rows[0]
} */
async function get_jugadas () {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL (me traigo un array de arrays)
  const resp = await client.query(
    {text: `select *, name from jugadas,users where id(users) = user_id(jugadas)`}
  )
  // 3. Devuelvo el cliente al pool
  client.release()

  // 4. retorno el primer usuario, en caso de que exista
  return resp.rows
}

// select name from users, jugadas where id(users) = user_id(jugadas)

async function create_jugada (score, percentage, user_id) { // , pregunta_id) {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // alert table jugadas add column fkey

  // 2. Ejecuto la consulta SQL (me traigo un array de arrays)
  const resp = await client.query(
    `insert into jugadas (score, percentage, user_id) values ($1, $2, $3) returning *`, //, pregunta_id // , $4) returning *`,
    [score, percentage, user_id] // , pregunta_id]
  )

  // 3. Devuelvo el cliente al pool
  client.release()

  return resp.rows
}

module.exports = { get_jugadas, create_jugada }