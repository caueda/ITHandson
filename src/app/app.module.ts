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
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CarouselModule} from 'primeng/carousel';
import {CardModule} from 'primeng/card';

import { AppHome } from './app.home';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsuarioDetailComponent } from './usuario/usuario-detail/usuario-detail.component';
import { PedidoComponent } from './pedido/pedido.component';
import { OfertaComponent } from './oferta/oferta.component';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'pedido', component: PedidoComponent},
  {path: 'oferta', component: OfertaComponent}
];

@NgModule({
  declarations: [
    AppHome,
    UsuarioComponent,
    WelcomeComponent,
    UsuarioDetailComponent,
    PedidoComponent,
    OfertaComponent,
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
    ConfirmDialogModule,
    DialogModule,
    InputTextareaModule,
    CarouselModule,
    CardModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ConfirmationService],
  bootstrap: [AppHome]
})
export class AppModule { }
