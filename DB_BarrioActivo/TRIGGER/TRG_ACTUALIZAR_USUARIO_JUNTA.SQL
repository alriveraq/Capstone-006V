create or replace NONEDITIONABLE TRIGGER trg_actualizar_usuario_junta
AFTER UPDATE OF estado ON SOLICITUDES_UNION_JUNTA
FOR EACH ROW
BEGIN
    IF :NEW.estado = 'Aprobado' THEN
        UPDATE USUARIO
        SET id_junta = :NEW.id_junta
        WHERE id_usuario = :NEW.id_usuario;
    END IF;
END trg_actualizar_usuario_junta;