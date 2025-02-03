# Sistema de Gestión para Niños con TEA

## Descripción General

El sistema de gestión para niños con Trastorno del Espectro Autista (TEA) está diseñado para facilitar el seguimiento, evaluación y tratamiento de los niños con esta condición. El sistema permite la coordinación entre terapeutas, profesores, padres y otros actores involucrados, proporcionando una plataforma integral para la gestión de la información y el apoyo terapéutico.

## Objetivos Principales

1. **Gestión de Información Geográfica**: Almacenar y organizar información sobre regiones y comunas para facilitar la localización de direcciones y centros de rehabilitación.
2. **Registro de Información Personal y Médica**: Mantener un registro detallado de los niños, incluyendo datos personales, diagnósticos, medicamentos y características específicas.
3. **Seguimiento y Evaluación**: Facilitar la evaluación continua de los niños mediante cuestionarios y pruebas interactivas.
4. **Gestión de Contactos y Relaciones**: Administrar la información de contacto de familiares, terapeutas, profesores y otros actores involucrados en el cuidado y seguimiento de los niños.
5. **Observaciones y Feedback**: Registrar observaciones realizadas por la familia, la escuela y los terapeutas, así como gestionar el feedback entre estos actores.
6. **Seguridad y Acceso**: Implementar mecanismos de seguridad para compartir información de manera controlada y registrar el historial de accesos a la información.

## Estructura de la Base de Datos

### Tablas de Ubicación Geográfica

#### Tabla `Region`
- **id_region**: INT, PRIMARY KEY, AUTO_INCREMENT
- **nombre**: VARCHAR(100), NOT NULL
- **codigo**: VARCHAR(10), UNIQUE

#### Tabla `Comuna`
- **id_comuna**: INT, PRIMARY KEY, AUTO_INCREMENT
- **nombre**: VARCHAR(100), NOT NULL
- **id_region**: INT, FOREIGN KEY (REFERENCES `Region`)

### Tablas Principales

#### Tabla `Direccion`
- **id_direccion**: INT, PRIMARY KEY, AUTO_INCREMENT
- **calle**: VARCHAR(100), NOT NULL
- **numero**: VARCHAR(20)
- **id_comuna**: INT, FOREIGN KEY (REFERENCES `Comuna`)

#### Tabla `Perfil_Personal`
- **id_perfil**: INT, PRIMARY KEY, AUTO_INCREMENT
- **rut**: VARCHAR(20), NOT NULL
- **nombre**: VARCHAR(100), NOT NULL
- **fecha_nacimiento**: DATE, NOT NULL
- **lugar_nacimiento**: VARCHAR(100)
- **foto_perfil**: VARCHAR(255)

#### Tabla `Diagnostico`
- **id_diagnostico**: INT, PRIMARY KEY, AUTO_INCREMENT
- **descripcion**: TEXT, NOT NULL
- **fecha_diagnostico**: DATE, NOT NULL
- **id_nino**: INT, FOREIGN KEY (REFERENCES `Perfil_Personal`)

#### Tabla `Historial_Medico`
- **id_historial**: INT, PRIMARY KEY, AUTO_INCREMENT
- **descripcion**: TEXT, NOT NULL
- **fecha**: DATE, NOT NULL
- **id_nino**: INT, FOREIGN KEY (REFERENCES `Perfil_Personal`)

#### Tabla `Autismo`
- **id_autismo**: INT, PRIMARY KEY, AUTO_INCREMENT
- **nivel**: ENUM('leve', 'moderado', 'severo'), NOT NULL
- **descripcion**: TEXT
- **id_nino**: INT, FOREIGN KEY (REFERENCES `Perfil_Personal`)

#### Tabla `Gustos_Intereses`
- **id_gusto_interes**: INT, PRIMARY KEY, AUTO_INCREMENT
- **descripcion**: TEXT, NOT NULL
- **id_nino**: INT, FOREIGN KEY (REFERENCES `Perfil_Personal`)

#### Tabla `Detonantes_Crisis`
- **id_detonante**: INT, PRIMARY KEY, AUTO_INCREMENT
- **descripcion**: TEXT, NOT NULL
- **id_nino**: INT, FOREIGN KEY (REFERENCES `Perfil_Personal`)

#### Tabla `Estado_Posterior_Crisis`
- **id_estado_posterior**: INT, PRIMARY KEY, AUTO_INCREMENT
- **descripcion**: TEXT, NOT NULL
- **id_nino**: INT, FOREIGN KEY (REFERENCES `Perfil_Personal`)

#### Tabla `Medicamento`
- **id_medicamento**: INT, PRIMARY KEY, AUTO_INCREMENT
- **nombre**: VARCHAR(100), NOT NULL
- **dosis**: VARCHAR(50), NOT NULL
- **horario**: TEXT, NOT NULL
- **id_nino**: INT, FOREIGN KEY (REFERENCES `Perfil_Personal`)
- **id_neurologo**: INT, FOREIGN KEY (REFERENCES `Neurologo`)

