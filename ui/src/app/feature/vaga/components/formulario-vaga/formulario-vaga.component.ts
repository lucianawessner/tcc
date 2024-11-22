import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';
import { Vaga } from '../../../../domain/vaga/vaga.models';
import { CredentialsService } from '../../../login/service/credentials.service';
import { UsuarioDto } from '../../../../domain/login/usuario.dto';
import { VagaEndpoint } from '../../../../domain/vaga/vaga.endpoint';
import { CommonModule, JsonPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-vaga',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './formulario-vaga.component.html',
  styleUrl: './formulario-vaga.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class FormularioVagaComponent implements OnInit {

  private readonly destroy$ : Subject<any> = new Subject();

  public mainForm: FormGroup = new FormGroup({});

  private vagaEndpoint: VagaEndpoint = inject(VagaEndpoint);
  private credentialsService: CredentialsService = inject(CredentialsService);
  public readonly dialogRef = inject(MatDialogRef<FormularioVagaComponent>);

  public usuario: UsuarioDto = new UsuarioDto(); 
  
  ngOnInit(): void {
    this.usuario = this.credentialsService.credentials!;
    this.criarFormulario();
  }

  public salvar() {
    this.vagaEndpoint.cadastrarVaga(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
    .subscribe(resposta => {
      if (resposta) {
        Swal.fire({
          title: 'Atenção!',
          text: 'Vaga criada com sucesso',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        
        this.dialogRef.close(true);
      }
    });
  }
  
  bodyBuilder(): Vaga {
    return {...this.mainForm.value}
  }

  public criarFormulario() {
    this.mainForm.addControl("cargo", new FormControl('', [Validators.required]));
    this.mainForm.addControl("localizacao", new FormControl('', [Validators.required]));
    this.mainForm.addControl("remuneracao", new FormControl('', [Validators.required]));
    this.mainForm.addControl("descricao", new FormControl('', [Validators.required]));
    this.mainForm.addControl("requisitos", new FormControl('', []));
    this.mainForm.addControl("prazo", new FormControl('', [Validators.required]));
    this.mainForm.addControl("idUsuarioContratante", new FormControl(this.usuario.Id, [Validators.required]));
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
