import  {ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from  '@angular/material/input' ;
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { provideNativeDateAdapter} from '@angular/material/core';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { UsuarioDto } from '../../domain/login/usuario.dto';
import { CredentialsService } from '../login/service/credentials.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { UsuarioPrestadorEndpoint } from '../../domain/usuario-prestador/usuario-prestador.endpoint';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UsuarioContratanteEndpoint } from '../../domain/usuario-contratante/usuario-contrante.endpoint';
import Swal from 'sweetalert2';
import { AvaliacaoEndpoint } from '../../domain/avaliacao/avaliacao.endpoint';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    JsonPipe
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
})
export class EditarPerfilComponent {

  private readonly destroy$ : Subject<any> = new Subject();

  public mainForm: FormGroup = new FormGroup({});
  public usuario: UsuarioDto = new UsuarioDto();
  public mediaAvaliacao: number = 0;
  mediaAvaliacao$!: Observable<number>;

  private credentialsService: CredentialsService = inject(CredentialsService);
  private prestadorEndpoint: UsuarioPrestadorEndpoint = inject(UsuarioPrestadorEndpoint);
  private contratanteEndpoint: UsuarioContratanteEndpoint = inject(UsuarioContratanteEndpoint);
  private avaliacaoEndpoint: AvaliacaoEndpoint = inject(AvaliacaoEndpoint);

  public ngOnInit(): void {
    this.usuario = this.credentialsService.credentials!;

    this.mediaAvaliacao$ = this.avaliacaoEndpoint.buscarMedia(this.usuario.Usuario);

    this.criarFormulario();

    if(this.usuario.TipoUsuario === 1) {
      this.buscarPrestador(this.usuario.Id);
    } else {
      this.buscarContratante(this.usuario.Id);
    }
  }

  buscarPrestador(id: number) {
    this.prestadorEndpoint.pegarUsuarioPorId(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((dados) => {
      this.preencherFormulario(dados.value[0])
    })
  }

  buscarContratante(id: number) {
    this.contratanteEndpoint.pegarUsuarioPorId(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((dados) => {
      this.preencherFormulario(dados.value[0])
    })
  }

  public salvar() {
    if(this.usuario.TipoUsuario === 1) {
      this.atualizarPrestador();
    } else {
      this.atualizarContratante();
    }
  }

  public atualizarPrestador(){
    this.prestadorEndpoint.atualizarPrestador(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
    .subscribe(resposta => {
      if(resposta) {
        Swal.fire({
          title: 'Atenção!',
          text: 'Cadastro atualizado com sucesso',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
    })
  }

  public atualizarContratante(){
    this.contratanteEndpoint.atualizarContratante(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
    .subscribe(resposta => {
      if(resposta) {
        Swal.fire({
          title: 'Atenção!',
          text: 'Cadastro atualizado com sucesso',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
    })
  }

  bodyBuilder() {
    return {...this.mainForm.value}
  }

  public preencherFormulario(entity: any) {
    this.mainForm.patchValue({
      "id": entity.Id,
      "email": entity.Email,
      "senha": entity.Senha,
      "usuario": entity.Usuario,
      "nome": entity.Nome,
      "cargo": entity.Cargo,
      "localizacao": entity.Localizacao,
      "dataNascimento": entity.DataNascimento,
      "descricao": entity.Descricao,
      "experiencia": entity.Experiencia
    });
  }

  public criarFormulario() {
    this.mainForm.addControl("id", new FormControl('', [Validators.required]));
    this.mainForm.addControl("email", new FormControl('', [Validators.required]));
    this.mainForm.addControl("senha", new FormControl('', [Validators.required]));
    this.mainForm.addControl("usuario", new FormControl('', [Validators.required]));
    this.mainForm.addControl("nome", new FormControl('', [Validators.required]));
    this.mainForm.addControl("cargo", new FormControl(null, [Validators.required]));
    this.mainForm.addControl("localizacao", new FormControl('', [Validators.required]));
    this.mainForm.addControl("dataNascimento", new FormControl(null, []));
    this.mainForm.addControl("descricao", new FormControl(null, []));
    this.mainForm.addControl("experiencia", new FormControl(null, []));
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

}
