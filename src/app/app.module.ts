import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppHome } from './app.home';
import { LoginService } from './Loggin.service';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'usuario', component: UsuarioComponent}
];

@NgModule({
  declarations: [
    AppHome,
    UsuarioComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LoginService],
  bootstrap: [AppHome]
})
export class AppModule { }
