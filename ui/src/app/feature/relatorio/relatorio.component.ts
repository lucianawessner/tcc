import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SidebarComponent } from "../sidebar/sidebar.component";
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [MatCardModule,
    MatMenuModule, SidebarComponent],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss'
})
export class RelatorioComponent {

  chart: any = [];

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
          {
            label: 'Quantidade de cadastros',
            data: [90, 20, 3, 5, 2, 3],
            borderWidth: 1,
            backgroundColor: 'rgb(201, 223, 138, 0.4)',
            borderColor: '#77ab59' ,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

}
