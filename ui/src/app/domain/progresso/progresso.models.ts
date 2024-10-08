import { BaseEntity } from "../base-entity.models";
import { Formulario } from "../formulario/formulario.models";

export class Progresso extends BaseEntity {
  visualizacao: boolean = "";
  aceito: boolean = "";
  contato: boolean = "";
  idFormulario: number = "";
}
