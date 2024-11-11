import { BaseEntity } from "../base-entity.models";

export class Documento extends BaseEntity {
    Nome: string = '';
    Tipo: string = '';
    Caminho: string = '';
}
