import { BaseEntity } from "../base-entity.models";
import { FormularioPrestador } from "../formularioPrestador/formularioPrestador.models";

export class Progresso extends BaseEntity {
  visualizacao: boolean = false;
  aceito: boolean = false;
  contato: boolean = false;
  idFormularioPrestador: number = 0;
  formularioPrestador: FormularioPrestador = new FormularioPrestador();
}
