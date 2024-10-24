import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacao-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './informacao-dialog.component.html',
  styleUrl: './informacao-dialog.component.scss'
})
export class InformacaoDialogComponent {
  public readonly router = inject(Router);
  private dialogRef = inject(MatDialogRef<InformacaoDialogComponent>);

  jobTitle: string = "Desenvolvedor Frontend";
  jobLocation: string = "São Paulo, SP";
  jobSalary: string = "R$ 5.000,00";
  jobDescription: string = "Desenvolvimento de aplicações web...";
  jobRequirements: string = "Conhecimento em Angular, CSS, TypeScript...";
  jobDeadline: string = "30/10/2024";
  jobCreationDate: string = "01/10/2024";
  jobClosingDate: string = "30/10/2024";

  formulario(){
    this.router.navigate(['home/formulario-prestador'])
    this.dialogRef.close();
  }

}
