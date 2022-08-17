import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Oferta } from '../model/oferta.model';
import { Produto } from '../model/Produto.model';
import { OfertaService } from '../service/oferta.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {
  constructor(private produtoService: ProdutoService,
            private ofertaService: OfertaService,
            private router: Router, private route: ActivatedRoute) { }

  @ViewChild("f") form: NgForm;

  oferta: Oferta = {
    produtoId: 0,
    pedidoUrl: '',
    imageProdutoUrl: '',
    desconto: null,
    mensagem: '',
    situacao: ''
  };

  produtos: Produto[];
  ofertaBody = { produto: null }
  precoUnitario: number;
  mensagemSistema: string;
  ofertas: Oferta[];
  responsiveOptions: any;
  error: any;

  ngOnInit(): void {
    this.fetchProdutos();
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  this.fetchOfertas();
  }

  postOferta() {
    
    this.oferta.imageProdutoUrl = this.ofertaBody.produto.imageUrl;
    this.oferta.produtoId = this.ofertaBody.produto.id;
    this.oferta.pedidoUrl='/oferta';
    this.oferta.situacao = 'ATIVO';

    this.ofertaService.saveOferta({... this.oferta})
      .subscribe(
        res => {
          this.error = null;
          this.mensagemSistema = "Oferta criada com sucesso."; 
          this.fetchOfertas();
        },
        error => {
          console.log(error);
          this.mensagemSistema = null; 
          this.error = error;
        });           
    this.form.reset();
  }

  updatePreco() {
    if(this.ofertaBody.produto) {
      this.precoUnitario = this.ofertaBody.produto.preco;
    }
  }

  onSubmit() {
    this.postOferta();
    this.router.navigate(['/oferta'],{relativeTo: this.route});
  }

  fetchProdutos() {
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

  fetchOfertas() {
    this.ofertaService.fetchOfertas().subscribe(
      ofertas => {
        this.ofertas = [];
        ofertas.forEach(oferta => this.ofertas.push({... oferta}));
        console.log(this.produtos)
      },
      error => {
        console.log('Error', error);
        this.error = error;
      }
    );
  }  

  hasOfertas() {
    if(this.ofertas && this.ofertas.length>0) return true;
    return false;
  }

  isUnexpectedError() {
    return this.error && this.error.error.type !== undefined;
  }

  isBusinessError() {
    return this.error && this.error.error.type === undefined;
  }
}
