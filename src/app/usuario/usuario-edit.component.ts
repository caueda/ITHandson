import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsuarioEditComponent implements OnInit {

  @ViewChild("f") form: NgForm;

  usuario: Usuario = {
    id: null, 
    nome: '', 
    sobrenome: '', 
    cpf: '',
    dataNascimento: null
  };

  usuarioDataNascimento: Date;

  loading = false;
  error = null;
  mensagem: string;

  constructor(private http: HttpClient, private usuarioService: UsuarioService,
            private confirmationService: ConfirmationService, 
            public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    let id = this.config.data.id;
    this.usuarioService.fetchUsuarioById(id).subscribe(
      (usuarioReturned) => {
        this.usuario = { ...usuarioReturned };      
        this.usuarioDataNascimento = new Date(this.usuario.dataNascimento);  
        this.error = null;
      },
      (error) => {
        console.log(error);
        this.error = error;
      }
    );
  }

  updateUsuario() {
    this.usuarioService.updateUsuario({... this.usuario, dataNascimento: this.usuarioDataNascimento})
      .subscribe(
        res => {
          this.error = null;
          this.mensagem = "Usuário alterado com sucesso."
        },
        error => {
          console.log(error);
          this.error = error;
          this.mensagem = null;
        });
  }

  closeDialog() {
    this.mensagem = '';
    this.ref.close();
  }

  onSubmit() {
    if(this.usuario )
    this.updateUsuario();
    this.form.reset();
  }

  isUnexpectedError() {
    return this.error && this.error.error.type !== undefined;
  }

  isBusinessError() {
    return this.error && this.error.error.type === undefined;
  }
}
