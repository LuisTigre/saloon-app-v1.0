import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { TimeslotComponent } from '../../components/timeslot/timeslot.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ScheduleDetailsComponent } from '../../components/scheduleDetails/scheduleDetails.component';
@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CalendarComponent, TimeslotComponent, ModalComponent, ScheduleDetailsComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  modalOpen: boolean = true;

  schedule: any;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.schedule = this.scheduleService.getScheduleData();
  }

  onDateChange( newDate: Date){
    this.selectedDate = newDate;
  }

  onTimeChange(newTime: string){
    this.selectedTime = newTime;
  }

  handleModalOpen(): void {
    this.modalOpen = true
  }

  
  handleModalClose(): void{
    this.modalOpen = false;

  }

}
