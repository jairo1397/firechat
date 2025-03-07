import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Importa FormsModule
import { ChatService } from '../../providers/chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  mensaje: string = "";
  elemento: any;

  constructor( public _cs: ChatService){
    this._cs.cargarMensajes().subscribe(
      () => {
        setTimeout( () => {
            this.elemento.scrollTop = this.elemento.scrollHeight;
          }, 20)
      }
    );
  }

  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje(){
    if(this.mensaje.length === 0){
      return;
    }
    this._cs.agregarMensaje(this.mensaje)
      .then( ()=>this.mensaje = "")
      .catch( (err: any) => console.error('Error al enviar mensaje', err) );
  }
}
