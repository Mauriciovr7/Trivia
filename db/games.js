const pool = require('./pool.js')

// create_table
async function create_table() {
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

// get_jugadas
async function get_jugadas(name_user) {

  let resp
  
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  if (name_user != undefined) {
    resp = await client.query(
      { text: `select *, name from jugadas,users where  name(users) = '${name_user}'` }
    )

  } else {
    // 2. Ejecuto la consulta SQL (me traigo un array de arrays)
    resp = await client.query(
      { text: `select *, name from jugadas,users where id(users) = user_id(jugadas) order by id(jugadas) desc` }
    )
  }


  // 3. Devuelvo el cliente al pool
  client.release()

  // 4. retorno el primer usuario, en caso de que exista
  return resp.rows
}

// create_jugada
async function create_jugada(score, percentage, user_id) {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL (me traigo un array de arrays)
  const resp = await client.query(
    `insert into jugadas (score, percentage, user_id) values ($1, $2, $3) returning *`,
    [score, percentage, user_id]
  )
  // 3. Devuelvo el cliente al pool
  client.release()
  return resp.rows
}

module.exports = { get_jugadas, create_jugada }