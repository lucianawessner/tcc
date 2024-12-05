import { Documento } from './../documento/documento.models';
import { BaseEntity } from "../base-entity.models";
import { Prestador } from "../usuario-prestador/usuario-prestador.models";

export class Feed {
  Id: number = 0;
  Texto: string = "";
  IdDocumento: number | null = null;
  QuantidadeCurtida: number = 0;
  DataCriacao: Date = new Date();
  IdUsuarioPrestador: number = 0;
  Documento: Documento | null = null;
  UsuarioPrestador: Prestador = new Prestador();

  constructor(init?: Partial<Feed>) {
    Object.assign(this, init);
}
}

