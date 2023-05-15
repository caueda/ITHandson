import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alert-dialog-component',
  templateUrl: './alert-dialog-component.component.html',
  styleUrls: ['./alert-dialog-component.component.css']
})
export class AlertDialogComponentComponent implements OnInit {

  @Input()  mensagem: string;

  @Input() onHide: ()=>void;

  @Input() closeDialog: ()=>void;

  constructor() { }

  ngOnInit(): void {
  }

}
