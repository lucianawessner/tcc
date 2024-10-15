import { BaseEntity } from "../base-entity.models";
import { Formulario } from "../formulario/formulario.models";

export class Progresso extends BaseEntity {
  visualizacao: boolean = false;
  aceito: boolean = false;
  contato: boolean = false;
  idFormulario: number = 0;
  formulario: Formulario = new Formulario();
}
