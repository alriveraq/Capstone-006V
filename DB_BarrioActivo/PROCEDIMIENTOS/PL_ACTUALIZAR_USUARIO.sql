CREATE OR REPLACE PROCEDURE PL_ACTUALIZAR_USUARIO (
    u_id_usuario IN NUMBER,
    u_rut IN VARCHAR2, 
    u_nombre IN VARCHAR2,
    u_a_paterno IN VARCHAR2,
    u_a_materno IN VARCHAR2,
    u_tipo_casa IN VARCHAR2,
    u_integrantes IN NUMBER,
    u_adultos_mayores IN NUMBER,
    u_email IN VARCHAR2,
    u_contrasena IN VARCHAR2,
    u_mensaje OUT VARCHAR2,
    u_error_code OUT VARCHAR2
)IS 
    v_contrasena_nueva VARCHAR2(50);
    v_count NUMBER;
    
BEGIN
    SELECT COUNT() INTO v_count
    FROM USUARIO
    WHERE id_usuario = u_id_usuario;
    
    IF v_count = 0 THEN
        u_error_code = 'PL_AU_01';
        u_mensaje = 'Usuario no encontrado';
        RETURN;
    END IF;
    
    SELECT CONTRASENA INTO v_contrasena_nueva
    FROM USUARIO
    WHERE id_usuario = u_id_usuario;
    
    IF u_contrasena = v_contrasena_nueva THEN
        u_error_code = 'PL_AU_02';
        u_mensaje = 'Las contraseña no debe ser igual a la antigua';
        RETURN;
    END IF;
    
    IF u_contrasena IS NULL OR TRIM(u_contrasena) = '' THEN
         u_error_code = 'PL_AU_04';
        u_mensaje = 'La contraseña no debe quedar vacia';
        RETURN;
    END IF;
    
    UPDATE USUARIO
    SET nombre = u_nombre,
        A_PATERNO = u_a_paterno,
        A_MATERNO = u_a_materno,
        TIPO_CASA = u_tipo_casa,
        INTEGRANTES = u_integrantes,
        ADULTOS_MAYORES = u_adultos_mayores,
        EMAIL = u_email,
        CONTRASENA = u_contrasena
    WHERE id_usuario = u_id_usuario;
    
    COMMIT;
    u_error_code = 'NULL';
    u_mensaje = 'Datos del usuario actualizados correctamente';
EXCEPTION
    WHEN OTHERS THEN
        u_error_code = 'PL_AU_03';
        u_mensaje = 'Error al actualizar los datos '  SQLERRM;
        ROLLBACK;
END PL_ACTUALIZAR_USUARIO;