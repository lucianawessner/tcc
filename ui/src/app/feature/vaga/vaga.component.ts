import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { InformacaoDialogComponent } from './components/informacao-dialog/informacao-dialog.component';

@Component({
  selector: 'app-vaga',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    SidebarComponent],
  templateUrl: './vaga.component.html',
  styleUrl: './vaga.component.scss'
})
export class VagaComponent {
  readonly dialog = inject(MatDialog);

  publicacoes = [
    {
        texto: "Adorei o pôr do sol hoje! 🌅",
        usuario: "Luciana Wessner",
        quantidadeCurtida: 25,
        arquivo: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
        imagemPerfil: "https://images.unsplash.com/photo-1558788353-f76d92427f16"
    },
    {
        texto: "Dia produtivo no trabalho! 💻✨",
        usuario: "João Silva",
        quantidadeCurtida: 15,
        arquivo: "",
        imagemPerfil: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d"
    },
    {
        texto: "Animais são incríveis! 🐾",
        usuario: "Maria Oliveira",
        quantidadeCurtida: 30,
        arquivo: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
        imagemPerfil: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8"
    },
    {
        texto: "Café da manhã perfeito para começar o dia ☕🥐",
        usuario: "Carla Mendes",
        quantidadeCurtida: 42,
        arquivo: "https://images.unsplash.com/photo-1509440159598-232111445657",
        imagemPerfil: "https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e"
    },
    {
        texto: "Curtindo um final de semana na praia! 🏖️",
        usuario: "Pedro Albuquerque",
        quantidadeCurtida: 65,
        arquivo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        imagemPerfil: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
    },
    {
        texto: "Trabalho em equipe faz toda a diferença! 🙌",
        usuario: "Renata Costa",
        quantidadeCurtida: 55,
        arquivo: "",
        imagemPerfil: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
    },
    {
        texto: "Aquele momento relaxante com um bom livro 📖",
        usuario: "Gustavo Martins",
        quantidadeCurtida: 34,
        arquivo: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        imagemPerfil: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    }
];

  adicionarPublicacao() {
    const publicacaoParaAdicionar = {
      texto: "Adicionada a partir do clique",
      usuario: "Gustavo Martins",
      quantidadeCurtida: 0,
      arquivo: "",
      imagemPerfil: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    }

    this.publicacoes.push(publicacaoParaAdicionar)
  }

  abrirInformacoes(vaga: any){
    console.log(vaga)
    const dialogRef = this.dialog.open(InformacaoDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}


