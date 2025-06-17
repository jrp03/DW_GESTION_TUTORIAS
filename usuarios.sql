-- Creación de la base de datos
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'practicas_pruebas')
BEGIN
    CREATE DATABASE practicas_pruebas;
    PRINT '✅ Base de datos "practicas_pruebas" creada correctamente';
END
GO

USE practicas_pruebas;
GO

-- Tabla de usuarios
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'usuarios')
BEGIN
    CREATE TABLE usuarios (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        rol VARCHAR(20) NOT NULL DEFAULT 'usuario' 
            CONSTRAINT CK_rol_valido CHECK (rol IN ('admin', 'usuario')),
        fecha_creacion DATETIME DEFAULT GETDATE()
    );
    PRINT '✅ Tabla "usuarios" creada correctamente';
    
    -- Insertar usuario administrador por defecto (contraseña: admin123)
    INSERT INTO usuarios (username, password, nombre, rol)
    VALUES ('admin', '$2a$10$XFAv9JE5wdYYbPdV4O0Zb.wWg1vwl9uGVkxQ7qEJRNmtpICnTJ4Uy', 'Administrador', 'admin');
    PRINT '✅ Usuario administrador creado';
END
GO

-- Tabla de maestros
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'maestros')
BEGIN
    CREATE TABLE maestros (
        id_maestro INT PRIMARY KEY,
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        materia VARCHAR(100) NOT NULL,
        carrera VARCHAR(100),
        telefono VARCHAR(20) NOT NULL,
        correo VARCHAR(100) NOT NULL
    );
    PRINT '✅ Tabla "maestros" creada correctamente';
    
    -- Datos de ejemplo para maestros
    INSERT INTO maestros (id_maestro, nombres, apellidos, materia, carrera, telefono, correo)
    VALUES 
        (1, 'Juan', 'Pérez', 'Matemáticas', 'Ingeniería', '5551234567', 'juan.perez@escuela.edu'),
        (2, 'María', 'Gómez', 'Física', 'Ciencias', '5557654321', 'maria.gomez@escuela.edu'),
        (3, 'Carlos', 'López', 'Programación', 'Informática', '5559876543', 'carlos.lopez@escuela.edu');
    PRINT '✅ Datos de ejemplo para maestros insertados';
END
GO

-- Tabla de materias
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'materias')
BEGIN
    CREATE TABLE materias (
        id_materia INT PRIMARY KEY,
        nombre_materia VARCHAR(50) NOT NULL,
        creditos INT DEFAULT 0,
        horas_semanales INT DEFAULT 0
    );
    PRINT '✅ Tabla "materias" creada correctamente';
    
    -- Datos de ejemplo para materias
    INSERT INTO materias (id_materia, nombre_materia, creditos, horas_semanales)
    VALUES 
        (101, 'Matemáticas Básicas', 4, 5),
        (102, 'Física I', 4, 5),
        (103, 'Programación I', 5, 6),
        (104, 'Bases de Datos', 5, 6);
    PRINT '✅ Datos de ejemplo para materias insertados';
END
GO

-- Tabla de alumnos
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'alumnos')
BEGIN
    CREATE TABLE alumnos (
        id_alumno INT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        correo VARCHAR(100) NOT NULL,
        carrera VARCHAR(100) NOT NULL,
        semestre INT DEFAULT 1,
        fecha_ingreso DATE DEFAULT GETDATE(),
        maestro_tutor INT,
        CONSTRAINT FK_alumno_maestro FOREIGN KEY (maestro_tutor) 
            REFERENCES maestros(id_maestro) ON DELETE SET NULL
    );
    PRINT '✅ Tabla "alumnos" creada correctamente';
    
    -- Datos de ejemplo para alumnos
    INSERT INTO alumnos (id_alumno, nombre, apellido, telefono, correo, carrera, semestre, maestro_tutor)
    VALUES 
        (1001, 'Ana', 'Martínez', '5551112233', 'ana.martinez@estudiante.edu', 'Ingeniería', 3, 1),
        (1002, 'Luis', 'Rodríguez', '5554445566', 'luis.rodriguez@estudiante.edu', 'Ciencias', 2, 2),
        (1003, 'Sofía', 'Hernández', '5557778899', 'sofia.hernandez@estudiante.edu', 'Informática', 4, 3);
    PRINT '✅ Datos de ejemplo para alumnos insertados';
