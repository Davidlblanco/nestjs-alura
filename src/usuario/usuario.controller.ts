import { Body, Controller, Get, Post,Put,Param ,Delete} from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/criausuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid'
import { LitaUsuarioDTO } from "./dto/ListaUsuario.DTO";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

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
         return {message:'User created succesfully!', user: new LitaUsuarioDTO(
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
    @Put('/:id')
    async atualizaUsuario(@Param('id') id:string,@Body() novosDados:AtualizaUsuarioDTO){
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id,novosDados)
        return {
            user: new LitaUsuarioDTO(
                usuarioAtualizado.nome,
                usuarioAtualizado.id
             ),
            //  fullUser:usuarioAtualizado,
            message: 'User updated succesfully!'
        }
    }
    @Delete('/:id')
    async removeUsuario (@Param('id') id:string){
        const usuarioRemovido = await this.usuarioRepository.remove(id);
        return {
            user:new LitaUsuarioDTO(
                usuarioRemovido.nome,
                usuarioRemovido.id
             ),
             message: 'User succesfuly removed!'
        }
    }
}