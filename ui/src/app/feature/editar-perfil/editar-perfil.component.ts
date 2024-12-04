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
  imagePreview: string = 'assets/4ca1ad0b-51d3-462d-a4d1-c90730312587.jpg';

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

  onFileSelected(event: any): void {
    const file = event.target.files[0] as File;
    if (file) {
      this.mainForm.patchValue({ "Foto": file });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  buscarPrestador(id: number) {
    this.prestadorEndpoint.pegarUsuarioPorId(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((dados) => {
      if(dados.value[0].Documento !== undefined) {
        this.imagePreview = `assets/${dados.value[0].Documento.Nome}`;
      }
      this.preencherFormulario(dados.value[0]);
    })
  }

  buscarContratante(id: number) {
    this.contratanteEndpoint.pegarUsuarioPorId(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((dados) => {
      console.log(dados.value[0].Documento)
      if(dados.value[0].Documento !== undefined) {
        this.imagePreview = `assets/${dados.value[0].Documento.Nome}`;
      }
      this.preencherFormulario(dados.value[0]);
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
      "Id": entity.Id,
      "Email": entity.Email,
      "Usuario": entity.Usuario,
      "Nome": entity.Nome,
      "Cargo": entity.Cargo,
      "Localizacao": entity.Localizacao,
      "DataNascimento": entity.DataNascimento,
      "Descricao": entity.Descricao,
      "Experiencia": entity.Experiencia
    });
  }

  public criarFormulario() {
    this.mainForm.addControl("Id", new FormControl('', [Validators.required]));
    this.mainForm.addControl("Email", new FormControl('', [Validators.required]));
    this.mainForm.addControl("Usuario", new FormControl('', [Validators.required]));
    this.mainForm.addControl("Nome", new FormControl('', [Validators.required]));
    this.mainForm.addControl("Cargo", new FormControl(null, [Validators.required]));
    this.mainForm.addControl("Localizacao", new FormControl('', [Validators.required]));
    this.mainForm.addControl("DataNascimento", new FormControl(null, []));
    this.mainForm.addControl("Descricao", new FormControl(null, []));
    this.mainForm.addControl("Experiencia", new FormControl(null, []));
    this.mainForm.addControl("Foto", new FormControl(null, []));
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
