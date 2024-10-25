create or replace TRIGGER TRG_ACTUALIZAR_USUARIO_JUNTA
AFTER UPDATE OF estado ON SOLICITUDES_UNION_JUNTA
FOR EACH ROW
BEGIN
    IF :NEW.estado = 'Aprobado' THEN
        UPDATE USUARIO
        SET 
        id_junta = :NEW.id_junta,
        id_rol = 2
        WHERE id_usuario = :NEW.id_usuario;
    END IF;
END TRG_ACTUALIZAR_USUARIO_JUNTA;