import { Body, Controller, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";

@Controller('/usuarios')
export class UsuarioController{
    private usuarioRepository = new UsuarioRepository()
    @Post()
    async criaUsuario(@Body() dadosDoUsuario){
        return this.usuarioRepository.salvar(dadosDoUsuario)
    }
}