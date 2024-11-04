export class votacion {
    id_junta: number;
    id_usuario: number;
    tema: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    enviarCorreo: boolean;

    constructor(obj: any) {
        this.id_junta = obj && obj.id_junta || null;
        this.id_usuario = obj && obj.id_usuario || null;
        this.tema = obj && obj.tema || null;
        this.fecha_inicio = obj && obj.fecha_inicio || null;
        this.fecha_fin = obj && obj.fecha_fin || null;
        this.enviarCorreo = obj && obj.enviarCorreo || false;
    }
}
