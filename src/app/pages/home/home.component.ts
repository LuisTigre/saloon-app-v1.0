import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
     HeaderComponent,
     FooterComponent,
     MatSidenavModule,
     MatButtonModule,
     DefaultLayoutComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showFiller = false;
}
