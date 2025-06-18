<<<<<<< HEAD
# DW_GESTION_TUTORIAS

El presente proyecto consiste en una aplicación web desarrollada con Next.js y Express, que se conecta a una base de datos MySQL. La aplicación permite gestionar las sesiones de tutorías, tomando en cuenta los cursos, maestros y estudiantes. Sus funcionalidades son registro y autenticación de usuario, registro de alumnos y maestros, creación de cursos y tutorías y gestión de solicitudes.

## Características Principales
- **Autenticación de Usuarios**: Los usuarios pueden registrarse e iniciar sesión en la aplicación.
- **Gestión de Cursos**: Los usuarios pueden crear, editar y eliminar cursos.
- **Gestión de Tutorías**: Los usuarios pueden crear, editar y eliminar tutorías.
- **Gestión de Estudiantes**: Los usuarios pueden gestionar estudiantes inscritos en cursos.
- **Base de Datos MySQL**: La aplicación se conecta a una base de datos MySQL para almacenar información de usuarios, cursos, tutorías y estudiantes.

## Tecnologías Utilizadas
- **Next.js**: Framework de React para el desarrollo de aplicaciones web.
- **Express.js**: Framework de Node.js para la creación de APIs y servidores web.
- **MySQL**: Sistema de gestión de bases de datos relacional.

## Instalación

1. Clona el repositorio en tu máquina local.
2. Instala las dependencias ejecutando `npm install`. (Se visualizan en package.json)
3. Configura la base de datos MySQL y actualiza la configuración en el archivo `src/db.js`.
4. Ejecuta la aplicación con `npm run dev`.

## Configuración de la Base de Datos
1. Crea una base de datos MySQL.
2. Importa el script SQL proporcionado en `databasemysql.sql`,`db/databasemysql.sql` para crear las tablas necesarias.
3. Actualiza la configuración de la base de datos en el archivo `config/database.js`.

## Uso
1. Abre tu navegador y accede a `localhost:3001` para ver la aplicación en funcionamiento.
2. Registra un nuevo usuario o inicia sesión con tus credenciales.
3. Utiliza las funcionalidades de la aplicación para gestionar cursos, tutorías y estudiantes.  

---

## Análisis y Documentación de la Estructura del Proyecto

El proyecto sigue el patrón **MVC (Modelo-Vista-Controlador)** y está organizado en varios directorios y archivos clave, cada uno con un propósito específico en la aplicación:

### Estructura principal

#### `src/`
Contiene toda la lógica del backend y la estructura MVC.

- **`controllers/`**  
  Gestiona la lógica de negocio y responde a las solicitudes HTTP. Cada archivo representa un controlador para un módulo (por ejemplo, `asesoresController.js`, `maestrosController.js`).

- **`models/`**  
  Define los modelos de datos y la lógica de acceso a la base de datos. Cada archivo representa una entidad y contiene métodos para operaciones CRUD y consultas especializadas.

- **`routes/`**  
  Define los endpoints de la API y los asocia con los controladores correspondientes. El archivo `index.js` centraliza todas las rutas y las agrupa bajo un router principal.

- **`middleware/`**  
  Provee funciones intermedias para validar, autenticar o modificar solicitudes antes de llegar al controlador (por ejemplo, autenticación JWT).

- **`views/`**  
  Almacena las plantillas HTML/EJS que se envían al cliente como interfaz de usuario.

- **`db.js`**  
  Configura y exporta la conexión a la base de datos MySQL para ser usada por los modelos.

- **`app.js`**  
  Configura la aplicación Express, middlewares, rutas, motor de vistas y manejo de errores.

#### `public/`
Sirve archivos estáticos (CSS, JS, imágenes) directamente al navegador para el frontend.

#### `db/`
Almacena scripts SQL para la creación y mantenimiento de la base de datos.

#### Otros archivos relevantes

- **`package.json`**  
  Gestiona dependencias y scripts del proyecto.

- **`.env`**  
  Almacena variables de entorno sensibles y configuraciones.

- **`README.md`**  
  Documenta el propósito, instalación, uso y estructura del proyecto.

---

### Tabla resumen de carpetas y su propósito

