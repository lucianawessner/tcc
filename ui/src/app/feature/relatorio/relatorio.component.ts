import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import Chart from 'chart.js/auto';
import { ChartEndpoint } from '../../domain/chart/chart.endpoint';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
  ],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss'
})
export class RelatorioComponent {

  chart: any = [];

  chartEndpoint: ChartEndpoint = inject(ChartEndpoint);

  ngOnInit(): void {
    this.chartEndpoint.buscarRelatorio().subscribe((dados) => {

      const contratantesData = dados.$values[0].Data.$values;
      const prestadoresData = dados.$values[1].Data.$values;

        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
              {
                label: 'Quantidade Cadastros de Contratante',
                data: contratantesData,
                borderWidth: 1,
                backgroundColor: 'rgb(200, 200, 00, 0.4)',
                borderColor: '#77ab59'
              },
              {
                label: 'Quantidade Cadastros Prestador',
                data: prestadoresData,
                borderWidth: 1,
                backgroundColor: 'rgb(201, 223, 150, 0.4)',
                borderColor: '#77ab59'
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
      })
    })
  }
}
