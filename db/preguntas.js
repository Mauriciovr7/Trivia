const pool = require('./pool.js')

async function create_table () {

  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL (me traigo un array de arrays)

  // crear tabla sin jugadas_id   y despues de q admin llene con preguntas crear con alter table add column jugadas_id
  await client.query(`
    create table if not exists preguntas (
      id serial primary key,
      pregunta varchar(255) not null,
      respuesta_correcta varchar(255) not null,
      respuesta_falsa1 varchar(255) not null,
      respuesta_falsa2 varchar(255) not null,
      respuesta_falsa3 varchar(255),
      respuesta_falsa4 varchar(255)
    )
  `)
      // jugada_id int not null references jugadas(id)

  // 3. Devuelvo el cliente al pool
  client.release()
}
create_table()


async function get_preguntas () {
  console.log('preguntas')
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL (me traigo un array de arrays)
  const respuesta = await client.query({
    text: `select * from preguntas order by random() limit 3;` // ,
    //rowMode: 'array'
  })
  //let respuesta = rows.rows.sort()
  // 3. Devuelvo el cliente al pool
  client.release()
  //console.log('db ', rows);

  // 4. retorno preguntas, en caso de que exista
  return respuesta.rows//[0]
}

async function create_pregunta (pregunta, respuesta_correcta, falsa1, falsa2, falsa3, falsa4) {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL (me traigo un array de arrays)
  const { rows } = await client.query(
    `insert into preguntas (pregunta, respuesta_correcta, respuesta_falsa1, respuesta_falsa2, respuesta_falsa3, respuesta_falsa4) values ($1, $2, $3,$4, $5, $6) returning *`,
    [pregunta, respuesta_correcta, falsa1, falsa2, falsa3, falsa4]
  )

  // 3. Devuelvo el cliente al pool
  client.release()

  return rows[0]
}

module.exports = { get_preguntas, create_pregunta }

