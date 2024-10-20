import { Documento } from './../documento/documento.models';
import { BaseEntity } from "../base-entity.models";
import { Prestador } from "../usuario-prestador/usuario-prestador.models";

export class Feed extends BaseEntity{
  texto: string = "";
  idDocumento: number | null = null;
  quantidadeCurtida: number = 0;
  idUsuarioPrestador: number = 0;
  Documento: Documento | null = null;
  prestador: Prestador = new Prestador();
}

