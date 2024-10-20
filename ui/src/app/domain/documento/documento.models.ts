import { BaseEntity } from "../base-entity.models";

export class Documento extends BaseEntity {
    nome: string = '';
    tipo: string = '';
    caminho: string = '';
}
