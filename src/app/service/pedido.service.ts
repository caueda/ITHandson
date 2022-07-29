import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pedido } from "../model/pedido.model";

@Injectable({providedIn: 'root'})
export class PedidoService {

    REST_API_PEDIDO = 'http://localhost:8888/api/pedido';

    constructor(private http: HttpClient) {}

    savePedido(pedido: Pedido) {      
        return this.http.post(this.REST_API_PEDIDO, pedido);
    }
}