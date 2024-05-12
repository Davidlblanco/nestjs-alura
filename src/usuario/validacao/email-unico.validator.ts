import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

import { ValidationOptions, registerDecorator } from "class-validator";
@Injectable()
@ValidatorConstraint({async:true})
export class EmailUnicoValidator implements ValidatorConstraintInterface{
    constructor( private usuarioRepository:UsuarioRepository){
        
    }
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioExiste = await this.usuarioRepository.existeEmail(value)
        return !usuarioExiste
     
    }

}
export const EmailUnico = (opcoesDeValidação:ValidationOptions) => {
    return (objeto:Object,propriedade:string)=>{
        registerDecorator({
            target: objeto.constructor,
            propertyName:propriedade,
            options:opcoesDeValidação,
            constraints:[],
            validator:EmailUnicoValidator

        })
    }
}