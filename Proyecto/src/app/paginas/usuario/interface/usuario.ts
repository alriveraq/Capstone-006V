export class Usuarioo {
    nombre: string;
    a_paterno: string;
    a_materno: string;
    email : string;
    tipo_casa: string;
    rut: string;
    integrantes: number;
    adultos_mayores: number;
    fecha_creacion: Date;



 

    constructor(obj: any) {
        this.rut = obj && obj.rut || null;
        this.nombre = obj && obj.nombre || null;
        this.a_paterno = obj && obj.a_paterno || null;
        this.a_materno = obj && obj.a_materno || null;
        this.email = obj && obj.email || null;
        this.tipo_casa = obj && obj.tipo_casa || null;
        this.integrantes = obj && obj.integrantes || 0;
        this.adultos_mayores = obj && obj.adultos_mayores || 0;
        this.fecha_creacion = obj && obj.fecha_creacion || null;
    }
}