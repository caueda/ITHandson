import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Produto } from "../model/Produto.model";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class ProdutoService {

    REST_API_PRODUTO = environment.pedido_service_host + 'api/produto';

    constructor(private http: HttpClient) {}
    fetchProdutos() {
       return this.http.get<Produto[]>(this.REST_API_PRODUTO);
    }
}