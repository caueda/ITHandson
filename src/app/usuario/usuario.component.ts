import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
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

  usuarios = [];
  loading = false;
  error = null;

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.fetchUsuarios();
  }

  postUsuario() {
    this.usuarioService.saveUsuario({... this.usuario})
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

  fetchUsuarios() {
    console.log('fetching usuarios.');
    this.loading = true;
    this.usuarioService.fetchUsuarios().subscribe(
      users => {
        this.usuarios = [];
        users.forEach(u => this.usuarios.push({... u}));
        this.error = null;
      },
      error => {        
        console.log('Error', error);
        this.error = error;
        this.loading = false;
      }
    );
    this.loading = false;
  }

  deleteUsuario(id: string) {
    this.usuarioService.deleteUsuario(id)
      .subscribe(
        res => {
          this.fetchUsuarios();
          this.error = null;
        },
        error => {
          this.error = error;
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

  isUnexpectedError() {
    return this.error && this.error.error.type !== undefined;
  }

  isBusinessError() {
    return this.error && this.error.error.type === undefined;
  }
}
