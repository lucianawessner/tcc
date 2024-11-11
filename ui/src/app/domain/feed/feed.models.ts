import { Documento } from './../documento/documento.models';
import { BaseEntity } from "../base-entity.models";
import { Prestador } from "../usuario-prestador/usuario-prestador.models";

export class Feed extends BaseEntity{
  Texto: string = "";
  IdDocumento: number | null = null;
  QuantidadeCurtida: number = 0;
  IdUsuarioPrestador: number = 0;
  Documento: Documento | null = null;
  UsuarioPrestador: Prestador = new Prestador();
}

