import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Pedido } from '../model/pedido.model';
import { Produto } from '../model/Produto.model';
import { Usuario } from '../model/usuario.model';
import { PedidoService } from '../service/pedido.service';
import { ProdutoService } from '../service/produto.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  constructor(private usuarioService: UsuarioService,
            private produtoService: ProdutoService,
            private pedidoService: PedidoService,
            private confirmationService: ConfirmationService,
            private router: Router, private route: ActivatedRoute) { }

  @ViewChild("f") form: NgForm;

  pedido: Pedido = this.initializePedido();

  usuarios: Usuario[] = [];
  produtos: Produto[] = [];
  precoUnitario: number;
  precoTotal: number;
  mensagem: string;

  error: any;

  ngOnInit(): void {
    this.fetchUsuarios();
  }

  postPedido() {
    this.pedidoService.savePedido({... this.pedido})
      .subscribe(
        res => {
          this.error = null;
        },
        error => {
          console.log(error);
          this.error = error;
        });
    this.initializePedido();      
    this.mensagem = "Pedido criado com sucesso.";
    this.form.reset();
  }
  
  initializePedido() {
    return {
      id: null,
      pessoa: null,
      produto: {
        nome: '',
        descricao: '',
        preco: 0,
        imageUrl: ''
      },
      quantidade: 1,
      dataPedido: new Date()
    };
  }

  updatePreco() {
    if(this.pedido && this.pedido.produto) {
      this.precoUnitario = this.pedido.produto.preco;
      this.precoTotal = this.precoUnitario * this.pedido.quantidade;
    }
  }

  onSubmit() {
    this.postPedido();
    this.router.navigate(['/pedido'],{relativeTo: this.route});
  }

  fetchUsuarios() {
    console.log('fetching usuarios.');
    this.usuarioService.fetchUsuarios().subscribe(
      users => {
        this.usuarios = [];
        users.forEach(u => this.usuarios.push({... u, label: u.cpf + ' - ' + u.nome + ' ' + u.sobrenome}));
        console.log(this.usuarios)
        this.error = null;
      },
      error => {        
        console.log('Error', error);
        this.error = error;
      }
    );

    this.produtoService.fetchProdutos().subscribe(
      produtos => {
        this.produtos = [];
        produtos.forEach(produto => this.produtos.push({... produto}));
        console.log(this.produtos)
      },
      error => {
        console.log('Error', error);
        this.error = error;
      }
    );
  }  

  isUnexpectedError() {
    return this.error && this.error.error.type !== undefined;
  }

  isBusinessError() {
    return this.error && this.error.error.type === undefined;
  }
}
