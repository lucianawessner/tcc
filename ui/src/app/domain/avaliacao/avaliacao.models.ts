import { BaseEntity } from "../base-entity.models";
import { Prestador } from "../usuario-prestador/usuario-prestador.models";
import { Contratante } from "../usuario-contratante/usuario-contratante.models";

export class Avaliacao extends BaseEntity {
  estrelas: number = 0;
  idPrestador: number | null = null;
  idContratante: number | null = null;
  prestador: Prestador | null = null;
  contratante: Contratante | null = null;
}
