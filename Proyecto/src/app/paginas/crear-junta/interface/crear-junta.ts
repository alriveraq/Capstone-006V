export class Junta {
    id_junta: number;
    id_presidente: number;
    nombre_barrio: string;
    direccion : string;
    fecha_fundacion : Date;
    fecha_creacion : Date;


 

    constructor(obj: any) {
        this.id_junta = obj && obj.id_junta || null;
        this.id_presidente = obj && obj.id_presidente || null;
        this.nombre_barrio = obj && obj.nombre_barrio || null;
        this.direccion = obj && obj.direccion || null;
        this.fecha_fundacion = obj && obj.fecha_fundacion || null;
        this.fecha_creacion = obj && obj.fecha_creacion || null;
    }
}