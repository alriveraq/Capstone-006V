CREATE OR REPLACE PROCEDURE PL_CREACION_REUNION (
    u_tema IN VARCHAR2,
    u_resumen IN VARCHAR2,
    u_fecha_reunion IN DATE,
    u_id_usuario IN NUMBER,
    u_id_junta IN NUMBER,
    u_mensaje OUT VARCHAR2,
    u_error_code OUT VARCHAR2,
    p_id_reunion OUT NUMBER
) IS
    v_count NUMBER;

BEGIN
    IF u_tema IS NULL OR TRIM(u_tema) = '' THEN
        u_error_code := 'PL_CR_01';
        u_mensaje := 'El campo del TEMA no puede estar vacío.';
        RETURN;
    END IF;

    IF u_fecha_reunion IS NULL THEN
        u_error_code := 'PL_CR_02';
        u_mensaje := 'El campo de la FECHA DE REUNIÓN no puede estar vacío.';
        RETURN;
    END IF;

    IF u_resumen IS NULL THEN
        u_error_code := 'PL_CR_06';
        u_mensaje := 'El campo de la RESUMEN DE REUNIÓN no puede estar vacío.';
    END IF;

    SELECT COUNT(*) INTO v_count FROM USUARIO WHERE id_usuario = u_id_usuario;
    IF v_count = 0 THEN
        u_error_code := 'PL_CR_03';
        u_mensaje := 'El ID de usuario proporcionado no existe.';
        RETURN;
    END IF;

    SELECT COUNT(*) INTO v_count FROM JUNTA_DE_VECINOS WHERE id_junta = u_id_junta;
    IF v_count = 0 THEN
        u_error_code := 'PL_CR_04';
        u_mensaje := 'El ID de junta proporcionado no existe.';
        RETURN;
    END IF;

    INSERT INTO REUNIONES (
        id_reunion,
        r_tema,
        resumen,
        fecha_reunion,
        id_usuario,
        id_junta
    ) VALUES (
        id_sequence.NEXTVAL,
        u_tema,
        u_resumen,
        u_fecha_reunion,
        u_id_usuario,
        u_id_junta
    )
    RETURNING id_reunion INTO p_id_reunion;

    COMMIT;
    u_error_code := NULL; 
    u_mensaje := 'Reunión registrada exitosamente';

EXCEPTION
    WHEN OTHERS THEN
        u_error_code := 'PL_CR_05'; 
        u_mensaje := 'Error al registrar la reunión: ' || SQLERRM;
        ROLLBACK;
END PL_CREACION_REUNION;
