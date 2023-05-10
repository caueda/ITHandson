import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';

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

  loading = false;
  error = null;
  mensagem: string;

  constructor(private http: HttpClient, private usuarioService: UsuarioService,
            private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  postUsuario() {
    this.usuarioService.saveUsuario({... this.usuario})
      .subscribe(
        res => {
          this.error = null;
          this.mensagem = "Usuário criado com sucesso."
        },
        error => {
          console.log(error);
          this.error = error;
          this.mensagem = null;
        });
  }

  onSubmit() {
    if(this.usuario )
    this.postUsuario();
    this.form.reset();
  }

  isUnexpectedError() {
    return this.error && this.error.error.type !== undefined;
  }

  isBusinessError() {
    return this.error && this.error.error.type === undefined;
  }

  closeDialog = () => {
    this.mensagem = null;
  }
}
