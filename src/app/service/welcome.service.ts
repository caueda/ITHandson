import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ChuckNorrisJoke } from "../model/chucknorrisjoke.model";

@Injectable({providedIn: 'root'})
export class WelcomeService {
    REST_API_RANDOM_MESSAGE = "https://api.chucknorris.io/jokes/random"

    constructor(private http: HttpClient) {}

    getChuckNorrisJoke() {
        return this.http.get<ChuckNorrisJoke>(this.REST_API_RANDOM_MESSAGE);
    }
}