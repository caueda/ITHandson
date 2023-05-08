import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { PaginatedResponse } from '../model/paginatedResponse';

@Component({
  selector: 'app-usuario-consulta',
  templateUrl: './usuario-consulta.component.html',
  styleUrls: ['./usuario-consulta.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsuarioConsultaComponent implements OnInit {

  @ViewChild("f") form: NgForm;

  usuario: Usuario = {
    id: null, 
    nome: '', 
    sobrenome: '', 
    cpf: '',
    dataNascimento: null
  };

  paginatedResponse: PaginatedResponse<Usuario>;
  page: number = 0;
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

  onPage(event: any) {
    this.page = Math.floor(event.first / event.rows); 
    this.fetchUsuarios();
    this.loading = false;
  }

  onSort(event: any) {
    return this.usuarios.sort((usuario1, usuario2) => {
      const valueFieldUsuario1 = usuario1[event.field];
      const valueFieldUsuario2 = usuario2[event.field];
      let comparison = 0;
  
      if (valueFieldUsuario1 > valueFieldUsuario2) {
        comparison = 1;
      } else if (valueFieldUsuario1 < valueFieldUsuario2) {
        comparison = -1;
      }
  
      return comparison * event.order;
    });
  }

  fetchCountUsuarios() {
    this.usuarioService.fetchCountUsuarios(this.usuario).subscribe(
      count => this.total = count,
      error => {
        console.log('Error', error);
        this.error = error;
      }
    );

  }

  fetchUsuarios() {
    this.loading = true;
    this.usuarioService.fetchUsuariosByExample(this.page, this.rows, {... this.usuario}).subscribe(
      paginatedResponse => {
        this.paginatedResponse = {...paginatedResponse};
      },
      error => {        
        console.log('Error', error);
        this.error = error;
        this.loading = false;
      },
      () => {
        try {
          this.loading = false;
          
          if (this.paginatedResponse?.content) {
            this.usuarios = [...this.paginatedResponse.content];
            console.log("usuarios: ", this.usuarios);
          } else {
            console.log("There was an error retrieving data.");
          }
        } catch (error) {
          console.log("An error occurred: ", error);
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
    console.log('Usuario', this.usuario);
    if(this.usuario) this.fetchUsuarios();
    //this.form.reset();
  }

  usuarioById(index: number, usuario: Usuario) {
    return usuario.id;
  }

  isUnexpectedError() {
    return this.error && this.error.error.type !== undefined;
  }

  isBusinessError() {
    return this.error && this.error.error.type === undefined;
  }
}
