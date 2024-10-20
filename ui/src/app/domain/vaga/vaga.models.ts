import { BaseEntity } from "../base-entity.models";
import { Contratante } from "../usuario-contratante/usuario-contratante.models";

export class Vaga extends BaseEntity {
  cargo: string = "";
  localizacao: string = "";
  remuneracao: number = 0;
  descricao: string  = "";
  requisitos: string | null = null;
  prazo: Date = new Date();
  criacao: Date = new Date();
  fechamento: Date | null = null;
  idUsuarioContratante: number  = 0;
  contratante: Contratante = new Contratante();
}
