import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { PaginatedResponse } from '../model/paginatedResponse';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsuarioComponent implements OnInit {

  @ViewChild("f") form: NgForm;

  usuario: Usuario = {
    id: null, 
    nome: '', 
    sobrenome: '', 
    cpf: '',
    dataNascimento: null
  };

  paginatedResponse: PaginatedResponse<Usuario>;
  first: number = 0;
  rows: number = 5;
  total: number = 0;
  usuarios: Usuario[] = [];

  loading = false;
  error = null;
  mensagem: string;

  constructor(private http: HttpClient, private usuarioService: UsuarioService,
            private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.fetchUsuarios();
    this.fetchCountUsuarios();
  }

  onPage(event) {
    console.log('onPage', event);
    this.first = Math.floor(event.first / event.rows); 
    this.fetchUsuarios();
    this.loading = false;
  }

  postUsuario() {
    this.usuarioService.saveUsuario({... this.usuario})
      .subscribe(
        res => {
          this.fetchUsuarios();
          this.error = null;
          this.mensagem = "Usuário criado com sucesso."
        },
        error => {
          console.log(error);
          this.error = error;
          this.mensagem = null;
        });
  }

  fetchCountUsuarios() {
    this.usuarioService.fetchCountUsuarios().subscribe(
      count => this.total = count,
      error => {
        console.log('Error', error);
        this.error = error;
      }
    );
  }

  fetchUsuarios() {
    console.log('fetching usuarios.');
    this.loading = true;
    console.log("fetchUsuarios first: ", this.first);
    this.usuarioService.fetchUsuariosPaginated(this.first, this.rows).subscribe(
      paginatedResponse => {
        console.log('Response', paginatedResponse);
        this.paginatedResponse = {...paginatedResponse};
      },
      error => {        
        console.log('Error', error);
        this.error = error;
        this.loading = false;
      },
      () => {
        this.loading = false;
        if(this.paginatedResponse && this.paginatedResponse.content) {
          this.usuarios = [];
          this.paginatedResponse.content.forEach(usuario => {
            this.usuarios.push(usuario);  
          });
          console.log("usuarios: ", this.usuarios);
        } 
      }
    );       
  }

  deleteUsuario(id: string) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja apagar este usuário ?',
      accept: () => {
        this.usuarioService.deleteUsuario(id)
        .subscribe(
          res => {
            this.fetchUsuarios();
            this.error = null;
          },
          error => {
            console.log(error);
            this.error = error;
          });
      }
    });   
  }

  onSubmit() {
    if(this.usuario )
    this.postUsuario();
    this.form.reset();
  }

  usuarioById(index: number, usuario: Usuario) {
    return usuario.id;
  }


  next() {
    this.first = this.first + this.rows;
    this.fetchUsuarios();
  }

  prev() {
      this.first = this.first - this.rows;
      this.fetchUsuarios();
  }

  reset() {
      this.first = 0;
      this.fetchUsuarios();
  }

  isLastPage(): boolean {
      return this.first === this.total;
  }

  isFirstPage(): boolean {
      return this.first === 0;
  }


  isUnexpectedError() {
    return this.error && this.error.error.type !== undefined;
  }

  isBusinessError() {
    return this.error && this.error.error.type === undefined;
  }
}