| Carpeta/Archivo      | Propósito principal                                                                 |
|----------------------|-------------------------------------------------------------------------------------|
| `src/controllers/`   | Lógica de negocio y respuesta a solicitudes                                         |
| `src/models/`        | Acceso y manipulación de datos en la base de datos                                  |
| `src/routes/`        | Definición de endpoints y asociación con controladores                              |
| `src/middleware/`    | Funciones intermedias para validación y autenticación                               |
| `src/views/`         | Plantillas HTML/EJS para la interfaz de usuario                                     |
| `src/db.js`          | Configuración de la conexión a la base de datos                                     |
| `src/app.js`         | Configuración global de la app, middlewares, rutas y errores                        |
| `public/`            | Archivos estáticos para el frontend (CSS, JS, imágenes)                             |
| `db/`                | Scripts SQL para la base de datos                                                   |
| `package.json`       | Dependencias y scripts del proyecto                                                 |
| `.env`               | Variables de entorno                                                                |
| `README.md`          | Documentación general del proyecto                                                  |

---

Esta estructura modular y clara facilita el mantenimiento, escalabilidad y comprensión del proyecto 

---
# Documentación de Pruebas CRUD 
En este apartado se muestran algunos ejemplos de pruebas realizadas a las rutas de aplicacion para evaluar la metodologia CRUD (Create,Read,Update y Delete) la cual prueba la manipulacion de los datos dentro de la aplicación.

**Herramienta de prueba:** Thunder Client (VS Code)  

---

## **Módulo:** Solicitudes  


### Endpoints Probados

| Método | Ruta                   | Descripción                           | Estado esperado |
|--------|------------------------|---------------------------------------|------------------|
| GET    | `/`                    | Obtener todas las solicitudes         | 200 OK           |
| GET    | `/materias`            | Obtener solicitudes filtradas por materia | 200 OK       |
| GET    | `/asesores`            | Obtener solicitudes filtradas por asesor | 200 OK        |
| GET    | `/:id`                 | Obtener una solicitud por ID          | 200 OK / 404     |
| POST   | `/`                    | Crear nueva solicitud                 | 201 Created / 400|
| PUT    | `/:id`                 | Actualizar solicitud existente        | 200 OK / 400 / 404|
| DELETE | `/:id`                 | Eliminar solicitud                    | 200 OK / 404     |

---

## Pruebas Detalladas

### 🔹 `GET /`

**Descripción:** Obtener todas las solicitudes.  
**Parámetros:** Ninguno  
**Respuesta esperada:**
```json
[
  {
    "id_solicitud": 1,
    "id_alumno": 123,
    "nombres": "soli 1",
    "apellidos": "uno",
    "carrera": "ITSE",
    "asesor": "123",
    "materia": "132"
  },
  {
    "id_solicitud": 2,
    "id_alumno": 456,
    "nombres": "soli 2",
    "apellidos": "dos",
    "carrera": "Informatica",
    "asesor": "456",
    "materia": "456"
  },
  {
    "id_solicitud": 3,
    "id_alumno": 789,
    "nombres": "soli 3",
    "apellidos": "tres",
    "carrera": "InformaticaVirtual",
    "asesor": "789",
    "materia": "789"
  }
]
    - Resultado obtenido: 200 ok lista de 3 solicitudes.
```

### 🔹 `GET /:id`

**Descripción:** Obtener una solicitud especifica por ID.  
**Parámetros:** Ninguno  
**Respuesta esperada:**
```json
{
  "id_solicitud": 1,
  "id_alumno": 123,
  "nombres": "soli 1",
  "apellidos": "uno",
  "carrera": "ITSE",
  "asesor": "123",
  "materia": "132"
}
```
### 🔹 `GET /materias`

**Descripción:** Obtener el numero de solicitudes por materia 
**Parámetros:** Ninguno  
**Respuesta esperada:**
```json
[
  {
    "Num_solicitudes": 1,
    "materia": "132"
  },
  {
    "Num_solicitudes": 1,
    "materia": "456"
  },
  {
    "Num_solicitudes": 1,
    "materia": "789"
  }
]
```
### 🔹 `GET /asesores`

