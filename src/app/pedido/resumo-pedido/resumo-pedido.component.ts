import { Component, Input, OnInit } from '@angular/core';
import { ResumoPedido } from 'src/app/model/resumoPedido.model';

@Component({
  selector: 'app-resumo-pedido',
  templateUrl: './resumo-pedido.component.html',
  styleUrls: ['./resumo-pedido.component.css']
})
export class ResumoPedidoComponent implements OnInit {

  @Input() resumoPedidos: ResumoPedido[];

  constructor() { }  

  ngOnInit(): void {}


}
