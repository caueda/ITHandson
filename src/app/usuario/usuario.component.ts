import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../model/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @ViewChild("f") form: NgForm;

  REST_API_PESSOA = 'http://localhost:8888/api/pessoa';

  usuario = {
    id: '', 
    nome: '', 
    sobrenome: '', 
    cpf: ''
  };

  usuarios = [];
  loading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsuarios();
  }

  postUsuario() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Content-Type': 'application/json'
      })
    }

    this.http.post(this.REST_API_PESSOA, this.usuario, httpOptions).subscribe(response => {
      console.log(response);
      this.fetchUsuarios();
    });
  }

  fetchUsuarios() {
    this.loading = true;
    this.http.get<Usuario[]>(this.REST_API_PESSOA)
    .subscribe(pessoas => {
      const pessoasResultado = [];
      pessoas.forEach(pessoa => pessoasResultado.push({... pessoa}));
      this.usuarios = pessoasResultado;
    });
    this.loading = false;
  }

  deleteUsuario(id: string) {
    this.http.delete(this.REST_API_PESSOA + `/${id}`)
    .subscribe(response => {
      console.log(`Usuário com id=${id} removido com sucesso.`);
      this.fetchUsuarios();
    });
  }

  onSubmit() {
    this.postUsuario();
    this.form.reset();
  }

  onDelete(id: string) {
    this.deleteUsuario(id);
  }

  usuarioById(index: number, usuario: Usuario) {
    return usuario.id;
  }
}
