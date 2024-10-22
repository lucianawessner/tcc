import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-vaga',
  standalone: true,
  imports: [MatCardModule,
    MatMenuModule, SidebarComponent],
  templateUrl: './vaga.component.html',
  styleUrl: './vaga.component.scss'
})
export class VagaComponent {

}
