CREATE OR REPLACE PROCEDURE PL_REGISTRO_USUARIO (
    u_rut IN VARCHAR2,
    u_nombre IN VARCHAR2,
    u_a_paterno IN VARCHAR2,
    u_a_materno IN VARCHAR2,
    u_tipo_casa IN VARCHAR2,
    u_adultos_mayores IN NUMBER,
    u_integrantes IN NUMBER,
    u_email IN VARCHAR2,
    u_contrasena IN VARCHAR2,
    u_id_rol IN NUMBER,
    u_id_junta IN NUMBER,
    u_mensaje OUT VARCHAR2,
    u_error_code OUT VARCHAR2
) IS 
    v_count NUMBER;
BEGIN
    IF u_rut IS NULL OR TRIM(u_rut) = '' THEN
        u_error_code := 'PL_RU_01';
        u_mensaje := 'El campo del RUT no puede estar vacio.';
        RETURN;
    END IF;
    
    IF u_nombre IS NULL OR TRIM(u_nombre) = '' THEN
        u_error_code := 'PL_RU_02';
        u_mensaje := 'El campo del NOMBRE no puede estar vacio.';
        RETURN;
    END IF;
    
    IF u_a_paterno IS NULL OR TRIM(u_a_paterno) = '' THEN
        u_error_code := 'PL_RU_03';
        u_mensaje := 'El campo del APELLIDO PATERNO no puede estar vacio.';
        RETURN;
    END IF;
    
    IF u_a_materno IS NULL OR TRIM(u_a_materno) = '' THEN
        u_error_code := 'PL_RU_04';
        u_mensaje := 'El campo del APELLIDO MATERNO no puede estar vacio.';
        RETURN;
    END IF;
    
    IF u_tipo_casa IS NULL OR TRIM(u_tipo_casa) = '' THEN
        u_error_code := 'PL_RU_05';
        u_mensaje := 'El campo del TIPO DE CASA no puede estar vacio.';
        RETURN;
    END IF;
    
    IF u_adultos_mayores IS NULL THEN
        u_error_code := 'PL_RU_06';
        u_mensaje := 'La cantidad de ADULTOS MAYORES no puede estar vacio.';
        RETURN;
    END IF;
    
    IF u_integrantes IS NULL THEN
        u_error_code := 'PL_RU_07';
        u_mensaje := 'La cantidad de INTEGRANTES no puede estar vacio.';
        RETURN;
    END IF;
    
    IF u_email IS NULL OR TRIM(u_email) = '' THEN
        u_error_code := 'PL_RU_08';
        u_mensaje := 'El campo del CORREO no puede estar vacio.';
        RETURN;
    END IF;
    
    IF u_contrasena IS NULL OR TRIM(u_contrasena) = '' THEN
        u_error_code := 'PL_RU_09';
        u_mensaje := 'El campo de la CONTRASEÑA no puede estar vacio.';
        RETURN;
    END IF;
    
    BEGIN 
        SELECT COUNT(*) INTO v_count FROM USUARIO WHERE email = u_email;
        IF v_count > 0 THEN
            u_error_code := 'PL_RU_10';
            u_mensaje := 'El Correo ya se encuentra registrado.';
            RETURN;
        END IF;
        
        SELECT COUNT(*) INTO v_count FROM USUARIO WHERE rut = u_rut;
        IF v_count > 0 THEN
            u_error_code := 'PL_RU_11';
            u_mensaje := 'El RUT ya se encuentra registrado.';
            RETURN;
        END IF;
        
        INSERT INTO USUARIO (
            id_usuario,
            rut,
            nombre,
            a_paterno,
            a_materno,
            tipo_casa,
            integrantes,
            adultos_mayores,
            email,
            contrasena,
            id_rol,
            id_junta,
            fecha_creacion
        ) VALUES (
            id_sequence.NEXTVAL,
            u_rut,
            u_nombre,
            u_a_paterno,
            u_a_materno,
            u_tipo_casa,
            u_adultos_mayores,
            u_integrantes,
            u_email,
            u_contrasena,
            u_id_rol,
            u_id_junta,
            SYSDATE
        );
        
        COMMIT;
        u_error_code := NULL; 
        u_mensaje := 'Usuario registrado exitosamente.';
        
        EXCEPTION
    WHEN OTHERS THEN
        u_mensaje := 'Error al registrar el usuario: ' || SQLERRM;
        ROLLBACK;
    END;
END PL_REGISTRO_USUARIO;
/    