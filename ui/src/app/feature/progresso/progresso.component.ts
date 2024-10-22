import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { BarraProgressoComponent } from "../barra-progresso/barra-progresso.component";

@Component({
  selector: 'app-progresso',
  standalone: true,
  imports: [MatCardModule,
    MatMenuModule, SidebarComponent, BarraProgressoComponent],
  templateUrl: './progresso.component.html',
  styleUrl: './progresso.component.scss'
})
export class ProgressoComponent {
  router: any;
  entrar(){
    this.router.navigate(['/editar-perfil'])
  }
}
