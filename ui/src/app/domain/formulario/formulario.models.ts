import { BaseEntity } from "../base-entity.models";
import { Prestador } from "../usuario-prestador/usuario-prestador.models";

export class Formulario extends BaseEntity{
  idUsuario: number = "";
  idServico: number = "";
}
