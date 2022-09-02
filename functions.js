async function mostrarRespuesta(datos) {
  datos[0].respuestas = [
    {
      value: 'correcta',
      text: datos[0].respuesta_correcta
    },
    {
      value: 'incorrecta',
      text: datos[0].respuesta_falsa1
    },
    {
      value: 'incorrecta',
      text: datos[0].respuesta_falsa2
    },
    {
      value: 'incorrecta',
      text: datos[0].respuesta_falsa3
    },
    {
      value: 'incorrecta',
      text: datos[0].respuesta_falsa4
    },
  ]
  datos[0].respuestas = datos[0].respuestas.sort((elem1, elem2) => Math.random() - 0.5)
  //
  datos[1].respuestas = [
    {
      value: 'correcta',
      text: datos[1].respuesta_correcta
    },
    {
      value: 'incorrecta',
      text: datos[1].respuesta_falsa1
    },
    {
      value: 'incorrecta',
      text: datos[1].respuesta_falsa2
    },
    {
      value: 'incorrecta',
      text: datos[1].respuesta_falsa3
    },
    {
      value: 'incorrecta',
      text: datos[1].respuesta_falsa4
    },
  ]
  datos[1].respuestas = datos[1].respuestas.sort((elem1, elem2) => Math.random() - 0.5)
  //

  datos[2].respuestas = [
    {
      value: 'correcta',
      text: datos[2].respuesta_correcta
    },
    {
      value: 'incorrecta',
      text: datos[2].respuesta_falsa1
    },
    {
      value: 'incorrecta',
      text: datos[2].respuesta_falsa2
    },
    {
      value: 'incorrecta',
      text: datos[2].respuesta_falsa3
    },
    {
      value: 'incorrecta',
      text: datos[2].respuesta_falsa4
    },
  ]
  datos[2].respuestas = datos[2].respuestas.sort((elem1, elem2) => Math.random() - 0.5)

}


module.exports= { mostrarRespuesta}