#### Tabla `Neurologo`
- **id_neurologo**: INT, PRIMARY KEY, AUTO_INCREMENT
- **nombre**: VARCHAR(100), NOT NULL
- **direccion**: VARCHAR(255)
- **telefono**: VARCHAR(20)
- **email**: VARCHAR(100)
- **website**: VARCHAR(255)
- **id_direccion**: INT, FOREIGN KEY (REFERENCES `Direccion`)

#### Tabla `Familia`
- **id_familia**: INT, PRIMARY KEY, AUTO_INCREMENT
- **nombre_familia**: VARCHAR(100), NOT NULL
- **foto_perfil**: VARCHAR(255)
- **telefono**: VARCHAR(20)
- **email**: VARCHAR(100)

#### Tabla `Terapeuta`
- **id_terapeuta**: INT, PRIMARY KEY, AUTO_INCREMENT
- **nombre**: VARCHAR(100), NOT NULL
- **especialidad**: VARCHAR(100)
- **foto_perfil**: VARCHAR(255)
- **telefono**: VARCHAR(20)
- **email**: VARCHAR(100)

#### Tabla `Universidad`
- **id_universidad**: INT, PRIMARY KEY, AUTO_INCREMENT
- **nombre**: VARCHAR(200), NOT NULL
- **logo**: VARCHAR(255)
- **direccion**: VARCHAR(255)
- **id_comuna**: INT, FOREIGN KEY (REFERENCES `Comuna`)
- **telefono**: VARCHAR(20)
- **email**: VARCHAR(100)
- **website**: VARCHAR(255)

#### Tabla `Perfil_Terapeuta`
- **id_perfil**: INT, PRIMARY KEY, AUTO_INCREMENT
- **id_terapeuta**: INT, UNIQUE, FOREIGN KEY (REFERENCES `Terapeuta`)
- **titulo_profesional**: VARCHAR(200), NOT NULL
- **id_universidad**: INT, FOREIGN KEY (REFERENCES `Universidad`)
- **fecha_graduacion**: DATE
- **anos_experiencia**: INT
- **certificaciones**: TEXT
- **enfoque_terapeutico**: TEXT
- **curriculum**: VARCHAR(255)

#### Tabla `Escuela`
- **id_escuela**: INT, PRIMARY KEY, AUTO_INCREMENT
- **nombre**: VARCHAR(100), NOT NULL
- **logo_escuela**: VARCHAR(255)
- **id_comuna**: INT, FOREIGN KEY (REFERENCES `Comuna`)
- **direccion**: VARCHAR(255)
- **telefono**: VARCHAR(20)
- **email**: VARCHAR(100)

### Tablas de Relaciones

#### Tabla `Nino_Familia`
- **id_nino**: INT, PRIMARY KEY, FOREIGN KEY (REFERENCES `Perfil_Personal`)
- **id_familia**: INT, PRIMARY KEY, FOREIGN KEY (REFERENCES `Familia`)
- **fecha_inicio**: DATE, NOT NULL
- **fecha_fin**: DATE

#### Tabla `Nino_Terapeuta`
- **id_nino**: INT, PRIMARY KEY, FOREIGN KEY (REFERENCES `Perfil_Personal`)
- **id_terapeuta**: INT, PRIMARY KEY, FOREIGN KEY (REFERENCES `Terapeuta`)
- **fecha_inicio**: DATE, NOT NULL
- **fecha_fin**: DATE

### Tablas de Observaciones

#### Tabla `Observacion_Escuela`
- **id_observacion_escuela**: INT, PRIMARY KEY, AUTO_INCREMENT
- **fecha**: DATE, NOT NULL
- **comportamiento**: TEXT
- **comunicacion_pares**: TEXT
- **aislamiento**: BOOLEAN
- **problemas_comunicacion**: TEXT
- **desempeno_academico**: TEXT
- **id_nino**: INT, FOREIGN KEY (REFERENCES `Perfil_Personal`)
- **id_profesor**: INT, FOREIGN KEY (REFERENCES `Profesor`)

#### Tabla `Observacion_Familia`
- **id_observacion_familia**: INT, PRIMARY KEY, AUTO_INCREMENT
- **fecha**: DATE, NOT NULL
- **rutinas**: TEXT
- **medicamentos**: TEXT
- **cambios_sueno**: TEXT
- **alteraciones**: TEXT
- **comunicacion_no_verbal**: TEXT
- **id_nino**: INT, FOREIGN KEY (REFERENCES `Perfil_Personal`)

Tabla Observacion_Terapeuta

    id_observacion_terapeuta: INT, PRIMARY KEY, AUTO_INCREMENT
    fecha: DATE, NOT NULL
    descripcion: TEXT
    planificacion_escuela: TEXT
    planificacion_hogar: TEXT
    adjuntos: VARCHAR(255) -- Ruta a archivos/imágenes
    id_nino: INT, FOREIGN KEY (REFERENCES Perfil_Personal)
    id_terapeuta: INT, FOREIGN KEY (REFERENCES Terapeuta)

Tablas de Feedback
Tabla Feedback_Escuela_Terapeuta

    id_feedback_escuela_terapeuta: INT, PRIMARY KEY, AUTO_INCREMENT
    fecha: DATE, NOT NULL
    descripcion: TEXT
    adjuntos: VARCHAR(255) -- Archivos/imágenes adjuntas
    id_observacion_escuela: INT, FOREIGN KEY (REFERENCES Observacion_Escuela)
    id_terapeuta: INT, FOREIGN KEY (REFERENCES Terapeuta)

