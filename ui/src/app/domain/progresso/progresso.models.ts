import { BaseEntity } from "../base-entity.models";
import { FormularioPrestador } from "../formularioPrestador/formularioPrestador.models";

export class Progresso extends BaseEntity {
  Visualizacao: boolean = false;
  Aceito: boolean = false;
  Contato: boolean = false;
  IdFormularioPrestador: number = 0;
  FormularioPrestador: FormularioPrestador = new FormularioPrestador();
}
