# Instrucciones para ejecutar

1. Clonar el proyecto
   `git clone REPO_STARTERKIT`

2. Crear la base de datos
   `create database blah`

3. Copiar el archivo secrets, y modificar las credenciales de usuario
   `cp secrets.js.tpl secrets.js`
   
4. Instalar las dependencias
   `npm install`

5. Crear tabla de la base de datos
   `psql -U postgres -f node_modules/connect-pg-simple/table.sql nombre_base_datos`

6. Ejecutar
   `nodemon server.js`