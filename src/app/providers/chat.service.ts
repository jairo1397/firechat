import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, CollectionReference, addDoc, query, orderBy, limit } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from '../interfaces/mensaje.interface'
import { map } from 'rxjs/operators';

import { Auth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private auth = inject(Auth);

  private itemsCollection!: CollectionReference<Mensaje>;

  public chats: any[] = [];

  public usuario: any = {};

  constructor(private firestore: Firestore
  ) {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        console.log('Usuario autenticado:', user);
        this.usuario.nombre = user.displayName;
        this.usuario.email = user.email;
        this.usuario.uid = user.uid;
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }

  login(proveedor: string) {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then(result => console.log('Usuario autenticado:', result.user))
      .catch(error => console.error('Error en login:', error));
  }

  logout() {
    signOut(this.auth).then(() => console.log('Sesión cerrada'));
    this.usuario = {};
  }

  cargarMensajes(): Observable<Mensaje[]> {
    // ✅ Especificar el tipo `Mensaje` en `collection()`
    const itemsCollection = query(
      collection(this.firestore, 'chats') as CollectionReference<Mensaje>,
      orderBy('fecha', 'desc'), // Ordenar por fecha descendente (los más recientes primero)
      limit(5) // Limitar a 5 mensajes
    );

    return collectionData(itemsCollection).pipe(
      map((mensajes: Mensaje[]) => {
        this.chats = []; 
        for(let mensaje of mensajes){
          this.chats.unshift(mensaje);
        }
        return mensajes; 
      })
    );
  }

  agregarMensaje(texto: string) {
    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid:this.usuario.uid
    };

    // Asegurar que itemsCollection esté correctamente definido
    this.itemsCollection = collection(this.firestore, 'chats') as CollectionReference<Mensaje>;

    return addDoc(this.itemsCollection, mensaje);
  }
}