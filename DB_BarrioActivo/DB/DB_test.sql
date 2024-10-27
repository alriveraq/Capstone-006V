CREATE TABLE JUNTA_DE_VECINOS (
    id_junta NUMBER PRIMARY KEY,
    nombre_barrio VARCHAR2(50) NOT NULL,
    direccion VARCHAR2(100) NULL,
    fecha_fundacion DATE NOT NULL,
    fecha_creacion DATE DEFAULT SYSDATE
);

CREATE TABLE ROL (
    id_rol NUMBER PRIMARY KEY,
    nombre VARCHAR2(50) UNIQUE NOT NULL
);

CREATE TABLE USUARIO (
    id_usuario NUMBER PRIMARY KEY,
    rut VARCHAR2(12) UNIQUE NOT NULL,
    nombre VARCHAR2(50) NOT NULL,
    a_paterno VARCHAR2(50) NOT NULL,
    a_materno VARCHAR2(50) NOT NULL,
    tipo_casa VARCHAR2(50) NOT NULL,
    integrantes NUMBER(10) NOT NULL,
    adultos_mayores NUMBER(10) NOT NULL,
    email VARCHAR2(50) NOT NULL,
    contrasena VARCHAR2(50) NOT NULL,
    id_rol NUMBER REFERENCES ROL(id_rol),
    id_junta NUMBER REFERENCES JUNTA_DE_VECINOS(id_junta),
    fecha_creacion DATE DEFAULT SYSDATE,
    CONSTRAINT unique_usuario_junta UNIQUE (id_usuario, id_junta)
);

CREATE TABLE INFO_JUNTA (
    id_info_junta NUMBER PRIMARY KEY,
    id_junta NUMBER REFERENCES JUNTA_DE_VECINOS(id_junta),
    id_presidente NUMBER REFERENCES USUARIO(id_usuario),
    id_tesorero NUMBER REFERENCES USUARIO(id_usuario),
    id_secretario NUMBER REFERENCES USUARIO(id_usuario),
    CONSTRAINT unique_junta_info UNIQUE (id_info_junta, id_junta)
);

CREATE TABLE PUBLICACIONES (
    id_publicaciones NUMBER PRIMARY KEY,
    p_titular VARCHAR2(50) NOT NULL,
    contenido CLOB NOT NULL,
    fecha_publicacion DATE,
    fecha_creacion DATE DEFAULT SYSDATE,
    enviar_correo NUMBER,
    id_usuario NUMBER REFERENCES USUARIO(id_usuario),
    id_junta NUMBER REFERENCES JUNTA_DE_VECINOS(id_junta),
    imagen BLOB
);

CREATE TABLE SOLICITUDES_UNION_JUNTA (
    id_solicitud_union NUMBER PRIMARY KEY,
    id_usuario NUMBER REFERENCES USUARIO(id_usuario),
    id_junta NUMBER REFERENCES JUNTA_DE_VECINOS(id_junta),
    estado VARCHAR2(50) NOT NULL,
    id_presidente_junta NUMBER REFERENCES USUARIO(id_usuario),
    fecha_solicitud DATE DEFAULT SYSDATE,
    fecha_respuesta DATE
);

CREATE TABLE PROYECTOS (
    id_proyecto NUMBER PRIMARY KEY,
    nombre_proyecto VARCHAR2(50) NOT NULL,
    contenido CLOB NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    fecha_creacion DATE DEFAULT SYSDATE,
    id_usuario NUMBER REFERENCES USUARIO(id_usuario),
    id_junta NUMBER REFERENCES JUNTA_DE_VECINOS(id_junta)
);

CREATE TABLE POSTULACIONES (
    id_postulaciones NUMBER PRIMARY KEY,
    fecha_postulacion DATE DEFAULT SYSDATE,
    estado VARCHAR2(10),
    id_proyecto NUMBER REFERENCES PROYECTOS(id_proyecto),
    id_usuario NUMBER REFERENCES USUARIO(id_usuario),
    id_junta NUMBER REFERENCES JUNTA_DE_VECINOS(id_junta)
);

CREATE TABLE REUNIONES (
    id_reunion NUMBER PRIMARY KEY,
    r_tema VARCHAR2(50) NOT NULL,
    resumen CLOB NOT NULL,
    fecha_reunion DATE,
    id_usuario NUMBER REFERENCES USUARIO(id_usuario),
    id_junta NUMBER REFERENCES JUNTA_DE_VECINOS(id_junta)
);

CREATE TABLE ASISTENCIA (
    id_asistencia NUMBER PRIMARY KEY,
    fecha_asistencia DATE DEFAULT SYSDATE,
    id_reunion NUMBER REFERENCES REUNIONES(id_reunion) ON DELETE CASCADE,
    id_usuario NUMBER REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    asistio NUMBER(1) DEFAULT 1,
    UNIQUE (id_reunion, id_usuario)
);

CREATE TABLE VOTACIONES (
    id_votaciones NUMBER PRIMARY KEY,
    v_tema VARCHAR2(50) NOT NULL,
    v_fecha_inicio DATE NOT NULL,
    v_fecha_fin DATE NOT NULL,
    v_fecha_creacion DATE DEFAULT SYSDATE,
    id_junta NUMBER REFERENCES JUNTA_DE_VECINOS(id_junta)
);

CREATE TABLE INFO_VOTACION (
    id_info_votacion NUMBER PRIMARY KEY,
    id_votaciones NUMBER REFERENCES VOTACIONES(id_votaciones),
    id_usuario NUMBER REFERENCES USUARIO(id_usuario),
    voto_tipo VARCHAR2(50) NOT NULL,
    CONSTRAINT unique_usuario_votacion UNIQUE (id_usuario, id_votaciones)
);