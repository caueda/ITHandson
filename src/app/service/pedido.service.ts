import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pedido } from "../model/pedido.model";
import { ResumoPedido } from "../model/resumoPedido.model";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class PedidoService {

    REST_API_PEDIDO = environment.pedido_service_host + 'api/pedido';

    constructor(private http: HttpClient) {}

    savePedido(pedido: Pedido) {      
        return this.http.post(this.REST_API_PEDIDO, pedido);
    }

    getResumo() {
        return this.http.get<ResumoPedido[]>(this.REST_API_PEDIDO + "/resumo");
    }
}