import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../providers/chat.service';
@Component({
  selector: 'app-login',
  standalone: true, // Asegúrate de que esté habilitado como standalone
  imports: [CommonModule], // Importa CommonModule si usas directivas de Angular como *ngIf o *ngFor
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( public _cs: ChatService){

  }

  ingresar(proveedor: string){
    console.log(proveedor);

    this._cs.login(proveedor);
  }
}
