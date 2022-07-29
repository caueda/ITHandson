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
import {DropdownModule} from 'primeng/dropdown';
import {ImageModule} from 'primeng/image';
import {InputNumberModule} from 'primeng/inputnumber';

import { AppHome } from './app.home';
import { LoginService } from './Loggin.service';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsuarioDetailComponent } from './usuario/usuario-detail/usuario-detail.component';
import { PedidoComponent } from './pedido/pedido.component';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'pedido', component: PedidoComponent}
];

@NgModule({
  declarations: [
    AppHome,
    UsuarioComponent,
    WelcomeComponent,
    UsuarioDetailComponent,
    PedidoComponent,
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
    DropdownModule,
    ImageModule,
    InputNumberModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LoginService],
  bootstrap: [AppHome]
})
export class AppModule { }