Tabla Feedback_Terapeuta_Escuela

    id_feedback_terapeuta_escuela: INT, PRIMARY KEY, AUTO_INCREMENT
    fecha: DATE, NOT NULL
    descripcion: TEXT
    adjuntos: VARCHAR(255)
    id_observacion_terapeuta: INT, FOREIGN KEY (REFERENCES Observacion_Terapeuta)
    id_profesor: INT, FOREIGN KEY (REFERENCES Profesor)

Tabla Feedback_Profesor

    id_feedback: INT, PRIMARY KEY, AUTO_INCREMENT
    fecha: DATE, NOT NULL
    descripcion: TEXT
    adjuntos: VARCHAR(255) -- Archivos/imágenes adjuntas
    id_profesor: INT, FOREIGN KEY (REFERENCES Profesor)
    id_nino: INT, FOREIGN KEY (REFERENCES Perfil_Personal)

Tablas de Seguridad
Tabla Acceso_Compartido

    id_acceso: INT, PRIMARY KEY, AUTO_INCREMENT
    codigo_qr: VARCHAR(255) -- Código QR generado
    enlace_unico: VARCHAR(255) -- Enlace temporal
    fecha_creacion: DATETIME, NOT NULL
    fecha_expiracion: DATETIME
    permisos: JSON -- Ej: {"lectura": true, "edicion": false}
    id_nino: INT, FOREIGN KEY (REFERENCES Perfil_Personal)
    id_familia: INT, FOREIGN KEY (REFERENCES Familia)

Tabla Historial_Acceso

    id_historial: INT, PRIMARY KEY, AUTO_INCREMENT
    fecha_acceso: DATETIME, NOT NULL
    tipo_operacion: VARCHAR(50) -- Ej: "LECTURA", "EDICION"
    id_usuario: INT -- ID de terapeuta/familia
    id_acceso: INT, FOREIGN KEY (REFERENCES Acceso_Compartido)

Tablas Adicionales
Tabla Centro_Rehabilitacion

    id_centro: INT, PRIMARY KEY, AUTO_INCREMENT
    nombre: VARCHAR(100), NOT NULL
    logo: VARCHAR(255) -- Logo del centro
    id_comuna: INT, FOREIGN KEY (REFERENCES Comuna)
    direccion: VARCHAR(255)
    telefono: VARCHAR(20)

Tabla Documento

    id_documento: INT, PRIMARY KEY, AUTO_INCREMENT
    nombre: VARCHAR(255), NOT NULL
    archivo: VARCHAR(255), NOT NULL -- Ruta al archivo
    tipo: ENUM('informe', 'imagen', 'video', 'pdf')
    fecha_subida: DATETIME DEFAULT CURRENT_TIMESTAMP
    id_nino: INT, FOREIGN KEY (REFERENCES Perfil_Personal)

Tablas de Evaluaciones de TEA
Tabla Pregunta

    id_pregunta: INT, PRIMARY KEY, AUTO_INCREMENT
    texto_pregunta: TEXT, NOT NULL
    tipo: ENUM('OPCION', 'RESPUESTA', 'AUDIO'), NOT NULL
    audio: VARCHAR(255) -- Ruta al archivo de audio
    id_terapeuta: INT, FOREIGN KEY (REFERENCES Terapeuta)

Tabla Opcion_Pregunta

    id_opcion: INT, PRIMARY KEY, AUTO_INCREMENT
    texto_opcion: TEXT, NOT NULL
    id_pregunta: INT, FOREIGN KEY (REFERENCES Pregunta)

Tabla Respuesta

    id_respuesta: INT, PRIMARY KEY, AUTO_INCREMENT
    texto_respuesta: TEXT
    id_pregunta: INT, FOREIGN KEY (REFERENCES Pregunta)
    id_nino: INT, FOREIGN KEY (REFERENCES Perfil_Personal)

Tabla Evaluacion_TEA

    id_evaluacion: INT, PRIMARY KEY, AUTO_INCREMENT
    fecha: DATE, NOT NULL
    id_nino: INT, FOREIGN KEY (REFERENCES Perfil_Personal)
    id_terapeuta: INT, FOREIGN KEY (REFERENCES Terapeuta)
    id_profesor: INT, FOREIGN KEY (REFERENCES Profesor)

Tabla Pregunta_Evaluacion

    id_pregunta_evaluacion: INT, PRIMARY KEY, AUTO_INCREMENT
    id_evaluacion: INT, FOREIGN KEY (REFERENCES Evaluacion_TEA)
    id_pregunta: INT, FOREIGN KEY (REFERENCES Pregunta)
    id_respuesta: INT, FOREIGN KEY (REFERENCES Respuesta)

