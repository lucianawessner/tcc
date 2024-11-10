import { Documento } from './../documento/documento.models';
import { BaseEntity } from "../base-entity.models";

export class Contratante extends BaseEntity {
    usuario: string = '';
    senha: string = '';
    email: string = "";
    descricao: string | null = null;
    localizacao: string | null = null;
    cargo: string | null = null;
    dataNascimento: Date | null = null;
    experiencia: string | null = null;
    idDocumento: number | null = null;
    Documento: Documento | null = null;
}
