import { Component, OnInit } from '@angular/core';
import { ChuckNorrisJoke } from '../model/chucknorrisjoke.model';
import { WelcomeService } from '../service/welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  chuckNorrisJoke: ChuckNorrisJoke;

  constructor(private welcomeService: WelcomeService) {}

  ngOnInit(): void {    
    this.welcomeService.getChuckNorrisJoke().subscribe(joke => this.chuckNorrisJoke = joke);
  }

}
