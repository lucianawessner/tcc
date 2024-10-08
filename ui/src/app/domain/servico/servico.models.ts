import { BaseEntity } from "../base-entity.models";
import { Contratante } from "../usuario-contratante/usuario-contratante.models";

export class Servico extends BaseEntity {
  cargo: string = "";
  localizacao: string = "";
  remuneracao: number = "";
  descricao: string  = "";
  requisitos: string | null = null;
  prazo: Date  = "";
  criacao: Date  = "";
  idUsuario: number  = "";
  fechamento: Date | null = null;
}
