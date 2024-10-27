export class reunion {
    id_junta: number;
    id_usuario: number;
    tema: string;
    resumen: string;
    u_fecha_reunion: string;

    constructor(obj: any) {
        this.id_junta = obj && obj.id_junta || null; // Corregido id_jutna a id_junta
        this.id_usuario = obj && obj.id_usuario || null;
        this.tema = obj && obj.tema || null;
        this.resumen = obj && obj.resumen || null;
        this.u_fecha_reunion = obj && obj.u_fecha_reunion || null;
    }
}
