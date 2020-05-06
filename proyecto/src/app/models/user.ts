export class User {
    codigo: number;
    nombre: string;
    correo: string;
    fecha_nacimiento: string;
    direccion: string;
    codigo_tipousuario: number
    pass: string;

    AgregarDatos(dato:any):void {
        this.codigo = 0;
        this.nombre = dato['nombre'];
        this.correo = dato['correo'];
        this.fecha_nacimiento = dato['fecha'];
        this.direccion = dato['dir'];
        this.codigo_tipousuario = dato['tipo'];
        this.pass = dato['pass'];
    }
}