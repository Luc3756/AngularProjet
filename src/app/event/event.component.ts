import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  events: any[] = [];
  selectedEvent: any = null;
  eventForm: FormGroup;

  constructor(private eventService: EventService, private formBuilder: FormBuilder) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data.map((e) => ({
        id: e.payload.doc.id,
        ...e.payload.doc.data(),
      }));
    });
  }

  selectEvent(event: any): void {
    this.selectedEvent = event;
    this.eventForm.patchValue({
      title: event.title,
      imageUrl: event.imageUrl,
      description: event.description,
    });
  }

  saveChanges(): void {
    if (this.eventForm.valid && this.selectedEvent) {
      const updatedData = this.eventForm.value;
      this.eventService.updateEvent(this.selectedEvent.id, updatedData).then(() => {
        console.log('Événement mis à jour');
        this.selectedEvent = null;
        this.loadEvents();
      });
    }
  }

  cancelEdit(): void {
    this.selectedEvent = null;
  }

  deleteEvent(): void {
    if (this.selectedEvent && confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.eventService.deleteEvent(this.selectedEvent.id).then(() => {
        console.log('Événement supprimé');
        this.selectedEvent = null;
        this.loadEvents();
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.eventForm.get('imageUrl')?.setValue(reader.result as string); 
      };
      reader.readAsDataURL(file);
    }
  }
}
