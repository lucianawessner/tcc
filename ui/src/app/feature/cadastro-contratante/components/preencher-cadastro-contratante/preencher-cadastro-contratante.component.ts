import { UsuarioContratanteEndpoint } from './../../../../domain/usuario-contratante/usuario-contrante.endpoint';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, ViewEncapsulation} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from  '@angular/material/input' ;
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {  Subject, takeUntil} from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { provideNativeDateAdapter} from '@angular/material/core';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { Contratante } from '../../../../domain/usuario-contratante/usuario-contratante.models';
import { CommonModule } from '@angular/common';
import { UsuarioDocumentoDto } from '../../../../domain/usuario-prestador/usuario-documento.dto';

@Component({
  selector: 'app-preencher-cadastro-contratante',
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
  ],
  templateUrl: './preencher-cadastro-contratante.component.html',
  styleUrl: './preencher-cadastro-contratante.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
})
export class PreencherCadastroContratanteComponent implements OnInit {

  @Input('email') email: string = '';
  @Input('usuario') usuario: string = '';
  @Input('senha') senha: string = '';

  private readonly destroy$ : Subject<any> = new Subject();
  public mainForm: FormGroup = new FormGroup({});

  imagePreview: string = 'assets/4ca1ad0b-51d3-462d-a4d1-c90730312587.jpg';

  public readonly dialogRef = inject(MatDialogRef<PreencherCadastroContratanteComponent>);
  private readonly usuarioContratanteEndpoint: UsuarioContratanteEndpoint = inject(UsuarioContratanteEndpoint);
  
  errorMessage = signal('');

  public ngOnInit(): void {
      this.criarFormulario();
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

  public salvar() {
    this.usuarioContratanteEndpoint.cadastrarContratante(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
    .subscribe(resposta => {
      if (resposta){
        this.dialogRef.close(true);
      }
    });
  }

  bodyBuilder(): UsuarioDocumentoDto {
    return {...this.mainForm.value}
  }

  public criarFormulario() {
    this.mainForm.addControl("Email", new FormControl(this.email, [Validators.required]));
    this.mainForm.addControl("Usuario", new FormControl(this.usuario, [Validators.required]));
    this.mainForm.addControl("Senha", new FormControl(this.senha, [Validators.required]));
    this.mainForm.addControl("Cargo", new FormControl(null, [Validators.required]));
    this.mainForm.addControl("Localizacao", new FormControl('', [Validators.required]));
    this.mainForm.addControl("DataNascimento", new FormControl(null, []));
    this.mainForm.addControl("Descricao", new FormControl(null, []));
    this.mainForm.addControl("Experiencia", new FormControl(null, []));
    this.mainForm.addControl("Foto", new FormControl(null, []));
  }

  updateErrorMessage() {
    // if (this.email.hasError('required')) {
    //   this.errorMessage.set('You must enter a value');
    // } else if (this.email.hasError('email')) {
    //   this.errorMessage.set('Not a valid email');
    // } else {
    //   this.errorMessage.set('');
    // }
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
