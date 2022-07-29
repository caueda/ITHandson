import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pedido } from '../model/pedido.model';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  @ViewChild("f") form: NgForm;

  pedido: Pedido = {
    id: null,
    pessoa: null,
    produto: null,
    quantidade: 0,
    dataPedido: null
  };

  usuarios: Usuario[] = [];
  error: any;

  ngOnInit(): void {
    this.fetchUsuarios();
  }

  onSubmit() {

  }

  fetchUsuarios() {
    console.log('fetching usuarios.');
    this.usuarioService.fetchUsuarios().subscribe(
      users => {
        this.usuarios = [];
        users.forEach(u => this.usuarios.push({... u, label: u.cpf + ' - ' + u.nome}));
        console.log(this.usuarios)
        this.error = null;
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
