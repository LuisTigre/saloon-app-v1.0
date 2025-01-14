import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DefaultLayoutComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

}
