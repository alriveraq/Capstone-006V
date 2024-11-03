CREATE OR REPLACE PROCEDURE PL_CREACION_PUBLICACION (
    u_titular IN VARCHAR2,
    u_contenido IN VARCHAR2,
    u_imagen IN BLOB,
    u_id_usuario IN NUMBER,
    u_id_junta IN NUMBER,
    enviar_correo IN NUMBER,
    u_mensaje OUT VARCHAR2,
    u_error_code OUT VARCHAR2,
    p_id_publicacion OUT NUMBER
) IS 
    v_count NUMBER;
    
BEGIN 
    IF u_titular IS NULL OR TRIM(u_titular) = '' THEN
        u_error_code := 'PL_CP_01';
        u_mensaje := 'El TITULAR no puede estar vacio.';
        RETURN;
    END IF;
    
    IF u_contenido IS NULL OR TRIM(u_contenido) = '' THEN
        u_error_code := 'PL_CP_02';
        u_mensaje := 'El CONTENIDO no puede estar vacio.';
        RETURN;
    END IF;

    INSERT INTO PUBLICACIONES (
        id_publicaciones,
        p_titular,
        contenido,
        fecha_publicacion,
        fecha_creacion,
        enviar_correo,
        id_usuario,
        id_junta,
        imagen  
    ) VALUES (
        id_sequence.NEXTVAL,
        u_titular,
        u_contenido,
        SYSDATE,
        SYSDATE,
        enviar_correo,
        u_id_usuario,
        u_id_junta,
        u_imagen
    )
    RETURNING id_publicaciones INTO p_id_publicacion;
    
    COMMIT;

    u_error_code := NULL; 
    u_mensaje := 'Publicacion registrada correctamente.';

EXCEPTION
    WHEN OTHERS THEN
        u_error_code := 'PL_CP_03';
        u_mensaje := 'Error en la publicacion: ' || SQLERRM;
        ROLLBACK;
END PL_CREACION_PUBLICACION;
