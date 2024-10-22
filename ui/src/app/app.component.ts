import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginaInicialComponent } from "./feature/pagina-inicial/pagina-inicial.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PaginaInicialComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'ui';
}
