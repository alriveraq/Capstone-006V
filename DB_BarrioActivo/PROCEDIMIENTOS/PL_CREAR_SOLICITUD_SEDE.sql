CREATE OR REPLACE PROCEDURE PL_CREAR_SOLICITUD_SEDE (
    u_id_usuario IN NUMBER,
    u_id_junta IN NUMBER,
    u_tipo_solicitud IN VARCHAR2,
    u_fecha_inicio IN DATE,
    u_fecha_fin IN DATE,
    u_descripcion IN VARCHAR2,
    u_estado OUT VARCHAR2,
    u_mensaje OUT VARCHAR2
) IS
    v_id_solicitud NUMBER;
BEGIN

    IF u_id_usuario IS NULL THEN
        u_estado := 'ERROR';
        u_mensaje := 'El ID de usuario no puede ser nulo.';
        RETURN;
    END IF;

    IF u_id_junta IS NULL THEN
        u_estado := 'ERROR';
        u_mensaje := 'El ID de junta no puede ser nulo.';
        RETURN;
    END IF;

    IF u_tipo_solicitud IS NULL THEN
        u_estado := 'ERROR';
        u_mensaje := 'El tipo de solicitud no puede ser nulo.';
        RETURN;
    END IF;

    IF u_fecha_inicio IS NULL OR u_fecha_fin IS NULL THEN
        u_estado := 'ERROR';
        u_mensaje := 'Las fechas de inicio y fin no pueden ser nulas.';
        RETURN;
    END IF;

    IF u_fecha_inicio >= u_fecha_fin THEN
        u_estado := 'ERROR';
        u_mensaje := 'La fecha de inicio debe ser anterior a la fecha de fin.';
        RETURN;
    END IF;

    INSERT INTO SOLICITUDES_SEDES (
        id_solicitud,
        id_usuario,
        id_junta,
        tipo_solicitud,
        fecha_inicio,
        fecha_fin,
        estado,
        descripcion
    ) VALUES (
        id_sequence.NEXTVAL, 
        u_id_usuario,
        u_id_junta,
        u_tipo_solicitud,
        u_fecha_inicio,
        u_fecha_fin,
        'Pendiente',
        u_descripcion
    )
    RETURNING id_solicitud INTO v_id_solicitud;

    u_estado := 'SUCCESS';
    u_mensaje := 'Solicitud creada correctamente. ID de solicitud: ' || v_id_solicitud;

    COMMIT;

EXCEPTION
    WHEN OTHERS THEN
        u_estado := 'ERROR';
        u_mensaje := 'Error al crear la solicitud: ' || SQLERRM;
        ROLLBACK;
END PL_CREAR_SOLICITUD_SEDE;
