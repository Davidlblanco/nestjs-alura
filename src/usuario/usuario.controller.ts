import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/criausuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid'
import { LitaUsuarioDTO } from "./dto/ListaUsuario.DTO";

@Controller('/usuarios')
export class UsuarioController{
    // private usuarioRepository = new UsuarioRepository()
    constructor(private usuarioRepository:UsuarioRepository){}
    @Post()
    async criaUsuario(@Body() dadosDoUsuario:CriaUsuarioDTO){
        const usuarioEntity = new UsuarioEntity()
        usuarioEntity.nome =  dadosDoUsuario.nome
        usuarioEntity.email =  dadosDoUsuario.email
        usuarioEntity.senha =  dadosDoUsuario.senha
        usuarioEntity.id =  uuid()
         this.usuarioRepository.salvar(usuarioEntity)
         return {message:'User created succesfully!', usuario: new LitaUsuarioDTO(
            usuarioEntity.nome,
            usuarioEntity.id
         )}
    }
    @Get()
    async listUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar()

        const usuariosLista = usuariosSalvos.map(user => new LitaUsuarioDTO(
            user.nome,
            user.id
        ))
        return usuariosLista
    }
}