import { BaseEntity } from "../base-entity.models";
import { Prestador } from "../usuario-prestador/usuario-prestador.models";
import { Contratante } from "../usuario-contratante/usuario-contratante.models";

export class Avaliacao extends BaseEntity {
  Estrelas: number = 0;
  IdPrestador: number | null = null;
  IdContratante: number | null = null;
  Prestador: Prestador | null = null;
  Contratante: Contratante | null = null;
}
