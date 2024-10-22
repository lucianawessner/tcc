import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-barra-progresso',
  standalone: true,
  imports: [ MatCardModule,
    
  ],
  templateUrl: './barra-progresso.component.html',
  styleUrl: './barra-progresso.component.scss'
})
export class BarraProgressoComponent {

}
