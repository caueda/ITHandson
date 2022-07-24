import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';

import { AppHome } from './app.home';
import { LoginService } from './Loggin.service';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsuarioDetailComponent } from './usuario/usuario-detail/usuario-detail.component';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'usuario', component: UsuarioComponent}
];

@NgModule({
  declarations: [
    AppHome,
    UsuarioComponent,
    WelcomeComponent,
    UsuarioDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CalendarModule,
    InputMaskModule,
    BrowserAnimationsModule,
    PanelModule,
    TableModule,
    MessageModule,
    MessagesModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LoginService],
  bootstrap: [AppHome]
})
export class AppModule { }
