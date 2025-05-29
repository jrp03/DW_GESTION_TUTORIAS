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
- **Tailwind CSS**: Framework de CSS para estilizar la interfaz de usuario.

## Instalación

1. Clona el repositorio en tu máquina local.
2. Instala las dependencias ejecutando `npm install`. (Se visualizan en package.json)
3. Configura la base de datos MySQL y actualiza la configuración en el archivo `config/database.js`.
4. Ejecuta la aplicación con `npm run dev`.

## Configuración de la Base de Datos
1. Crea una base de datos MySQL.
2. Importa el script SQL proporcionado en `registros.sql`,`scripts/usuarios.sql` para crear las tablas necesarias.
3. Actualiza la configuración de la base de datos en el archivo `config/database.js`.

## Uso
1. Abre tu navegador y accede a `localhost:3000` para ver la aplicación en funcionamiento.
2. Registra un nuevo usuario o inicia sesión con tus credenciales.
3. Utiliza las funcionalidades de la aplicación para gestionar cursos, tutorías y estudiantes.  

## Estructura del Proyecto
El proyecto `DW_GESTION_TUTORIAS` está organizado en varios directorios y archivos clave, cada uno con un propósito específico en la aplicación:

#### Directorios:
1. **.next/**: Contiene artefactos de construcción para una aplicación Next.js, incluidos manifiestos y archivos estáticos.
2. **.vscode/**: Contiene configuraciones para Visual Studio Code.
3. **app/**: Contiene estilos globales y componentes de diseño para la aplicación.
4. **components/**: Incluye componentes de UI reutilizables y proveedores de temas.
5. **config/**: Archivos de configuración, incluyendo configuraciones de conexión a la base de datos.
6. **controllers/**: Contiene la lógica de los controladores para manejar solicitudes y lógica de negocio.
7. **hooks/**: Hooks personalizados de React para funcionalidades específicas.
8. **lib/**: Funciones utilitarias usadas en toda la aplicación.
9. **middleware/**: Middleware para autenticación y validación.
10. **models/**: Define modelos de datos y lógica de interacción con la base de datos.
11. **public/**: Archivos estáticos como plantillas HTML e imágenes.
12. **routes/**: Definiciones de rutas de Express.js para diferentes módulos.
13. **scripts/**: Scripts SQL para la configuración y gestión de la base de datos.
14. **styles/**: Estilos CSS globales.

#### Archivos Clave:

- **README.md**: Archivo de documentación para el proyecto.
- **database.js**: Administra conexiones y consultas a la base de datos.
- **server.js**: Punto de entrada para la aplicación del servidor.
- **package.json**: Lista dependencias y scripts para el proyecto.
- **next.config.mjs**: Configuración para Next.js.
- **tailwind.config.ts**: Configuración para Tailwind CSS.

Esta estructura soporta un enfoque modular y organizado para construir una aplicación web, aprovechando Express.js para la lógica del lado del servidor y Next.js para el renderizado del frontend.