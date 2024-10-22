import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [MatCardModule,
    MatMenuModule, SidebarComponent],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss'
})
export class RelatorioComponent {

}