Tablas de Usuarios
Tabla Usuario

    usuario_id: INT, PRIMARY KEY, AUTO_INCREMENT
    nombre: VARCHAR(100), NOT NULL
    email: VARCHAR(100), UNIQUE, NOT NULL
    password: VARCHAR(255), NOT NULL
    rol: ENUM('padre', 'educador', 'terapeuta'), NOT NULL
    telefono: VARCHAR(20)
    fecha_registro: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    estado: ENUM('activo', 'inactivo') DEFAULT 'activo'

Tablas de Evaluaciones y Cuestionarios
Tabla Evaluaciones_Cuestionarios

    evaluacion_id: INT, PRIMARY KEY, AUTO_INCREMENT
    nino_id: INT, FOREIGN KEY (REFERENCES Perfil_Personal)
    tipo_evaluacion: ENUM('M-CHAT', 'SCQ', 'SRS', 'otros'), NOT NULL
    fecha_evaluacion: DATE, NOT NULL
    resultado: TEXT
    recomendaciones: TEXT
    estado: ENUM('pendiente', 'completado') DEFAULT 'pendiente'

Tablas de Planes Terapéuticos
Tabla Plan_Terapeutico

    plan_id: INT, PRIMARY KEY, AUTO_INCREMENT
    nino_id: INT, FOREIGN KEY (REFERENCES Perfil_Personal)
    terapeuta_id: INT, FOREIGN KEY (REFERENCES Terapeuta)
    objetivos: TEXT
    actividades_recomendadas: TEXT
    fecha_inicio: DATE, NOT NULL
    fecha_finalizacion: DATE
    estado: ENUM('activo', 'finalizado') DEFAULT 'activo'

Tablas de Actividades y Juegos Educativos
Tabla Actividades_Juegos

    actividad_id: INT, PRIMARY KEY, AUTO_INCREMENT
    nombre: VARCHAR(100), NOT NULL
    descripcion: TEXT
    tipo_actividad: ENUM('cognitiva', 'social', 'motor', 'comunicativa'), NOT NULL
    dificultad: ENUM('baja', 'media', 'alta'), NOT NULL
    edad_minima: INT
    edad_maxima: INT
    url_actividad: VARCHAR(255)
    estado: ENUM('disponible', 'no disponible') DEFAULT 'disponible'


Tablas de Sesiones de Terapia
Tabla Sesiones_Terapia

    sesion_id: INT, PRIMARY KEY, AUTO_INCREMENT
    terapeuta_id: INT, FOREIGN KEY (REFERENCES Terapeuta)
    nino_id: INT, FOREIGN KEY (REFERENCES Perfil_Personal)
    fecha_sesion: DATE, NOT NULL
    tipo_sesion: ENUM('individual', 'grupo'), NOT NULL
    duracion: INT
    observaciones: TEXT
    progreso: TEXT
    estado: ENUM('pendiente', 'completado', 'cancelado') DEFAULT 'pendiente'
    
    
    Tablas de Consultas y Mensajes (continuación)
Tabla Consultas_Mensajes

    mensaje_id: INT, PRIMARY KEY, AUTO_INCREMENT
    usuario_id: INT, FOREIGN KEY (REFERENCES Usuario)
    terapeuta_id: INT, FOREIGN KEY (REFERENCES Terapeuta)
    contenido: TEXT, NOT NULL
    fecha_envio: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    estado: ENUM('leído', 'no leído') DEFAULT 'no leído'

Tablas de Recursos Educativos
Tabla Recursos_Educativos

    recurso_id: INT, PRIMARY KEY, AUTO_INCREMENT
    nombre: VARCHAR(100), NOT NULL
    tipo_recurso: ENUM('artículo', 'video', 'documento', 'otro'), NOT NULL
    descripcion: TEXT
    url_recurso: VARCHAR(255)
    fecha_publicacion: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    estado: ENUM('disponible', 'no disponible') DEFAULT 'disponible'

Tablas de Contacto de Emergencia
Tabla Contacto_Emergencia

    id_contacto: INT, PRIMARY KEY, AUTO_INCREMENT
    nombre: VARCHAR(100), NOT NULL
    relacion: VARCHAR(50), NOT NULL
    telefono: VARCHAR(20), NOT NULL
    id_nino: INT, FOREIGN KEY (REFERENCES Perfil_Personal)

Tablas de Tratamiento
Tabla Tratamiento

    id_tratamiento: INT, PRIMARY KEY, AUTO_INCREMENT
    descripcion: TEXT, NOT NULL
    fecha_inicio: DATE, NOT NULL
    fecha_fin: DATE
    id_nino: INT, FOREIGN KEY (REFERENCES Perfil_Personal)

Tablas de Profesores
Tabla Profesor

    id_profesor: INT, PRIMARY KEY, AUTO_INCREMENT
    nombre: VARCHAR(100), NOT NULL
    rut: VARCHAR(20), NOT NULL
    email: VARCHAR(100), UNIQUE, NOT NULL
    telefono: VARCHAR(20)
    id_escuela: INT, FOREIGN KEY (REFERENCES Escuela)

Tabla Perfil_Profesor

    id_perfil: INT, PRIMARY KEY, AUTO_INCREMENT
    id_profesor: INT, FOREIGN KEY (REFERENCES Profesor)
    especialidad: VARCHAR(100)
    fecha_contratacion: DATE
    certificaciones: TEXT

