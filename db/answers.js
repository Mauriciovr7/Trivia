async function mostrarRespuesta(datos) {

  for (let i=0;i<datos.length;i++) {
    datos[i].respuestas = [
      {
        value: '1',
        text: datos[i].respuesta_correcta
      },
      {
        value: '2',
        text: datos[i].respuesta_falsa1
      },
      {
        value: '3',
        text: datos[i].respuesta_falsa2
      },
      {
        value: '4',
        text: datos[i].respuesta_falsa3
      },
      {
        value: '5',
        text: datos[i].respuesta_falsa4
      },
    ]
  datos[i].respuestas = datos[i].respuestas.sort((elem1, elem2) => Math.random() - 0.5)

  }

}


module.exports= { mostrarRespuesta}