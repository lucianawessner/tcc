import { BaseEntity } from "../base-entity.models";

export class Arquivos extends BaseEntity {
    nome: string = '';
    tipo: string = '';
    caminho: string = '';
}