Tablas de Notificaciones
Tabla Notificacion

    id_notificacion: INT, PRIMARY KEY, AUTO_INCREMENT
    mensaje: TEXT, NOT NULL
    fecha_envio: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    id_terapeuta: INT, FOREIGN KEY (REFERENCES Terapeuta)
    id_profesor: INT, FOREIGN KEY (REFERENCES Profesor)

Funcionalidades del Sistema
Gestión de Información Geográfica

El sistema permite almacenar y organizar información sobre regiones y comunas, facilitando la localización de direcciones y centros de rehabilitación. Las tablas Region y Comuna son fundamentales para esta funcionalidad.
Registro de Información Personal y Médica

El sistema mantiene un registro detallado de los niños, incluyendo datos personales, diagnósticos, historial médico y características específicas. Las tablas Perfil_Personal, Diagnostico, Historial_Medico, Autismo, Gustos_Intereses, Detonantes_Crisis, y Estado_Posterior_Crisis son esenciales para esta funcionalidad.
Seguimiento y Evaluación

El sistema facilita la evaluación continua de los niños mediante cuestionarios y pruebas interactivas. Las tablas Evaluacion_TEA, Pregunta, Opcion_Pregunta, Respuesta, y Pregunta_Evaluacion permiten gestionar las evaluaciones y sus resultados.
Gestión de Contactos y Relaciones

El sistema administra la información de contacto de familiares, terapeutas, profesores y otros actores involucrados en el cuidado y seguimiento de los niños. Las tablas Familia, Terapeuta, Profesor, Contacto_Emergencia, Nino_Familia, y Nino_Terapeuta son clave para esta funcionalidad.
Observaciones y Feedback

El sistema registra observaciones realizadas por la familia, la escuela y los terapeutas, así como gestiona el feedback entre estos actores. Las tablas Observacion_Escuela, Observacion_Familia, Observacion_Terapeuta, Feedback_Escuela_Terapeuta, Feedback_Terapeuta_Escuela, y Feedback_Profesor son fundamentales para esta funcionalidad.
Seguridad y Acceso

El sistema implementa mecanismos de seguridad para compartir información de manera controlada y registrar el historial de accesos a la información. Las tablas Acceso_Compartido y Historial_Acceso son esenciales para esta funcionalidad.
Planes Terapéuticos y Actividades

El sistema permite crear y gestionar planes terapéuticos personalizados para cada niño, así como almacenar y asignar actividades y juegos educativos según el plan terapéutico. Las tablas Plan_Terapeutico y Actividades_Juegos son clave para esta funcionalidad.
Sesiones de Terapia

El sistema registra sesiones de terapia y su progreso, facilitando el seguimiento del tratamiento de los niños. La tabla Sesiones_Terapia es fundamental para esta funcionalidad.
Consultas y Mensajes

El sistema facilita la comunicación entre usuarios y terapeutas mediante consultas y mensajes. La tabla Consultas_Mensajes es esencial para esta funcionalidad.
Recursos Educativos

El sistema provee acceso a recursos educativos relevantes para el tratamiento y apoyo de los niños. La tabla Recursos_Educativos es clave para esta funcionalidad.
Notificaciones

El sistema permite a los terapeutas enviar notificaciones a los profesores, facilitando la coordinación y el seguimiento de los niños. La tabla Notificacion es fundamental para esta funcionalidad.
Conclusión

El sistema de gestión para niños con TEA está diseñado para ser una herramienta integral que apoye el seguimiento y tratamiento de los niños, mejorando la coordinación entre los diferentes actores y personalizando el cuidado según las necesidades individuales de cada niño. Con una estructura de base de datos robusta y funcionalidades clave, el sistema proporciona una plataforma eficiente y segura para la gestión de la información y el apoyo terapéutico.



``sql
-- --------------------------------------------------------
-- Tablas de Ubicación Geográfica
-- --------------------------------------------------------
CREATE TABLE Region (
    id_region INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(10) UNIQUE
);

CREATE TABLE Comuna (
    id_comuna INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    id_region INT,
    FOREIGN KEY (id_region) REFERENCES Region(id_region)
);

-- --------------------------------------------------------
-- Tablas Principales
-- --------------------------------------------------------
CREATE TABLE Direccion (
    id_direccion INT PRIMARY KEY AUTO_INCREMENT,
    calle VARCHAR(100) NOT NULL,
    numero VARCHAR(20),
    id_comuna INT,
    FOREIGN KEY (id_comuna) REFERENCES Comuna(id_comuna)
);

CREATE TABLE Perfil_Personal (
    id_perfil INT PRIMARY KEY AUTO_INCREMENT,
    rut VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    lugar_nacimiento VARCHAR(100),
    foto_perfil VARCHAR(255)  -- Ruta de imagen
);

CREATE TABLE Diagnostico (
    id_diagnostico INT PRIMARY KEY AUTO_INCREMENT,
    descripcion TEXT NOT NULL,
    fecha_diagnostico DATE NOT NULL,
    id_nino INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);

