import { Component, OnInit } from '@angular/core';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = environment.produto_micro_app_host + '/main.js';
    document.body.appendChild(script);
  }

}
