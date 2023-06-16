import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { PaginatedResponse } from '../model/paginatedResponse';
import { DialogService } from 'primeng/dynamicdialog';
import { UsuarioEditComponent } from './usuario-edit.component';

@Component({
  selector: 'app-usuario-consulta',
  templateUrl: './usuario-consulta.component.html',
  styleUrls: ['./usuario-consulta.component.css'],
  providers: [DialogService],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UsuarioConsultaComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  usuario: Usuario = {
    id: null,
    nome: '',
    sobrenome: '',
    cpf: '',
    dataNascimento: null,
  };

  paginatedResponse: PaginatedResponse<Usuario>;
  page: number = 0;
  rows: number = 5;
  total: number = 0;
  usuarios: Usuario[] = [];

  loading = false;
  error = null;
  mensagem: string;

  constructor(
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

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
      (count) => (this.total = count),
      (error) => {
        console.log('Error', error);
        this.error = error;
      }
    );
  }

  fetchUsuarios() {
    this.loading = true;
    this.usuarioService
      .fetchUsuariosByExample(this.page, this.rows, { ...this.usuario })
      .subscribe(
        (paginatedResponse) => {
          this.paginatedResponse = { ...paginatedResponse };
        },
        (error) => {
          console.log('Error', error);
          this.error = error;
          this.loading = false;
        },
        () => {
          try {
            this.loading = false;

            if (this.paginatedResponse?.content) {
              this.usuarios = [...this.paginatedResponse.content];
              this.total = this.paginatedResponse.totalElements;
            } else {
              this.total = 0;
            }
          } catch (error) {
            this.total = 0;
          }
        }
      );
  }

  deleteUsuario(id: string) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja apagar este usuário ?',
      accept: () => {
        this.usuarioService.deleteUsuario(id).subscribe(
          (res) => {
            this.fetchUsuarios();
            this.error = null;
          },
          (error) => {
            console.log(error);
            this.error = error;
          }
        );
      },
    });
  }

  editUsuario(id: string) {
      const ref = this.dialogService.open(UsuarioEditComponent, {
        data: { id },
        header: 'Editar Usuário',
        width: '70%',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
      });

      ref.onClose.subscribe((usuario: Usuario) => this.fetchUsuarios());
  }


  onSubmit() {
    if (this.usuario) this.fetchUsuarios();
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
