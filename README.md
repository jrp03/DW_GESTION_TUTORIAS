# Documentación de Pruebas CRUD 
En este apartado se muestran algunos ejemplos de pruebas realizadas a las rutas de aplicacion para evaluar la metodologia CRUD (Create,Read,Update y Delete) la cual prueba la manipulacion de los datos dentro de la aplicación.
**Herramienta de prueba:** Thunder Client (VS Code)  


**Módulo:** Solicitudes  



---

## Endpoints Probados

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
```