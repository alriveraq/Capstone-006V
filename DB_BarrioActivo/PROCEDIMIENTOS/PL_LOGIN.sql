CREATE OR REPLACE PROCEDURE PL_LOGIN (
    u_email IN VARCHAR2,
    u_contrasena IN VARCHAR2,
    u_mensaje OUT VARCHAR2,
    u_id_result OUT NUMBER,
    u_error_code OUT VARCHAR2
)IS
    v_contrasena VARCHAR2(50);
BEGIN
    IF u_email IS NULL OR TRIM(u_email) = '' THEN
        u_error_code := 'PL_LOG_01';
        u_mensaje := 'El campo del correo no puede estar vacio.';
        RETURN;
    END IF;
    
    IF u_contrasena IS NULL OR TRIM(u_contrasena) = '' THEN
        u_error_code := 'PL_LOG_02';
        u_mensaje := 'El campo de la contraseña no puede estar vacio.';
        RETURN;
    END IF;
    
    BEGIN 
        SELECT contrasena, id_usuario  INTO v_contrasena, u_id_result
        FROM USUARIO
        WHERE email = u_email;
    
        IF v_contrasena = u_contrasena THEN
            u_error_code := NULL;
            u_mensaje := 'Inicio de sesion exitoso.';
        ELSE
            u_error_code := 'PL_LOG_03';
            u_mensaje := 'Contraseña incorrecta';
        END IF;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            u_error_code := 'PL_LOG_04';
            u_mensaje := 'El correo no existe';
        WHEN OTHERS THEN
            u_error_code := 'PL_LOG_05';
            u_mensaje := 'Error al iniciar sesion' || SQLERRM;
    END;
END PL_LOGIN;


