CREATE OR REPLACE PROCEDURE PL_ACTUALIZAR_REGISTRO_DE_PAGO (
    u_id_registos_pago IN NUMBER,
    u_estado_pago IN VARCHAR2,
    u_mensaje OUT VARCHAR2,
    u_error_code OUT VARCHAR2
) IS
    v_count NUMBER;

BEGIN
    IF u_id_registos_pago IS NULL THEN
        u_error_code := 'PL_ARP_01'; 
        u_mensaje := 'El ID de la solicitud no puede estar vacío.';
        RETURN;
    END IF;

    IF u_estado_pago IS NULL OR TRIM(u_estado_pago) = '' THEN
        u_error_code := 'PL_ARP_02';
        u_mensaje := 'El campo de ESTADO no puede estar vacío.';
        RETURN;
    END IF;

    UPDATE REGISTROS_PAGOS
    SET ESTADO_PAGO = u_estado_pago
    WHERE id_registos_pago = u_id_registos_pago;

    v_count := SQL%ROWCOUNT;
    IF v_count = 0 THEN
        u_error_code := 'PL_ARP_03'; 
        u_mensaje := 'No se encontró la solicitud con el ID especificado.';
        RETURN;
    END IF;

    COMMIT;

    u_error_code := NULL; 
    u_mensaje := 'Estado del pago se ha actualizado correctamente.';

EXCEPTION
    WHEN OTHERS THEN
        u_error_code := 'PL_ARP_99';
        u_mensaje := 'Error al actualizar la solicitud: ' || SQLERRM;
        ROLLBACK; 
END PL_ACTUALIZAR_REGISTRO_DE_PAGO;
