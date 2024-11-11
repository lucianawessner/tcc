import {ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, ViewEncapsulation} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from  '@angular/material/input' ;
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { merge, Subject, takeUntil} from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { provideNativeDateAdapter} from '@angular/material/core';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { UsuarioPrestadorEndpoint } from '../../../../domain/usuario-prestador/usuario-prestador.endpoint';
import { Prestador } from '../../../../domain/usuario-prestador/usuario-prestador.models';

@Component({
  selector: 'app-preencher-cadastro',
  standalone: true,
  imports: [
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
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './preencher-cadastro.component.html',
  styleUrl: './preencher-cadastro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
})
export class PreencherCadastroComponent implements OnInit {

  @Input('email') email: string = '';
  @Input('usuario') usuario: string = '';
  @Input('senha') senha: string = '';

  private readonly destroy$: Subject<any> = new Subject();
  public mainForm: FormGroup = new FormGroup({});

  public readonly dialogRef = inject(MatDialogRef<PreencherCadastroComponent>);
  private readonly usuarioPrestadorEndpoint: UsuarioPrestadorEndpoint = inject(UsuarioPrestadorEndpoint);

  errorMessage = signal('');
  
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor() {
    // merge(this.email.statusChanges, this.email.valueChanges)
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(() => this.updateErrorMessage());
  }

  public ngOnInit(): void {
    this.criarFormulario();
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

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  public salvar() {
    this.usuarioPrestadorEndpoint.cadastrarPrestador(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
    .subscribe(resposta => {
      if (resposta){
        this.dialogRef.close(true);
      }
    })
  }

  bodyBuilder(): Prestador {
    return {...this.mainForm.value}
  }

  public criarFormulario() {
    this.mainForm.addControl("email", new FormControl(this.email, [Validators.required]));
    this.mainForm.addControl("usuario", new FormControl(this.usuario, [Validators.required]));
    this.mainForm.addControl("senha", new FormControl(this.senha, [Validators.required]));
    this.mainForm.addControl("cargo", new FormControl(null, [Validators.required]));
    this.mainForm.addControl("localizacao", new FormControl('', [Validators.required]));
    this.mainForm.addControl("dataNascimento", new FormControl(null, []));
    this.mainForm.addControl("descricao", new FormControl(null, []));
    this.mainForm.addControl("qualificacao", new FormControl(null, []));
  }
}
