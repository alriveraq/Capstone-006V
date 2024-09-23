export class Usuario {
    id_usuario: number;
    rut: string;
    nombre: string;
    a_paterno: string;
    a_materno: string;
    tipo_casa: string;
    integrantes: number;
    adultos_mayores: number;
    email: string;
    contrasena: string;
    id_rol: number;
    id_junta: number;
    fecha_creacion : Date;

 

    constructor(obj: any) {
        this.id_usuario = obj && obj.id_usuario || null;
        this.rut = obj && obj.rut || null;
        this.nombre = obj && obj.nombre || null;
        this.a_paterno = obj && obj.a_paterno || null;
        this.a_materno = obj && obj.a_materno || null;
        this.tipo_casa = obj && obj.tipo_casa || null;
        this.integrantes = obj && obj.integrantes || null;
        this.adultos_mayores = obj && obj.adultos_mayores || null;
        this.email = obj && obj.email || null;
        this.contrasena = obj && obj.contrasena || null;
        this.id_rol = obj && obj.id_rol || null;
        this.id_junta = obj && obj.id_junta || null;
        this.fecha_creacion = obj && obj.fecha_creacion || null;
    }
}