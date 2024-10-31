import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FcalendarComponent } from '../../components/fcalendar/fcalendar.component';
import { TimeslotComponent } from '../../components/timeslot/timeslot.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ScheduleDetailsComponent } from '../../components/scheduleDetails/scheduleDetails.component';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FcalendarComponent,
    TimeslotComponent,
    ModalComponent,
    ScheduleDetailsComponent,
    DefaultLayoutComponent
  ],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  selectedDate: Date | null = null;
  modalOpen: boolean = false;
  schedule: any;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.schedule = this.scheduleService.getScheduleData();
  }

  onDateChange(newDate: Date) {
    this.selectedDate = newDate;
  }

  handleModalOpen(): void {
    this.modalOpen = true;
  }

  handleModalClose(): void {
    this.modalOpen = false;
  }

}
