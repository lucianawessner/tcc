import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FeedDto } from '../../domain/feed/feed.dto';
import { FeedEndpoint } from '../../domain/feed/feed.endpoint';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from '../login/service/login.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { UsuarioDto } from '../../domain/login/usuario.dto';

@Component({
  selector: 'app-publicacao',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './publicacao.component.html',
  styleUrl: './publicacao.component.scss'
})
export class PublicacaoComponent {

  @Input('usuario') usario!: UsuarioDto;

  @Output('publicou') publicou: EventEmitter<any> = new EventEmitter<any>;

  private readonly destroy$ : Subject<any> = new Subject();
  
  public mainForm: FormGroup = new FormGroup({});
  imagePreview: string | null = null;

  private readonly feedEndpoint: FeedEndpoint = inject(FeedEndpoint);

  public ngOnInit(): void {
    this.criarFormulario();
    this.aplicarValores();
  }

  public publicar(){
    this.feedEndpoint.publicar(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
    .subscribe(resposta => {
      if(resposta){
        this.imagePreview = null;
        this.mainForm.reset();
        this.publicou.emit(true);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0] as File;
    if (file) {
      this.mainForm.patchValue({ "Foto": file });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Armazena o preview como URL
      };
      reader.readAsDataURL(file); // Lê o arquivo como Data URL
    }
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  bodyBuilder(): FeedDto {
    return {...this.mainForm.value}
  }

  public aplicarValores() {
    this.mainForm.patchValue({
      "Usuario": this.usario.Usuario
    })
  }

  public criarFormulario() {
    this.mainForm.addControl("Usuario", new FormControl('', [Validators.required]));
    this.mainForm.addControl("Texto", new FormControl('', [Validators.required]));
    this.mainForm.addControl("Foto", new FormControl(null, []));
  }
}