**Descripción:** Obtener el numero de solicitudes por asesor 
**Parámetros:** Ninguno  
**Respuesta esperada:**
```json
[
  {
    "Num_solicitudes": 1,
    "id_alumno": 123
  },
  {
    "Num_solicitudes": 1,
    "id_alumno": 456
  },
  {
    "Num_solicitudes": 1,
    "id_alumno": 789
  }
]
=======
# DW_GESTION_TUTORIAS

El presente proyecto consiste en una aplicación web desarrollada con Next.js y Express, que se conecta a una base de datos MySQL. La aplicación permite gestionar las sesiones de tutorías, tomando en cuenta los cursos, maestros y estudiantes. Sus funcionalidades son registro y autenticación de usuario, registro de alumnos y maestros, creación de cursos y tutorías y gestión de solicitudes.

## Características Principales
- **Autenticación de Usuarios**: Los usuarios pueden registrarse e iniciar sesión en la aplicación.
- **Gestión de Cursos**: Los usuarios pueden crear, editar y eliminar cursos.
- **Gestión de Tutorías**: Los usuarios pueden crear, editar y eliminar tutorías.
- **Gestión de Estudiantes**: Los usuarios pueden gestionar estudiantes inscritos en cursos.
- **Base de Datos MySQL**: La aplicación se conecta a una base de datos MySQL para almacenar información de usuarios, cursos, tutorías y estudiantes.

## Tecnologías Utilizadas
- **Next.js**: Framework de React para el desarrollo de aplicaciones web.
- **Express.js**: Framework de Node.js para la creación de APIs y servidores web.
- **MySQL**: Sistema de gestión de bases de datos relacional.

## Instalación

1. Clona el repositorio en tu máquina local.
2. Instala las dependencias ejecutando `npm install`. (Se visualizan en package.json)
3. Configura la base de datos MySQL y actualiza la configuración en el archivo `src/db.js`.
4. Ejecuta la aplicación con `npm run dev`.

## Configuración de la Base de Datos
1. Crea una base de datos MySQL.
2. Importa el script SQL proporcionado en `databasemysql.sql`,`db/databasemysql.sql` para crear las tablas necesarias.
3. Actualiza la configuración de la base de datos en el archivo `config/database.js`.

## Uso
1. Abre tu navegador y accede a `localhost:3001` para ver la aplicación en funcionamiento.
2. Registra un nuevo usuario o inicia sesión con tus credenciales.
3. Utiliza las funcionalidades de la aplicación para gestionar cursos, tutorías y estudiantes.  

---

## Análisis y Documentación de la Estructura del Proyecto

El proyecto sigue el patrón **MVC (Modelo-Vista-Controlador)** y está organizado en varios directorios y archivos clave, cada uno con un propósito específico en la aplicación:

### Estructura principal

#### `src/`
Contiene toda la lógica del backend y la estructura MVC.

- **`controllers/`**  
  Gestiona la lógica de negocio y responde a las solicitudes HTTP. Cada archivo representa un controlador para un módulo (por ejemplo, `asesoresController.js`, `maestrosController.js`).

- **`models/`**  
  Define los modelos de datos y la lógica de acceso a la base de datos. Cada archivo representa una entidad y contiene métodos para operaciones CRUD y consultas especializadas.

- **`routes/`**  
  Define los endpoints de la API y los asocia con los controladores correspondientes. El archivo `index.js` centraliza todas las rutas y las agrupa bajo un router principal.

- **`middleware/`**  
  Provee funciones intermedias para validar, autenticar o modificar solicitudes antes de llegar al controlador (por ejemplo, autenticación JWT).

- **`views/`**  
  Almacena las plantillas HTML/EJS que se envían al cliente como interfaz de usuario.

- **`db.js`**  
  Configura y exporta la conexión a la base de datos MySQL para ser usada por los modelos.

- **`app.js`**  
  Configura la aplicación Express, middlewares, rutas, motor de vistas y manejo de errores.

#### `public/`
Sirve archivos estáticos (CSS, JS, imágenes) directamente al navegador para el frontend.

#### `db/`
Almacena scripts SQL para la creación y mantenimiento de la base de datos.

#### Otros archivos relevantes

- **`package.json`**  
  Gestiona dependencias y scripts del proyecto.

- **`.env`**  
  Almacena variables de entorno sensibles y configuraciones.

- **`README.md`**  
  Documenta el propósito, instalación, uso y estructura del proyecto.

---

### Tabla resumen de carpetas y su propósito

| Carpeta/Archivo      | Propósito principal                                                                 |
|----------------------|-------------------------------------------------------------------------------------|
| `src/controllers/`   | Lógica de negocio y respuesta a solicitudes                                         |
| `src/models/`        | Acceso y manipulación de datos en la base de datos                                  |
| `src/routes/`        | Definición de endpoints y asociación con controladores                              |
| `src/middleware/`    | Funciones intermedias para validación y autenticación                               |
| `src/views/`         | Plantillas HTML/EJS para la interfaz de usuario                                     |
| `src/db.js`          | Configuración de la conexión a la base de datos                                     |
| `src/app.js`         | Configuración global de la app, middlewares, rutas y errores                        |
| `public/`            | Archivos estáticos para el frontend (CSS, JS, imágenes)                             |
| `db/`                | Scripts SQL para la base de datos                                                   |
| `package.json`       | Dependencias y scripts del proyecto                                                 |
| `.env`               | Variables de entorno                                                                |
| `README.md`          | Documentación general del proyecto                                                  |

---

Esta estructura modular y clara facilita el mantenimiento, escalabilidad y comprensión del proyecto 

---
# Documentación de Pruebas CRUD 
En este apartado se muestran algunos ejemplos de pruebas realizadas a las rutas de aplicacion para evaluar la metodologia CRUD (Create,Read,Update y Delete) la cual prueba la manipulacion de los datos dentro de la aplicación.

**Herramienta de prueba:** Thunder Client (VS Code)  

---

## **Módulo:** Solicitudes  


### Endpoints Probados

| Método | Ruta                   | Descripción                           | Estado esperado |
|--------|------------------------|---------------------------------------|------------------|
| GET    | `/`                    | Obtener todas las solicitudes         | 200 OK           |
| GET    | `/materias`            | Obtener solicitudes filtradas por materia | 200 OK       |
| GET    | `/asesores`            | Obtener solicitudes filtradas por asesor | 200 OK        |
| GET    | `/:id`                 | Obtener una solicitud por ID          | 200 OK / 404     |
| POST   | `/`                    | Crear nueva solicitud                 | 201 Created / 400|
| PUT    | `/:id`                 | Actualizar solicitud existente        | 200 OK / 400 / 404|
| DELETE | `/:id`                 | Eliminar solicitud                    | 200 OK / 404     |

---

## Pruebas Detalladas

### 🔹 `GET /`

**Descripción:** Obtener todas las solicitudes.  
**Parámetros:** Ninguno  
**Respuesta esperada:**
```json
[
  {
    "id_solicitud": 1,
    "id_alumno": 123,
    "nombres": "soli 1",
    "apellidos": "uno",
    "carrera": "ITSE",
    "asesor": "123",
    "materia": "132"
  },
  {
    "id_solicitud": 2,
    "id_alumno": 456,
    "nombres": "soli 2",
    "apellidos": "dos",
    "carrera": "Informatica",
    "asesor": "456",
    "materia": "456"
  },
  {
    "id_solicitud": 3,
    "id_alumno": 789,
    "nombres": "soli 3",
    "apellidos": "tres",
    "carrera": "InformaticaVirtual",
    "asesor": "789",
    "materia": "789"
  }
]
    - Resultado obtenido: 200 ok lista de 3 solicitudes.
