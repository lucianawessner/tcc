import { BaseEntity } from "../base-entity.models";
import { Vaga } from "../vaga/vaga.models";
import { Prestador } from "../usuario-prestador/usuario-prestador.models";
import { Progresso } from "../progresso/progresso.models";

export class FormularioPrestador extends BaseEntity{
  IdUsuarioPrestador: number = 0;
  IdVaga: number = 0;
  UsuarioPrestador: Prestador = new Prestador();
  Vaga: Vaga = new Vaga();
  Progresso: Progresso[] = [];
}
