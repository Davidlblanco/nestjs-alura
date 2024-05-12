import { Injectable } from "@nestjs/common"
import { UsuarioEntity } from "./usuario.entity"

@Injectable()
export class UsuarioRepository {
    private usuarios:UsuarioEntity[] = []

    async salvar(usuario:UsuarioEntity){
        this.usuarios.push(usuario)
    }
    async listar(){
        return this.usuarios
    }
    async existeEmail(email:string){
        const possivelUsuario = this.usuarios.find(item => item.email === email)
        return possivelUsuario != undefined
    }
}