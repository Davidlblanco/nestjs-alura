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
    private buscaPorId = (id:string) =>{
        const possivelUsuario = this.usuarios.find(item => item.id === id) 
        if(!possivelUsuario) {throw new Error('User does not exist!')}
        return possivelUsuario
    }
    async atualiza(id:string,dadosDeAtualizacao:Partial<UsuarioEntity>){
        const usuario = this.buscaPorId(id)
            Object.entries(dadosDeAtualizacao).forEach(([chave,valor])=>{
                if(chave === id) return
                usuario[chave] = valor
            })
            return usuario
    }
    async remove(id:string){
        const usuario = this.buscaPorId(id)
        this.usuarios = this.usuarios.filter(item=>item.id!==id)
         return usuario
    }
}