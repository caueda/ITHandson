import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'http://localhost:4300/main.js';
    document.body.appendChild(script);
  }

}
