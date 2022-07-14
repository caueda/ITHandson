import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsuarios();
  }

  fetchUsuarios() {
    this.http.get<Usuario[]>('http://localhost:8888/pessoa')
    .subscribe(pessoas => {
      console.log(pessoas);
      this.usuarios = pessoas;
    });
  }
}

export interface Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
}