CREATE TABLE Historial_Medico (
    id_historial INT PRIMARY KEY AUTO_INCREMENT,
    descripcion TEXT NOT NULL,
    fecha DATE NOT NULL,
    id_nino INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);

CREATE TABLE Autismo (
    id_autismo INT PRIMARY KEY AUTO_INCREMENT,
    nivel ENUM('leve', 'moderado', 'severo') NOT NULL,
    descripcion TEXT,
    id_nino INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);

CREATE TABLE Gustos_Intereses (
    id_gusto_interes INT PRIMARY KEY AUTO_INCREMENT,
    descripcion TEXT NOT NULL,
    id_nino INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);

CREATE TABLE Detonantes_Crisis (
    id_detonante INT PRIMARY KEY AUTO_INCREMENT,
    descripcion TEXT NOT NULL,
    id_nino INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);

CREATE TABLE Estado_Posterior_Crisis (
    id_estado_posterior INT PRIMARY KEY AUTO_INCREMENT,
    descripcion TEXT NOT NULL,
    id_nino INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);

CREATE TABLE Medicamento (
    id_medicamento INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    dosis VARCHAR(50) NOT NULL,
    horario TEXT NOT NULL,
    id_nino INT,
    id_neurologo INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil),
    FOREIGN KEY (id_neurologo) REFERENCES Neurologo(id_neurologo)
);

CREATE TABLE Neurologo (
    id_neurologo INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(255),
    id_direccion INT,
    FOREIGN KEY (id_direccion) REFERENCES Direccion(id_direccion)
);

CREATE TABLE Familia (
    id_familia INT PRIMARY KEY AUTO_INCREMENT,
    nombre_familia VARCHAR(100) NOT NULL,
    foto_perfil VARCHAR(255),  -- Ruta de imagen familiar
    telefono VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE Terapeuta (
    id_terapeuta INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    foto_perfil VARCHAR(255),  -- Foto profesional
    telefono VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE Universidad (
    id_universidad INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    logo VARCHAR(255),         -- Logo de la universidad
    direccion VARCHAR(255),
    id_comuna INT,
    telefono VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(255),
    FOREIGN KEY (id_comuna) REFERENCES Comuna(id_comuna)
);

CREATE TABLE Perfil_Terapeuta (
    id_perfil INT PRIMARY KEY AUTO_INCREMENT,
    id_terapeuta INT UNIQUE,   -- Relación 1:1 con Terapeuta
    titulo_profesional VARCHAR(200) NOT NULL,
    id_universidad INT,        -- Universidad de graduación
    fecha_graduacion DATE,
    anos_experiencia INT,
    certificaciones TEXT,
    enfoque_terapeutico TEXT,
    curriculum VARCHAR(255),   -- Ruta al CV en PDF
    FOREIGN KEY (id_terapeuta) REFERENCES Terapeuta(id_terapeuta),
    FOREIGN KEY (id_universidad) REFERENCES Universidad(id_universidad)
);

CREATE TABLE Escuela (
    id_escuela INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    logo_escuela VARCHAR(255), -- Logo institucional
    id_comuna INT,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(100),
    FOREIGN KEY (id_comuna) REFERENCES Comuna(id_comuna)
);

-- --------------------------------------------------------
-- Tablas de Relaciones
-- --------------------------------------------------------
CREATE TABLE Nino_Familia (
    id_nino INT,
    id_familia INT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    PRIMARY KEY (id_nino, id_familia),
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil),
    FOREIGN KEY (id_familia) REFERENCES Familia(id_familia)
);

CREATE TABLE Nino_Terapeuta (
    id_nino INT,
    id_terapeuta INT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    PRIMARY KEY (id_nino, id_terapeuta),
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil),
    FOREIGN KEY (id_terapeuta) REFERENCES Terapeuta(id_terapeuta)
);

-- --------------------------------------------------------
-- Tablas de Observaciones
-- --------------------------------------------------------
CREATE TABLE Observacion_Escuela (
    id_observacion_escuela INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    comportamiento TEXT,
    comunicacion_pares TEXT,
    aislamiento BOOLEAN,       -- True/False
    problemas_comunicacion TEXT,
    desempeno_academico TEXT,
    id_nino INT,
    id_profesor INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);

CREATE TABLE Observacion_Familia (
    id_observacion_familia INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    rutinas TEXT,
    medicamentos TEXT,
    cambios_sueno TEXT,
    alteraciones TEXT,
    comunicacion_no_verbal TEXT,
    id_nino INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);

CREATE TABLE Observacion_Terapeuta (
    id_observacion_terapeuta INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    descripcion TEXT,
    planificacion_escuela TEXT,
    planificacion_hogar TEXT,
    adjuntos VARCHAR(255),     -- Ruta a archivos/imágenes
    id_nino INT,
    id_terapeuta INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil),
    FOREIGN KEY (id_terapeuta) REFERENCES Terapeuta(id_terapeuta)
);

