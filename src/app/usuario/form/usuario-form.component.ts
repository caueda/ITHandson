import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from '../../model/usuario.model';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsuarioFormComponent implements OnInit {

  form: FormGroup;

  @Output() usuarioFormEvent = new EventEmitter<any>();

  @Input() usuario: Usuario = {
    id: null, 
    nome: '', 
    sobrenome: '', 
    cpf: '',
    dataNascimento: null
  };

  @Input() usuarioId: number = null;

  @Input() loading = false;
  @Input() errorResponse = null;
  @Input() mensagem: string;

  @Input() isUnexpectedError: Function;

  @Input() isBusinessError: Function;

  @Input() closeDialog: Function;

  constructor(private http: HttpClient, private usuarioService: UsuarioService,
            private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'nome': new FormControl(this.usuario.nome, [Validators.required]),
      'sobrenome': new FormControl(this.usuario.sobrenome, [Validators.required]),
      'cpf': new FormControl(this.usuario.cpf, [Validators.required]),
      'dataNascimento': new FormControl(this.usuario.dataNascimento)
    });
  }

  resetForm() {
    this.form.reset();
  }

  createFormControls(usuario: Usuario) {
    console.log('createFormControls', usuario)
    return {
      'nome': new FormControl(usuario.nome, [Validators.required]),
      'sobrenome': new FormControl(usuario.sobrenome, [Validators.required]),
      'cpf': new FormControl(usuario.cpf, [Validators.required]),
      'dataNascimento': new FormControl(usuario.dataNascimento)
    };
  }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
    this.form.setValue({
      'nome': usuario.nome,
      'sobrenome': usuario.sobrenome,
      'cpf': usuario.cpf,
      'dataNascimento': new Date(usuario.dataNascimento)
    });
  }

  onSubmit() {
    this.usuarioFormEvent.emit(this.form.value);
  }
}
