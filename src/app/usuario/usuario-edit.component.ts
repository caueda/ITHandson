import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UsuarioEditComponent implements OnInit {
  @ViewChild("usuarioForm") usuarioForm: any;

  usuario: Usuario = {
    id: null,
    nome: '',
    sobrenome: '',
    cpf: '',
    dataNascimento: null,
  };

  loading = false;
  error = null;
  mensagem: string;

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    let id = this.config.data.id;
    this.usuarioService.fetchUsuarioById(id).subscribe(
      (usuarioReturned) => {
        this.usuario = { ...usuarioReturned };
        this.usuarioForm.setUsuario(this.usuario);
        this.error = null;        
      },
      (error) => {
        console.log(error);
        this.error = error;
      }
    );
  }

  updateUsuario(usuario: any = null) {
    if(usuario) {
      this.usuarioService
        .updateUsuario({
          ... usuario,
          id: this.usuario.id,
        })
        .subscribe(
          (res) => {
            this.error = null;
            this.mensagem = 'Usuário alterado com sucesso.';
            this.usuarioForm.resetForm();
          },
          (error) => {
            console.log(error);
            this.error = error;
            this.mensagem = null;
          }
        );
    }
  }

  closeDialog = () => {
    this.mensagem = null;
    this.ref.close();
  }

  isUnexpectedError() {
    return this.error && this.error.error.type !== undefined;
  }

  isBusinessError() {
    return this.error && this.error.error.type === undefined;
  }
}
