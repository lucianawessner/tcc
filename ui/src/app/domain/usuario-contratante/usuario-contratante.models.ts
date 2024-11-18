import { Documento } from './../documento/documento.models';
import { BaseEntity } from "../base-entity.models";

export class Contratante extends BaseEntity {
    Usuario: string = '';
    Senha: string = '';
    Email: string = "";
    Descricao: string | null = null;
    Localizacao: string | null = null;
    Cargo: string | null = null;
    DataNascimento: Date | null = null;
    Experiencia: string | null = null;
    IdDocumento: number | null = null;
    Documento: Documento | null = null;
}
