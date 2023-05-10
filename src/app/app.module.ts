import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
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
import {InputTextModule} from 'primeng/inputtext';
import {ChartModule} from 'primeng/chart';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

import { AppHome } from './app.home';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsuarioDetailComponent } from './usuario/usuario-detail/usuario-detail.component';
import { PedidoComponent } from './pedido/pedido.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ProdutoComponent } from './produto/produto.component';
import { ResumoPedidoComponent } from './pedido/resumo-pedido/resumo-pedido.component';
import { UsuarioMainPageComponent } from './usuario/usuario-main-page.component';
import { UsuarioConsultaComponent } from './usuario/usuario-consulta.component';
import { UsuarioEditComponent } from './usuario/usuario-edit.component';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'usuario', component: UsuarioMainPageComponent, children: [
    {path: '', component: UsuarioComponent},
    {path:'cadastrar', component: UsuarioComponent},
    {path:'consultar', component: UsuarioConsultaComponent},
  ]},
  {path: 'pedido', component: PedidoComponent},
  {path: 'oferta', component: OfertaComponent},
  {path: 'produto', component: ProdutoComponent}
];

@NgModule({
  declarations: [
    AppHome,
    UsuarioComponent,
    UsuarioConsultaComponent,
    WelcomeComponent,
    UsuarioDetailComponent,
    PedidoComponent,
    OfertaComponent,
    ProdutoComponent,
    ResumoPedidoComponent,
    UsuarioMainPageComponent,
    UsuarioEditComponent
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
    PaginatorModule,
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
    InputTextModule,
    ChartModule,
    DynamicDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  bootstrap: [AppHome]
})
export class AppModule { }
