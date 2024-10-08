import { BaseEntity } from "../base-entity.models";
import { Arquivos } from "../arquivos/arquivos.models";
import { Prestador } from "../usuario-prestador/usuario-prestador.models";

export class Publicacao extends BaseEntity{
  texto: string = "";
  idArquivo: number | null = null;
  quantidadeCurtida: number = "";
  idUsuario: number  = "";
}

