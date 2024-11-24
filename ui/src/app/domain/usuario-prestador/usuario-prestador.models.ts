import { Documento } from './../documento/documento.models';
import { BaseEntity } from "../base-entity.models";
import { Progresso } from '../progresso/progresso.models';

export class Prestador extends BaseEntity {
    Usuario: string = '';
    Senha: string = '';
    Email: string = '';
    Descricao: string | null = null;
    Localizacao: string | null = null;
    Cargo: string | null = null;
    Experiencia: string | null = null;
    IdDocumento: number | null = null;
    Documento: Documento | null = null;
}

export class PrestadorDto {
    Usuario: string = '';
    Descricao: string | null = null;
    IdFormularioPrestador: number = 0;
    IdProgresso: number = 0;
    Progresso: Progresso = new Progresso();

    constructor(init?: Partial<PrestadorDto>) {
        Object.assign(this, init);
    }
}