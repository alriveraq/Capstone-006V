CREATE OR REPLACE PROCEDURE PL_ACTUALIZAR_ESTADO_SOLICITUD_UNION_JUNTA (
    p_id_solicitud_union IN NUMBER,
    p_estado IN VARCHAR2,
    u_mensaje OUT VARCHAR2,
    u_error_code OUT VARCHAR2
) IS
    v_count NUMBER;

BEGIN
    IF p_id_solicitud_union IS NULL THEN
        u_error_code := 'PL_AUS_01'; 
        u_mensaje := 'El ID de la solicitud no puede estar vacío.';
        RETURN;
    END IF;

    IF p_estado IS NULL OR TRIM(p_estado) = '' THEN
        u_error_code := 'PL_AUS_02';
        u_mensaje := 'El campo de ESTADO no puede estar vacío.';
        RETURN;
    END IF;

    UPDATE SOLICITUDES_UNION_JUNTA
    SET estado = p_estado
    WHERE ID_SOLICITUD_UNION = p_id_solicitud_union;

    v_count := SQL%ROWCOUNT;
    IF v_count = 0 THEN
        u_error_code := 'PL_AUS_03'; 
        u_mensaje := 'No se encontró la solicitud con el ID especificado.';
        RETURN;
    END IF;

    COMMIT;

    u_error_code := NULL; 
    u_mensaje := 'Estado de la solicitud actualizado correctamente.';

EXCEPTION
    WHEN OTHERS THEN
        u_error_code := 'PL_AUS_99';
        u_mensaje := 'Error al actualizar la solicitud: ' || SQLERRM;
        ROLLBACK; 
END PL_ACTUALIZAR_ESTADO_SOLICITUD_UNION_JUNTA;
