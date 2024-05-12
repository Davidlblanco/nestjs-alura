import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

import { EmailUnico } from "../validacao/email-unico.validator";

export class CriaUsuarioDTO{
    // @IsNotEmpty({message: 'custom messages could be done this way'})
    @IsNotEmpty()
    nome:string;
    
    // @IsNotEmpty(undefined, {message: 'custom messages could be done this way'})
    @IsEmail()
    @EmailUnico({message:'Email adress is already registred!'})
    email:string;
    
    // @IsNotEmpty(6, {message: 'custom messages could be done this way'})
    @MinLength(6)
    senha:string;
}