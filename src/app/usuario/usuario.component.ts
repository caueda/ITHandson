import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsuarioComponent implements OnInit {

  loading = false;
  errorResponse = null;
  mensagem: string;

  @ViewChild('usuarioForm') usuarioForm: any;
  
  ngOnInit(): void {
  }

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  postUsuario(usuario: any = null) {
    this.usuarioService.saveUsuario({... usuario})
      .subscribe(
        res => {
          this.errorResponse = null;
          this.mensagem = "Usuário criado com sucesso.";          
          this.usuarioForm.resetForm();
        },
        error => {          
          this.errorResponse = {... error };
          this.mensagem = null;          
        });        
  }

  isUnexpectedError() {
    return  this.errorResponse && (this.errorResponse?.error?.type !== undefined);
  }

  isBusinessError() {
    return this.errorResponse && (this.errorResponse?.field);
  }

  closeDialog = () => {
    this.mensagem = null;
  }
}
