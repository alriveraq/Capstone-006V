CREATE OR REPLACE PROCEDURE PL_ACTUALIZAR_SOLICITUD_DE_SEDE (
    u_id_solicitud IN NUMBER,
    u_estado IN VARCHAR2,
    u_mensaje OUT VARCHAR2,
    u_error_code OUT VARCHAR2
) IS
    v_count NUMBER;

BEGIN
    IF u_id_solicitud IS NULL THEN
        u_error_code := 'PL_ASD_01'; 
        u_mensaje := 'El ID de la solicitud no puede estar vacío.';
        RETURN;
    END IF;

    IF u_estado IS NULL OR TRIM(u_estado) = '' THEN
        u_error_code := 'PL_ASD_02';
        u_mensaje := 'El campo de ESTADO no puede estar vacío.';
        RETURN;
    END IF;

    UPDATE solicitudes_sedes
    SET estado = u_estado
    WHERE id_solicitud = u_id_solicitud;

    v_count := SQL%ROWCOUNT;
    IF v_count = 0 THEN
        u_error_code := 'PL_ASD_03'; 
        u_mensaje := 'No se encontró la solicitud con el ID especificado.';
        RETURN;
    END IF;

    COMMIT;

    u_error_code := NULL; 
    u_mensaje := 'Estado del pago se ha actualizado correctamente.';

EXCEPTION
    WHEN OTHERS THEN
        u_error_code := 'PL_ASD_99';
        u_mensaje := 'Error al actualizar la solicitud: ' || SQLERRM;
        ROLLBACK; 
END PL_ACTUALIZAR_SOLICITUD_DE_SEDE;
