CREATE OR REPLACE PROCEDURE PL_SOLICITUD_JUNTA (
    u_id_usuario IN NUMBER,
    u_id_presidente_junta IN NUMBER,
    u_id_junta IN NUMBER,
    u_estado IN VARCHAR2,
    u_fecha_respuesta DATE,
    u_mensaje OUT VARCHAR2,
    u_error_code OUT VARCHAR2
) IS
    v_count NUMBER;
    
BEGIN
    IF u_estado IS NULL OR TRIM(u_estado) = '' THEN
        u_error_code := 'PL_SJ_01';
        u_mensaje := 'El campo del ESTADO no puede estar vacio.';
        RETURN;
    END IF;
    
    BEGIN
    
        SELECT COUNT(*) INTO v_count FROM USUARIO WHERE id_usuario  = u_id_usuario AND id_junta IS NOT NULL;
        IF v_count > 0 THEN
            u_error_code := 'PL_SJ_02';
            u_mensaje := 'El usuario ya pertenece a una junta de vecinos';
            RETURN;
        END IF;
        
        SELECT COUNT(*) INTO v_count FROM SOLICITUDES_UNION_JUNTA WHERE id_usuario = u_id_usuario;
        IF v_count > 0 THEN
            u_error_code := 'PL_SJ_03';
            u_mensaje := 'El usuario ya tiene una solicitud hecha';
            RETURN;
        END IF;
        
        INSERT INTO SOLICITUDES_UNION_JUNTA (
            ID_SOLICITUD_UNION,
            ID_USUARIO,
            ID_JUNTA,
            ESTADO,
            ID_PRESIDENTE_JUNTA,
            FECHA_SOLICITUD,
            FECHA_RESPUESTA
        )VALUES(
            id_sequence.NEXTVAL,
            u_id_usuario,
            u_id_junta,
            u_estado,
            u_id_presidente_junta,
            SYSDATE,
            u_fecha_respuesta
        );
        
        COMMIT;
        u_error_code := NULL; 
        u_mensaje := 'Solicitud registrada correctamente.';
        
        EXCEPTION
    WHEN OTHERS THEN
        u_mensaje := 'Error al solicitud.' || SQLERRM;
        ROLLBACK;
    END;
END PL_SOLICITUD_JUNTA;
