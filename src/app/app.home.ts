import { Component, Input } from '@angular/core';
import { LoginService } from './Loggin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.home.html',
  styleUrls: ['./app.home.css']
})
export class AppHome {
  show: boolean = false;
  serverName: string;

  constructor(private loginService: LoginService) {}

  click() {
    this.show = !this.show;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
    this.loginService.log('onUpdateServerName was called ' + this.serverName)
  }
}