-- --------------------------------------------------------
-- Tablas de Feedback
-- --------------------------------------------------------
CREATE TABLE Feedback_Escuela_Terapeuta (
    id_feedback_escuela_terapeuta INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    descripcion TEXT,
    adjuntos VARCHAR(255),     -- Archivos/imágenes adjuntas
    id_observacion_escuela INT,
    id_terapeuta INT,
    FOREIGN KEY (id_observacion_escuela) REFERENCES Observacion_Escuela(id_observacion_escuela),
    FOREIGN KEY (id_terapeuta) REFERENCES Terapeuta(id_terapeuta)
);

CREATE TABLE Feedback_Terapeuta_Escuela (
    id_feedback_terapeuta_escuela INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    descripcion TEXT,
    adjuntos VARCHAR(255),
    id_observacion_terapeuta INT,
    id_profesor INT,
    FOREIGN KEY (id_observacion_terapeuta) REFERENCES Observacion_Terapeuta(id_observacion_terapeuta)
);

CREATE TABLE Feedback_Profesor (
    id_feedback INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    descripcion TEXT,
    adjuntos VARCHAR(255),     -- Archivos/imágenes adjuntas
    id_profesor INT,
    id_nino INT,
    FOREIGN KEY (id_profesor) REFERENCES Profesor(id_profesor),
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);
-- --------------------------------------------------------
-- Tablas de Seguridad (continuación)
-- --------------------------------------------------------
CREATE TABLE Acceso_Compartido (
    id_acceso INT PRIMARY KEY AUTO_INCREMENT,
    codigo_qr VARCHAR(255),    -- Código QR generado
    enlace_unico VARCHAR(255), -- Enlace temporal
    fecha_creacion DATETIME NOT NULL,
    fecha_expiracion DATETIME,
    permisos JSON,             -- Ej: {"lectura": true, "edicion": false}
    id_nino INT,
    id_familia INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil),
    FOREIGN KEY (id_familia) REFERENCES Familia(id_familia)
);

CREATE TABLE Historial_Acceso (
    id_historial INT PRIMARY KEY AUTO_INCREMENT,
    fecha_acceso DATETIME NOT NULL,
    tipo_operacion VARCHAR(50), -- Ej: "LECTURA", "EDICION"
    id_usuario INT,             -- ID de terapeuta/familia
    id_acceso INT,
    FOREIGN KEY (id_acceso) REFERENCES Acceso_Compartido(id_acceso)
);

-- --------------------------------------------------------
-- Tablas Adicionales
-- --------------------------------------------------------
CREATE TABLE Centro_Rehabilitacion (
    id_centro INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    logo VARCHAR(255),         -- Logo del centro
    id_comuna INT,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    FOREIGN KEY (id_comuna) REFERENCES Comuna(id_comuna)
);

CREATE TABLE Documento (
    id_documento INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    archivo VARCHAR(255) NOT NULL, -- Ruta al archivo
    tipo ENUM('informe', 'imagen', 'video', 'pdf'),
    fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_nino INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);

-- --------------------------------------------------------
-- Tablas de Evaluaciones de TEA
-- --------------------------------------------------------
CREATE TABLE Pregunta (
    id_pregunta INT PRIMARY KEY AUTO_INCREMENT,
    texto_pregunta TEXT NOT NULL,
    tipo ENUM('OPCION', 'RESPUESTA', 'AUDIO') NOT NULL,
    audio VARCHAR(255), -- Ruta al archivo de audio
    id_terapeuta INT,
    FOREIGN KEY (id_terapeuta) REFERENCES Terapeuta(id_terapeuta)
);

CREATE TABLE Opcion_Pregunta (
    id_opcion INT PRIMARY KEY AUTO_INCREMENT,
    texto_opcion TEXT NOT NULL,
    id_pregunta INT,
    FOREIGN KEY (id_pregunta) REFERENCES Pregunta(id_pregunta)
);

CREATE TABLE Respuesta (
    id_respuesta INT PRIMARY KEY AUTO_INCREMENT,
    texto_respuesta TEXT,
    id_pregunta INT,
    id_nino INT,
    FOREIGN KEY (id_pregunta) REFERENCES Pregunta(id_pregunta),
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);

CREATE TABLE Evaluacion_TEA (
    id_evaluacion INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    id_nino INT,
    id_terapeuta INT,
    id_profesor INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil),
    FOREIGN KEY (id_terapeuta) REFERENCES Terapeuta(id_terapeuta),
    FOREIGN KEY (id_profesor) REFERENCES Profesor(id_profesor)
);

CREATE TABLE Pregunta_Evaluacion (
    id_pregunta_evaluacion INT PRIMARY KEY AUTO_INCREMENT,
    id_evaluacion INT,
    id_pregunta INT,
    id_respuesta INT,
    FOREIGN KEY (id_evaluacion) REFERENCES Evaluacion_TEA(id_evaluacion),
    FOREIGN KEY (id_pregunta) REFERENCES Pregunta(id_pregunta),
    FOREIGN KEY (id_respuesta) REFERENCES Respuesta(id_respuesta)
);

-- --------------------------------------------------------
-- Tablas de Usuarios
-- --------------------------------------------------------
CREATE TABLE Usuario (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('padre', 'educador', 'terapeuta') NOT NULL,
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
);

