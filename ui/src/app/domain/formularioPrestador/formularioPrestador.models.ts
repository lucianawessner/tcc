import { BaseEntity } from "../base-entity.models";
import { Vaga } from "../vaga/vaga.models";
import { Prestador } from "../usuario-prestador/usuario-prestador.models";

export class FormularioPrestador extends BaseEntity{
  IdUsuarioPrestador: number = 0;
  IdVaga: number = 0;
  Prestador: Prestador = new Prestador();
  Vaga: Vaga = new Vaga();
}