```

### 🔹 `GET /:id`

**Descripción:** Obtener una solicitud especifica por ID.  
**Parámetros:** Ninguno  
**Respuesta esperada:**
```json
{
  "id_solicitud": 1,
  "id_alumno": 123,
  "nombres": "soli 1",
  "apellidos": "uno",
  "carrera": "ITSE",
  "asesor": "123",
  "materia": "132"
}
```
### 🔹 `GET /materias`

**Descripción:** Obtener el numero de solicitudes por materia 
**Parámetros:** Ninguno  
**Respuesta esperada:**
```json
[
  {
    "Num_solicitudes": 1,
    "materia": "132"
  },
  {
    "Num_solicitudes": 1,
    "materia": "456"
  },
  {
    "Num_solicitudes": 1,
    "materia": "789"
  }
]
```
### 🔹 `GET /asesores`

**Descripción:** Obtener el numero de solicitudes por asesor 
**Parámetros:** Ninguno  
**Respuesta esperada:**
```json
[
  {
    "Num_solicitudes": 1,
    "id_alumno": 123
  },
  {
    "Num_solicitudes": 1,
    "id_alumno": 456
  },
  {
    "Num_solicitudes": 1,
    "id_alumno": 789
  }
]
>>>>>>> fcf114103f5736de93f4c4f93a143036f8b650bd
```