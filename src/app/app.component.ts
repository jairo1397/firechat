import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

// COMPONENTES
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
// SERVICIOS
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    CommonModule, 
    ChatComponent,
    LoginComponent
  ],
  providers: [
    ChatService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  chats: Observable<any[]>; // Observable para la lista de items
  private firestore = inject(Firestore); // Inyección moderna
  public cs = inject(ChatService);
  
  constructor() {
    const colRef = collection(this.firestore, 'chats'); // Reemplaza con el nombre de tu colección
    this.chats = collectionData(colRef); // Asigna el observable para usar en el template
  }
}