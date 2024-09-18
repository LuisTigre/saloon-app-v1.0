import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { TimeslotComponent } from '../../components/timeslot/timeslot.component';
@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CalendarComponent, TimeslotComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

}