-- --------------------------------------------------------
-- Tablas de Evaluaciones y Cuestionarios
-- --------------------------------------------------------
CREATE TABLE Evaluaciones_Cuestionarios (
    evaluacion_id INT PRIMARY KEY AUTO_INCREMENT,
    nino_id INT,
    tipo_evaluacion ENUM('M-CHAT', 'SCQ', 'SRS', 'otros') NOT NULL,
    fecha_evaluacion DATE NOT NULL,
    resultado TEXT,
    recomendaciones TEXT,
    estado ENUM('pendiente', 'completado') DEFAULT 'pendiente',
    FOREIGN KEY (nino_id) REFERENCES Perfil_Personal(id_perfil)
);

-- --------------------------------------------------------
-- Tablas de Planes Terapéuticos
-- --------------------------------------------------------
CREATE TABLE Plan_Terapeutico (
    plan_id INT PRIMARY KEY AUTO_INCREMENT,
    nino_id INT,
    terapeuta_id INT,
    objetivos TEXT,
    actividades_recomendadas TEXT,
    fecha_inicio DATE NOT NULL,
    fecha_finalizacion DATE,
    estado ENUM('activo', 'finalizado') DEFAULT 'activo',
    FOREIGN KEY (nino_id) REFERENCES Perfil_Personal(id_perfil),
    FOREIGN KEY (terapeuta_id) REFERENCES Terapeuta(id_terapeuta)
);

-- --------------------------------------------------------
-- Tablas de Actividades y Juegos Educativos
-- --------------------------------------------------------
CREATE TABLE Actividades_Juegos (
    actividad_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo_actividad ENUM('cognitiva', 'social', 'motor', 'comunicativa') NOT NULL,
    dificultad ENUM('baja', 'media', 'alta') NOT NULL,
    edad_minima INT,
    edad_maxima INT,
    url_actividad VARCHAR(255),
    estado ENUM('disponible', 'no disponible') DEFAULT 'disponible'
);

-- --------------------------------------------------------
-- Tablas de Sesiones de Terapia
-- --------------------------------------------------------
CREATE TABLE Sesiones_Terapia (
    sesion_id INT PRIMARY KEY AUTO_INCREMENT,
    terapeuta_id INT,
    nino_id INT,
    fecha_sesion DATE NOT NULL,
    tipo_sesion ENUM('individual', 'grupo') NOT NULL,
    duracion INT,
    observaciones TEXT,
    progreso TEXT,
    estado ENUM('pendiente', 'completado', 'cancelado') DEFAULT 'pendiente',
    FOREIGN KEY (terapeuta_id) REFERENCES Terapeuta(id_terapeuta),
    FOREIGN KEY (nino_id) REFERENCES Perfil_Personal(id_perfil)
);

-- --------------------------------------------------------
-- Tablas de Consultas y Mensajes
-- --------------------------------------------------------
CREATE TABLE Consultas_Mensajes (
    mensaje_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    terapeuta_id INT,
    contenido TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('leído', 'no leído') DEFAULT 'no leído',
    FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id),
    FOREIGN KEY (terapeuta_id) REFERENCES Terapeuta(id_terapeuta)
);

-- --------------------------------------------------------
-- Tablas de Recursos Educativos
-- --------------------------------------------------------
CREATE TABLE Recursos_Educativos (
    recurso_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    tipo_recurso ENUM('artículo', 'video', 'documento', 'otro') NOT NULL,
    descripcion TEXT,
    url_recurso VARCHAR(255),
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('disponible', 'no disponible') DEFAULT 'disponible'
);

-- --------------------------------------------------------
-- Tablas de Contacto de Emergencia
-- --------------------------------------------------------
CREATE TABLE Contacto_Emergencia (
    id_contacto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    relacion VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    id_nino INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);

-- --------------------------------------------------------
-- Tablas de Tratamiento
-- --------------------------------------------------------
CREATE TABLE Tratamiento (
    id_tratamiento INT PRIMARY KEY AUTO_INCREMENT,
    descripcion TEXT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    id_nino INT,
    FOREIGN KEY (id_nino) REFERENCES Perfil_Personal(id_perfil)
);

-- --------------------------------------------------------
-- Tablas de Profesores
-- --------------------------------------------------------
CREATE TABLE Profesor (
    id_profesor INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    rut VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    id_escuela INT,
    FOREIGN KEY (id_escuela) REFERENCES Escuela(id_escuela)
);

CREATE TABLE Perfil_Profesor (
    id_perfil INT PRIMARY KEY AUTO_INCREMENT,
    id_profesor INT,
    especialidad VARCHAR(100),
    fecha_contratacion DATE,
    certificaciones TEXT,
    FOREIGN KEY (id_profesor) REFERENCES Profesor(id_profesor)
);

-- --------------------------------------------------------
-- Tablas de Notificaciones
-- --------------------------------------------------------
CREATE TABLE Notificacion (
    id_notificacion INT PRIMARY KEY AUTO_INCREMENT,
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_terapeuta INT,
    id_profesor INT,
    FOREIGN KEY (id_terapeuta) REFERENCES Terapeuta(id_terapeuta),
    FOREIGN KEY (id_profesor) REFERENCES Profesor(id_profesor)
);


``}

