import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private firestore: AngularFirestore) {}

  addEvent(eventData: { title: string, imageUrl: string, description: string }): Promise<void> {
    const eventId = this.firestore.createId(); 
    return this.firestore.collection('evenements').doc(eventId).set(eventData);
  }

  getEvents(): Observable<any[]> {
    return this.firestore.collection('evenements').snapshotChanges();
  }

  updateEvent(eventId: string, eventData: { title: string, imageUrl: string, description: string }): Promise<void> {
    return this.firestore.collection('evenements').doc(eventId).update(eventData);
  }

  deleteEvent(eventId: string): Promise<void> {
    return this.firestore.collection('evenements').doc(eventId).delete();
  }
  
}
