import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "../model/usuario.model";
import { environment } from "src/environments/environment";
import { PaginatedResponse } from "../model/paginatedResponse";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  REST_API_PESSOA = environment.pedido_service_host + 'api/pessoa';

  constructor(private http: HttpClient) {}

  saveUsuario(usuario: Usuario) {
    return this.http.post(this.REST_API_PESSOA, usuario);
  }

  fetchUsuariosByExample(page: number = 0, size: number = 0, usuario: Usuario) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.post<PaginatedResponse<Usuario>>(
      this.REST_API_PESSOA + '/example',
      usuario,
      { params: params }
    );
  }

  fetchUsuarios() {
    let params = new HttpParams().set('page', '0').set('size', '100');
    return this.http.get<PaginatedResponse<Usuario>>(this.REST_API_PESSOA, {
      params: params,
    });
  }

  fetchCountUsuarios(
    usuario: Usuario = {
      id: null,
      nome: '',
      sobrenome: '',
      cpf: '',
      dataNascimento: null,
    }
  ): Observable<number> {
    return this.http.post<number>(`${this.REST_API_PESSOA}/total`, usuario);
  }

  fetchUsuariosPaginated(page: number = 0, size: number = 10) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginatedResponse<Usuario>>(this.REST_API_PESSOA, {
      params: params,
    });
  }

  deleteUsuario(id: string) {
    return this.http.delete(this.REST_API_PESSOA + `/${id}`);
  }
}