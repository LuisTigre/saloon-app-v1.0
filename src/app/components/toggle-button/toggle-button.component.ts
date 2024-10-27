import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {
  @Output() onClick = new EventEmitter()
  isPressed: boolean = false;
  isTransformBoxApplied: boolean = true;

  togglePressed() {
    this.isPressed = !this.isPressed;
    this.onClick.emit();
  }

  toggleTransformBox() {
    this.isTransformBoxApplied = !this.isTransformBoxApplied;
  }
  
}
