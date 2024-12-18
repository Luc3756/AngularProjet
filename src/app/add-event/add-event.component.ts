import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(private eventService: EventService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        this.eventForm.patchValue({
          imageUrl: reader.result as string,
        });
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {

    const confirmation = confirm('Êtes-vous sûr de vouloir ajouter cet événement ?');
    
    if (confirmation) {
      if (this.eventForm.valid) {
        this.eventService.addEvent(this.eventForm.value).then(() => {
          console.log('Événement ajouté avec succès');
          this.eventForm.reset();
        }).catch((error) => {
          console.error('Erreur lors de l\'ajout de l\'événement :', error);
        });
      } else {
        console.log('Formulaire invalide');
      }
    } else {
      console.log('Ajout de l\'événement annulé');
    }
  }
}
