import { Arquivos } from "../arquivos/arquivos.models";
import { BaseEntity } from "../base-entity.models";

export class Prestador extends BaseEntity {
    usuario: string = '';
    senha: string = '';
    email: string = '';
    descricao: string | null = null;
    localizacao: string | null = null;
    cargo: string | null = null;
    qualificacao: string | null = null;
    idArquivo: number | null = null;
    arquivos: Arquivos | null = null;
}
