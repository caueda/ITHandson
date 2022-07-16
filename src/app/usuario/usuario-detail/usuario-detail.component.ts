import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {

  constructor() { }

  @Input()
  usuario: Usuario;

  ngOnInit(): void {
  }

}
