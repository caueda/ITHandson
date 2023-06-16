import { Component, OnInit,  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../model/pedido.model';
import { Produto } from '../model/Produto.model';
import { ResumoPedido } from '../model/resumoPedido.model';
import { Usuario } from '../model/usuario.model';
import { PedidoService } from '../service/pedido.service';
import { ProdutoService } from '../service/produto.service';
import { UsuarioService } from '../service/usuario.service';
import { PaginatedResponse } from '../model/paginatedResponse';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  constructor(private usuarioService: UsuarioService,
            private produtoService: ProdutoService,
            private pedidoService: PedidoService,
            private router: Router, private route: ActivatedRoute) { }

  @ViewChild("f") form: NgForm;

  pedido: Pedido = this.initializePedido();

  paginatedResponse: PaginatedResponse<Usuario>;
  produtos: Produto[] = [];
  resumoPedidos: ResumoPedido[] = [];
  basicData: any;
  precoUnitario: number;
  precoTotal: number;
  mensagem: string;
  usuarios: Usuario[] = [];

  error: any;

  ngOnInit(): void {
    this.fetchUsuarios();
    this.fetchProdutos();
    this.fetchResumoPedidos();
  }

  postPedido() {
    this.pedidoService.savePedido({... this.pedido})
      .subscribe(
        res => {
          this.error = null;
          this.mensagem = "Pedido criado com sucesso.";          
          this.fetchResumoPedidos();   
        },
        error => {
          console.log(error);
          this.error = error;
          this.mensagem = null;
        });
    this.initializePedido();   
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
    this.usuarioService.fetchUsuarios().subscribe(
      paginatedResponse => {
        this.paginatedResponse = {... paginatedResponse};
        this.paginatedResponse.content.forEach(usuario => this.usuarios.push({... usuario, label: `${usuario.nome} ${usuario.sobrenome}`}));        
      },
      error => {        
        this.error = error;
      }
    );
  }  

  fetchProdutos(){
    this.produtoService.fetchProdutos().subscribe(
      produtos => {
        this.produtos = [];
        produtos.forEach(produto => this.produtos.push({... produto}));
      },
      error => {
        console.log('Error', error);
        this.error = error;
      }
    );    
  }

  getBasicDataFromResumoPedidos(resumoPedidos: ResumoPedido[]) {
    this.basicData = {
      labels: resumoPedidos.map((resumo) => resumo.produto),
      datasets: [
        {
          label: 'Quantidade',
          backgroundColor: '#42A5F5',
          data: resumoPedidos.map((resumo) => resumo.quantidadeTotal),
        },
        {
          label: 'Total R$',
          backgroundColor: '#FFA726',
          data: resumoPedidos.map((resumo) => resumo.precoTotal),
        },
      ],
    };
  }

  fetchResumoPedidos() {
    console.log('fetching resumo pedidos.');
    this.pedidoService.getResumo().subscribe(
      resumos => {
        this.resumoPedidos = [];
        resumos.forEach(r => this.resumoPedidos.push({... r}));
        this.getBasicDataFromResumoPedidos(this.resumoPedidos);
      },
      error => {        
        console.log('Error', error);
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
