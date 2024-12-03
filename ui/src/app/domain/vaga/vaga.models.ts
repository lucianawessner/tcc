import { BaseEntity } from "../base-entity.models";
import { FormularioPrestador } from "../formularioPrestador/formularioPrestador.models";
import { Progresso } from "../progresso/progresso.models";
import { Contratante } from "../usuario-contratante/usuario-contratante.models";

export class Vaga extends BaseEntity {
  Cargo: string = "";
  Localizacao: string = "";
  Remuneracao: number = 0;
  Descricao: string  = "";
  Requisitos: string | null = null;
  Prazo: Date = new Date();
  Criacao: Date = new Date();
  Fechamento: Date | null = null;
  IdUsuarioContratante: number  = 0;
  Contratante: Contratante = new Contratante();
  FormularioPrestador: FormularioPrestador[] = [];
}

export class VagaDto {
  Cargo: string = "";
  Localizacao: string = "";
  Remuneracao: number = 0;
  Descricao: string  = "";
  Requisitos: string | null = null;
  Prazo: Date = new Date();
  Fechamento: Date | null = null;
  IdUsuarioContratante: number  = 0;
  Progresso: Progresso = new Progresso();
  Avaliada: boolean = false;

  constructor(init?: Partial<VagaDto>) {
    Object.assign(this, init);
  }
}
