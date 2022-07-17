import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "../model/usuario.model";

@Injectable({providedIn: 'root'})
export class UsuarioService {

    REST_API_PESSOA = 'http://localhost:8888/api/pessoa';

    constructor(private http: HttpClient) {}

    saveUsuario(usuario: Usuario) {      
        return this.http.post(this.REST_API_PESSOA, usuario);
    }

    fetchUsuarios() {
       return this.http.get<Usuario[]>(this.REST_API_PESSOA);
    }

    deleteUsuario(id: string) {
        return this.http.delete(this.REST_API_PESSOA + `/${id}`);
    }
}