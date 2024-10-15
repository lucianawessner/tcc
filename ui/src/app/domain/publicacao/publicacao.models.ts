import { BaseEntity } from "../base-entity.models";
import { Arquivos } from "../arquivos/arquivos.models";
import { Prestador } from "../usuario-prestador/usuario-prestador.models";

export class Publicacao extends BaseEntity{
  texto: string = "";
  quantidadeCurtida: number = 0;
  idArquivo: number | null = null;
  idUsuario: number = 0;
  arquivo: Arquivos | null = null;
  prestador: Prestador = new Prestador();
}

