import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Oferta } from "../model/oferta.model";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class OfertaService {

    REST_API_OFERTA = environment.oferta_service_host + 'api/oferta';

    constructor(private http: HttpClient) {}

    saveOferta(oferta: Oferta) {      
        return this.http.post(this.REST_API_OFERTA, oferta);
    }

    fetchOfertas() {      
        return this.http.get<Oferta[]>(this.REST_API_OFERTA);
    }
}