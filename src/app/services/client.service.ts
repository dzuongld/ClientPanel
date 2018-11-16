import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  // firestore variables
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('client',
      ref => ref.orderBy('lastName', 'asc')); // sort alphabetically
  }

  getClients(): Observable<Client[]> {
    // get clients with id from collection
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(changes => changes.map(action => {
        const data = action.payload.doc.data() as Client;
        const id = action.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.clients;
  }

  getClient(id: string): Observable<Client> {
    // get client with id from document
    this.clientDoc = this.afs.doc<Client>(`client/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(actions => {
        // check for client existence
        if (actions.payload.exists === false) {
          return null;
        } else {
          const data = actions.payload.data() as Client;
          data.id = actions.payload.id;
          return { id, ...data };
        }
      })
    );
    return this.client;
  }

  addClient(client: Client) {
    this.clientsCollection.add(client);
  }

  updateClient(client: Client) {
    this.clientDoc = this.afs.doc(`client/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client) {
    this.clientDoc = this.afs.doc(`client/${client.id}`);
    this.clientDoc.delete();
  }
}
