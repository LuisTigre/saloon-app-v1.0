import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() open: boolean = false 
  @Input() title: string = "";
  @Output() triggerModal = new EventEmitter();

openModal(): void{
  this.open = true;
  this.triggerModal.emit();
}

closeModal(): void{
  this.open = false;
  this.triggerModal.emit(this.open);
}

}

