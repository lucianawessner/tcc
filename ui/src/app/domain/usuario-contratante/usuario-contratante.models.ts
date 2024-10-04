import { Arquivos } from "../arquivos/arquivos.models";
import { BaseEntity } from "../base-entity.models";

export class Contratante extends BaseEntity {
    usuario: string = '';
    senha: string = '';
    descricao: string | null = null;
    localizacao: string | null = null;
    area: string | null = null;
    email: string | null = null;
    idArquivo: number | null = null;
    arquivos: Arquivos | null = null;
}
