export class publicaciones {
    id_junta: number;
    id_usuario: number;
    titulo: string;
    contenido: string;
    imagen: string;
    enviarCorreo: boolean; // Nuevo campo para enviar copia al correo

    constructor(obj: any) {
        this.id_junta = obj && obj.id_junta || null; // Corregido id_jutna a id_junta
        this.id_usuario = obj && obj.id_usuario || null;
        this.titulo = obj && obj.titulo || null;
        this.contenido = obj && obj.contenido || null;
        this.imagen = obj && obj.imagen || null;
        this.enviarCorreo = obj && obj.enviarCorreo || false; // Inicializar el nuevo campo
    }
}
