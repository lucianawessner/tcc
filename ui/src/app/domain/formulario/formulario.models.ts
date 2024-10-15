import { BaseEntity } from "../base-entity.models";
import { Servico } from "../servico/servico.models";
import { Prestador } from "../usuario-prestador/usuario-prestador.models";

export class Formulario extends BaseEntity{
  idUsuario: number = 0;
  idServico: number = 0;
  prestador: Prestador = new Prestador();
  servico: Servico = new Servico();
}
