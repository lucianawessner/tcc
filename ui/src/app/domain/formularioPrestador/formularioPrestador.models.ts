import { BaseEntity } from "../base-entity.models";
import { Vaga } from "../vaga/vaga.models";
import { Prestador } from "../usuario-prestador/usuario-prestador.models";

export class FormularioPrestador extends BaseEntity{
  idUsuarioPrestador: number = 0;
  idVaga: number = 0;
  prestador: Prestador = new Prestador();
  vaga: Vaga = new Vaga();
}
