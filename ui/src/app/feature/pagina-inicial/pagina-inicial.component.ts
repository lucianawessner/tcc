import { Component, inject, Renderer2, ViewChild } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatIconButton,
    FeedComponent
  ],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss'
})
export class PaginaInicialComponent {
  public readonly renderer = inject(Renderer2);

  @ViewChild('contentWrapper', { static: false }) contentWrapper: any;

  public mainSidebarHeight(height: any) {
    this.renderer.setStyle(this.contentWrapper.nativeElement, 'min-height', height - 114 + 'px');
  }
}

