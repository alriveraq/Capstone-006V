CREATE OR REPLACE PROCEDURE PL_CREACION_JUNTA (
    u_nombre_barrio IN VARCHAR2,
    u_direccion IN VARCHAR2,
    u_fecha_fundacion IN DATE,
    u_mensaje OUT VARCHAR2,
    u_error_code OUT VARCHAR2,
    p_id_junta OUT NUMBER
)IS
    v_count NUMBER;

BEGIN
    IF u_nombre_barrio IS NULL OR TRIM(u_nombre_barrio) = '' THEN
        u_error_code := 'PL_CJ_01';
        u_mensaje := 'El campo del NOMBRE DEL BARRIO no puede estar vacio.';
        RETURN;
    END IF;
    
    IF u_direccion IS NULL OR TRIM(u_direccion) = '' THEN
        u_error_code := 'PL_CJ_02';
        u_mensaje := 'El campo de la DIRECCION no puede estar vacio.';
        RETURN;
    END IF;
    
    IF u_fecha_fundacion IS NULL OR TRIM(u_fecha_fundacion) = '' THEN
        u_error_code := 'PL_CJ_03';
        u_mensaje := 'El campo de la FECHA DE FUNDACION no puede estar vacio.';
        RETURN;
    END IF;
    
    
    INSERT INTO junta_de_vecinos (
    id_junta,
    nombre_barrio,
    direccion,
    fecha_fundacion,
    fecha_creacion
) VALUES (
    id_sequence.NEXTVAL,
    u_nombre_barrio,
    u_direccion,
    u_fecha_fundacion,
    SYSDATE
    )
    RETURNING id_junta INTO p_id_junta;
    
    COMMIT;
    u_error_code := NULL; 
    u_mensaje := 'Junta de vecinos registrada exitosamente.';
    
EXCEPTION
    WHEN OTHERS THEN
        u_error_code := 'PL_CJ_07'; 
        u_mensaje := 'Error al registrar junta de vecinos.' || SQLERRM;
        ROLLBACK;
END PL_CREACION_JUNTA;