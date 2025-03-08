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
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  mensaje: string = "";
  elemento: any;

  constructor( public _cs: ChatService){
    console.log(_cs);
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

  getFormattedDateTime(timestamp: number): string {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
  
    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();
  
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    if (isToday) return `Hoy, ${time}`;
    if (isYesterday) return `Ayer, ${time}`;
  
    return `${date.toLocaleDateString()} ${time}`;
  }
}
