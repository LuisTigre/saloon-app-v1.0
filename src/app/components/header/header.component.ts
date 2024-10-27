import { Component, EventEmitter, Output } from '@angular/core';
import { ToggleButtonComponent } from '../../components/toggle-button/toggle-button.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output() toggleMenu = new EventEmitter();

  handleToggleMenu(): void{
    this.toggleMenu.emit();
  }

}
