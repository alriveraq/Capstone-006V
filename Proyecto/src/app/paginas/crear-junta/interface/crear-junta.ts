export class Junta {
    id_junta: number;
    nombre_barrio: string;
    direccion : string;
    fecha_fundacion : Date;
    j_nombre_presidente : string;
    j_telefono_contacto : number;
    j_email_contacto : number;
    fecha_creacion : Date;


 

    constructor(obj: any) {
        this.id_junta = obj && obj.id_junta || null;
        this.nombre_barrio = obj && obj.nombre_barrio || null;
        this.direccion = obj && obj.direccion || null;
        this.fecha_fundacion = obj && obj.fecha_fundacion || null;
        this.j_nombre_presidente = obj && obj.j_nombre_presidente || null;
        this.j_telefono_contacto = obj && obj.j_telefono_contacto || null;
        this.j_email_contacto = obj && obj.j_email_contacto || null;
        this.fecha_creacion = obj && obj.fecha_creacion || null;
    }
}