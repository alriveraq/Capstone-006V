CREATE OR REPLACE PROCEDURE PL_REGISTRO_VOTO (
    u_id_votacion IN NUMBER,
    u_id_usuario IN NUMBER,
    u_voto_tipo IN VARCHAR2,
    u_mensaje OUT VARCHAR2,
    u_error_code OUT VARCHAR2
) IS
    v_count NUMBER;

BEGIN
    
    SELECT COUNT(*) INTO v_count 
    FROM INFO_VOTACION 
    WHERE id_votaciones = u_id_votacion AND id_usuario = u_id_usuario;

    IF v_count > 0 THEN
        u_error_code := 'PL_RV_01';
        u_mensaje := 'El usuario ya ha votado para esta votación.';
        RETURN;
    END IF;

    
    INSERT INTO INFO_VOTACION (
        id_info_votacion,
        id_votaciones,
        id_usuario,
        voto_tipo
    ) VALUES (
        id_sequence.NEXTVAL,
        u_id_votacion,
        u_id_usuario,
        u_voto_tipo
    );

    COMMIT;

    u_error_code := NULL; 
    u_mensaje := 'Voto registrado exitosamente.';

EXCEPTION
    WHEN OTHERS THEN
        u_error_code := 'PL_RV_02'; 
        u_mensaje := 'Error al registrar el voto: ' || SQLERRM;
        ROLLBACK;
END PL_REGISTRO_VOTO;
