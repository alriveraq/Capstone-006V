CREATE OR REPLACE PROCEDURE PL_CREACION_VOTACION (
    u_v_tema IN VARCHAR2,
    u_v_fecha_inicio IN DATE,
    u_v_fecha_fin IN DATE,
    u_id_junta IN NUMBER,
    u_id_usuario IN NUMBER,
    enviar_correo IN NUMBER,
    u_mensaje OUT VARCHAR2,
    u_error_code OUT VARCHAR2,
    p_id_votacion OUT NUMBER
) IS
    v_count NUMBER;

BEGIN
   
    IF u_v_tema IS NULL OR TRIM(u_v_tema) = '' THEN
        u_error_code := 'PL_CV_01';
        u_mensaje := 'El campo del TEMA no puede estar vacío.';
        RETURN;
    END IF;

    IF u_v_fecha_inicio IS NULL THEN
        u_error_code := 'PL_CV_02';
        u_mensaje := 'El campo de la FECHA DE INICIO no puede estar vacío.';
        RETURN;
    END IF;

    IF u_v_fecha_fin IS NULL THEN
        u_error_code := 'PL_CV_03';
        u_mensaje := 'El campo de la FECHA DE FIN no puede estar vacío.';
        RETURN;
    END IF;

    SELECT COUNT(*) INTO v_count FROM USUARIO WHERE id_usuario = u_id_usuario;
    IF v_count = 0 THEN
        u_error_code := 'PL_CV_06';
        u_mensaje := 'El ID de usuario proporcionado no existe.';
        RETURN;
    END IF;


    SELECT COUNT(*) INTO v_count FROM JUNTA_DE_VECINOS WHERE id_junta = u_id_junta;
    IF v_count = 0 THEN
        u_error_code := 'PL_CV_04';
        u_mensaje := 'El ID de junta no existe.';
        RETURN;
    END IF;


    INSERT INTO VOTACIONES (
        id_votaciones,
        v_tema,
        v_fecha_inicio,
        v_fecha_fin,
        id_junta,
        id_usuario,
        enviar_correo
    ) VALUES (
        id_sequence.NEXTVAL, 
        u_v_tema,
        u_v_fecha_inicio,
        u_v_fecha_fin,
        u_id_junta,
        u_id_usuario,
        enviar_correo
    )
    RETURNING id_votaciones INTO p_id_votacion;

    COMMIT;

    u_error_code := NULL; 
    u_mensaje := 'Votación creada exitosamente.';

EXCEPTION
    WHEN OTHERS THEN
        u_error_code := 'PL_CV_05'; 
        u_mensaje := 'Error al crear la votación: ' || SQLERRM;
        ROLLBACK;
END PL_CREACION_VOTACION;
