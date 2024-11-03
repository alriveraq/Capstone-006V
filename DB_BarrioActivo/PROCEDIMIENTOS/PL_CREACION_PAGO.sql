CREATE OR REPLACE PROCEDURE PL_CREACION_PAGO (
    u_concepto_pago IN VARCHAR2,
    u_monto IN NUMBER,
    u_id_junta IN NUMBER,
    u_error_code OUT VARCHAR2,
    u_mensaje OUT VARCHAR2,
    p_id_pago OUT NUMBER
) IS 
BEGIN 

    IF u_concepto_pago IS NULL OR TRIM(u_concepto_pago) = '' THEN
        u_error_code := 'PL_CP_01';
        u_mensaje := 'El CONCEPTO DE PAGO no puede estar vacío.';
        RETURN;
    END IF;

    IF u_monto IS NULL OR u_monto <= 0 THEN
        u_error_code := 'PL_CP_02';
        u_mensaje := 'El MONTO debe ser un valor positivo.';
        RETURN;
    END IF;

    IF u_id_junta IS NULL THEN
        u_error_code := 'PL_CP_03';
        u_mensaje := 'El ID DE JUNTA no puede ser nulo.';
        RETURN;
    END IF;

 
    INSERT INTO PAGOS (
        id_pagos,
        concepto_pago,
        monto,
        id_junta,
        fecha_creacion
    ) VALUES (
        id_sequence.NEXTVAL,
        u_concepto_pago,
        u_monto,
        u_id_junta,
        SYSDATE
    )
    RETURNING id_pagos INTO p_id_pago;

    COMMIT;

    u_error_code := NULL; 
    u_mensaje := 'Pago registrado correctamente.';

EXCEPTION
    WHEN OTHERS THEN
        u_error_code := 'PL_CP_04';
        u_mensaje := 'Error al registrar el pago: ' || SQLERRM;
        ROLLBACK;
END PL_CREACION_PAGO;
