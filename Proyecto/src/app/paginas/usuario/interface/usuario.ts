export class Usuarioo {
    rut: string;
    nombre: string;
    a_paterno: string;
    a_materno: string;
    tipo_casa: string;
    integrantes: number;
    adultos_mayores: number;



 

    constructor(obj: any) {
        this.rut = obj && obj.rut || null;
        this.nombre = obj && obj.nombre || null;
        this.a_paterno = obj && obj.a_paterno || null;
        this.a_materno = obj && obj.a_materno || null;
        this.tipo_casa = obj && obj.tipo_casa || null;
        this.integrantes = obj && obj.integrantes || null;
        this.adultos_mayores = obj && obj.adultos_mayores || null;
    }
}