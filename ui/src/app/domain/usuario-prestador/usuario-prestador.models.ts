import { Documento } from './../documento/documento.models';
import { BaseEntity } from "../base-entity.models";
import { Progresso } from '../progresso/progresso.models';
import { Avaliacao } from '../avaliacao/avaliacao.models';

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
    Avaliacao: Avaliacao[] = [];
}

export class PrestadorDto {
    IdPrestador: number = 0;
    Usuario: string = '';
    Descricao: string | null = null;
    Cargo: string | null = null;
    Email: string | null = null;
    IdFormularioPrestador: number = 0;
    IdProgresso: number = 0;
    Progresso: Progresso = new Progresso();
    Avaliada: boolean = false;

    constructor(init?: Partial<PrestadorDto>) {
        Object.assign(this, init);
    }
}
