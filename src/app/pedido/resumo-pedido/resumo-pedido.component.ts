import { Component, Input, OnInit } from '@angular/core';
import { ResumoPedido } from 'src/app/model/resumoPedido.model';

@Component({
  selector: 'app-resumo-pedido',
  templateUrl: './resumo-pedido.component.html',
  styleUrls: ['./resumo-pedido.component.css'],
})
export class ResumoPedidoComponent implements OnInit {
  @Input() resumoPedidos: ResumoPedido[];
  @Input() basicData: any;

  basicOptions: any;

  constructor() {}

  ngOnInit(): void {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: 'black',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'black',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
        y: {
          ticks: {
            color: 'black',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
      },
    };
  }
}
