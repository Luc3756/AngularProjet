import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../services/event.service'; 

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  eventForm!: FormGroup; 

  constructor(private eventService: EventService) { }  

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      title: new FormControl('', [Validators.required]),  
      imageUrl: new FormControl('', [Validators.required]), 
      description: new FormControl('', [Validators.required])  
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventService.addEvent(this.eventForm.value).then(() => {
        console.log('Événement ajouté avec succès');
      }).catch((error: any) => { 
        console.error('Erreur lors de l\'ajout de l\'événement :', error);
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
