CREATE OR REPLACE PROCEDURE PL_REGISTRO_ASISTENCIA (
    u_id_reunion IN NUMBER,
    u_id_usuario IN NUMBER,
    u_mensaje OUT VARCHAR2,
    u_error_code OUT VARCHAR2
) IS
    v_count NUMBER;

BEGIN
    SELECT COUNT(*) INTO v_count FROM REUNIONES WHERE id_reunion = u_id_reunion;
    IF v_count = 0 THEN
        u_error_code := 'PL_RA_01';
        u_mensaje := 'El ID de reunión proporcionado no existe.';
        RETURN;
    END IF;

    SELECT COUNT(*) INTO v_count FROM USUARIO WHERE id_usuario = u_id_usuario;
    IF v_count = 0 THEN
        u_error_code := 'PL_RA_02';
        u_mensaje := 'El ID de usuario proporcionado no existe.';
        RETURN;
    END IF;

    SELECT COUNT(*) INTO v_count FROM ASISTENCIA 
    WHERE id_reunion = u_id_reunion AND id_usuario = u_id_usuario;
    IF v_count > 0 THEN
        u_error_code := 'PL_RA_03';
        u_mensaje := 'El usuario ya está registrado como asistente a esta reunión.';
        RETURN;
    END IF;

    INSERT INTO ASISTENCIA (
        id_asistencia,
        fecha_asistencia,
        id_reunion,
        id_usuario
    ) VALUES (
        id_sequence.NEXTVAL,
        SYSDATE,
        u_id_reunion,
        u_id_usuario
    );

    COMMIT;
    u_error_code := NULL; 
    u_mensaje := 'Asistencia registrada exitosamente.';

EXCEPTION
    WHEN OTHERS THEN
        u_error_code := 'PL_RA_04'; 
        u_mensaje := 'Error al registrar la asistencia: ' || SQLERRM;
        ROLLBACK;
END PL_REGISTRO_ASISTENCIA;