END
GO
-- Tabla de carreras
CREATE TABLE `carreras` (
    `id_carrera` VARCHAR(10) PRIMARY KEY,
    `nombre` VARCHAR(100) NOT NULL,
    `estatus` BOOLEAN DEFAULT TRUE,
    `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) 

-- Datos iniciales básicos
INSERT INTO `carreras` (`id_carrera`, `nombre`) VALUES
('ITSE', 'Lic. en Ingeniería en Telecomunicaciones, Sistemas y Electrónica'),
('INFO', 'Lic. en Informática'),
('INFV', 'Lic. en Informática (Virtual)');


-- Tabla de solicitudes
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'solicitudes')
BEGIN
    CREATE TABLE solicitudes (
        id_solicitud INT IDENTITY(1,1) PRIMARY KEY,
        id_alumno INT NOT NULL,
        tipo_solicitud VARCHAR(50) NOT NULL 
            CONSTRAINT CK_tipo_solicitud CHECK (tipo_solicitud IN ('Tutoría', 'Asesoría', 'Inscripción', 'Otro')),
        descripcion TEXT,
        fecha_solicitud DATETIME DEFAULT GETDATE(),
        estado VARCHAR(20) DEFAULT 'Pendiente' 
            CONSTRAINT CK_estado_valido CHECK (estado IN ('Pendiente', 'Aprobada', 'Rechazada', 'Completada')),
        id_maestro_asignado INT,
        CONSTRAINT FK_solicitud_alumno FOREIGN KEY (id_alumno) 
            REFERENCES alumnos(id_alumno) ON DELETE CASCADE,
        CONSTRAINT FK_solicitud_maestro FOREIGN KEY (id_maestro_asignado) 
            REFERENCES maestros(id_maestro) ON DELETE SET NULL
    );
    PRINT '✅ Tabla "solicitudes" creada correctamente';
    
    -- Datos de ejemplo para solicitudes
    INSERT INTO solicitudes (id_alumno, tipo_solicitud, descripcion, estado, id_maestro_asignado)
    VALUES 
        (1001, 'Tutoría', 'Necesito ayuda con cálculo diferencial', 'Pendiente', 1),
        (1002, 'Asesoría', 'Dudas sobre el proyecto final', 'Aprobada', 2),
        (1003, 'Inscripción', 'Quiero cambiar mi horario', 'Pendiente', NULL);
    PRINT '✅ Datos de ejemplo para solicitudes insertados';
END
GO

-- Tabla de relación entre maestros y materias
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'maestros_materias')
BEGIN
    CREATE TABLE maestros_materias (
        id_maestro INT NOT NULL,
        id_materia INT NOT NULL,
        grupo VARCHAR(20),
        horario VARCHAR(100),
        PRIMARY KEY (id_maestro, id_materia),
        CONSTRAINT FK_maestro_materia_maestro FOREIGN KEY (id_maestro) 
            REFERENCES maestros(id_maestro) ON DELETE CASCADE,
        CONSTRAINT FK_maestro_materia_materia FOREIGN KEY (id_materia) 
            REFERENCES materias(id_materia) ON DELETE CASCADE
    );
    PRINT '✅ Tabla "maestros_materias" creada correctamente';
    
    -- Datos de ejemplo para maestros_materias
    INSERT INTO maestros_materias (id_maestro, id_materia, grupo, horario)
    VALUES 
        (1, 101, 'G1', 'Lunes y Miércoles 8:00-10:00'),
        (2, 102, 'G2', 'Martes y Jueves 10:00-12:00'),
        (3, 103, 'G3', 'Viernes 14:00-18:00'),
        (3, 104, 'G1', 'Lunes y Miércoles 16:00-18:00');
    PRINT '✅ Datos de ejemplo para maestros_materias insertados';
END
GO

-- Índices adicionales para mejorar el rendimiento
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_usuarios_username')
BEGIN
    CREATE INDEX IX_usuarios_username ON usuarios(username);
    PRINT '✅ Índice IX_usuarios_username creado';
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_alumnos_carrera')
BEGIN
    CREATE INDEX IX_alumnos_carrera ON alumnos(carrera);
    PRINT '✅ Índice IX_alumnos_carrera creado';
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_solicitudes_estado')
BEGIN
    CREATE INDEX IX_solicitudes_estado ON solicitudes(estado);
    PRINT '✅ Índice IX_solicitudes_estado creado';
END
GO

PRINT '🎉 Base de datos configurada exitosamente!';
GO