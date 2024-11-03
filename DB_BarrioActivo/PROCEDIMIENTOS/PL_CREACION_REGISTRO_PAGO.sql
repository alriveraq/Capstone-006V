CREATE OR REPLACE PROCEDURE PL_CREACION_REGISTRO_PAGO (
    u_id_pagos IN NUMBER,
    u_id_usuario IN NUMBER,
    u_monto IN NUMBER,
    u_imagen_transferencia IN BLOB,
    u_error_code OUT VARCHAR2,
    u_mensaje OUT VARCHAR2,
    p_id_registro_pago OUT NUMBER
) IS 
BEGIN 
    -- Validaciones
    IF u_id_pagos IS NULL THEN
        u_error_code := 'PL_RP_01';
        u_mensaje := 'El ID DE PAGO no puede ser nulo.';
        RETURN;
    END IF;

    IF u_id_usuario IS NULL THEN
        u_error_code := 'PL_RP_02';
        u_mensaje := 'El ID DE USUARIO no puede ser nulo.';
        RETURN;
    END IF;

    IF u_monto IS NULL OR u_monto <= 0 THEN
        u_error_code := 'PL_RP_03';
        u_mensaje := 'El MONTO debe ser un valor positivo.';
        RETURN;
    END IF;

    -- Inserción del registro en la tabla REGISTROS_PAGOS
    INSERT INTO REGISTROS_PAGOS (
        id_registos_pago,
        id_pagos,
        id_usuario,
        monto,
        estado_pago,
        imagen_transferencia,
        fecha_pago
    ) VALUES (
        id_sequence.NEXTVAL,  -- Asegúrate de tener una secuencia creada para id_registos_pago
        u_id_pagos,
        u_id_usuario,
        u_monto,
        'Comprobando',  -- Estado inicial por defecto
        u_imagen_transferencia,
        SYSDATE
    )
    RETURNING id_registos_pago INTO p_id_registro_pago;  -- Obtener el ID del nuevo registro

    COMMIT;

    u_error_code := NULL; 
    u_mensaje := 'Registro de pago creado correctamente.';

EXCEPTION
    WHEN OTHERS THEN
        u_error_code := 'PL_RP_04';
        u_mensaje := 'Error al registrar el pago: ' || SQLERRM;
        ROLLBACK;
END PL_CREACION_REGISTRO_PAGO;
