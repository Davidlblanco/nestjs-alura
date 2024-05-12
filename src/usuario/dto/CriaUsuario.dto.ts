import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CriaUsuarioDTO{
    // @IsNotEmpty({message: 'custom messages could be done this way'})
    @IsNotEmpty()
    nome:string;
    
    // @IsNotEmpty(undefined, {message: 'custom messages could be done this way'})
    @IsEmail()
    email:string;
    
    // @IsNotEmpty(6, {message: 'custom messages could be done this way'})
    @MinLength(6)
    senha:string;
}