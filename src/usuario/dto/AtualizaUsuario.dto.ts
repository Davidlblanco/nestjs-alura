import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

import { EmailUnico } from "../validacao/email-unico.validator";

export class AtualizaUsuarioDTO{
    // @IsNotEmpty({message: 'custom messages could be done this way'})
    @IsNotEmpty()
    @IsOptional()
    nome:string;
    
    // @IsNotEmpty(undefined, {message: 'custom messages could be done this way'})
    @IsEmail()
    @EmailUnico({message:'Email adress is already registred!'})
    @IsOptional()
    email:string;
    
    // @IsNotEmpty(6, {message: 'custom messages could be done this way'})
    @MinLength(6)
    @IsOptional()
    senha:string;
}