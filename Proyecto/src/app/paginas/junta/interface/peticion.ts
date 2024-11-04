export class peticion {
    id_junta: number;
    id_usuario: number;
    tipo_solicitud: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    descripcion: string;

    constructor(obj: any) {
        this.id_junta = obj && obj.id_junta || null;
        this.id_usuario = obj && obj.id_usuario || null;
        this.tipo_solicitud = obj && obj.tipo_solicitud || null;
        this.fecha_inicio = obj && obj.fecha_inicio || null;
        this.fecha_fin = obj && obj.fecha_fin || null;
        this.descripcion = obj && obj.descripcion || false;
    }
}
