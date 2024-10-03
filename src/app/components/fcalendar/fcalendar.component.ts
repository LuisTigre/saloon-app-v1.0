import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-fcalendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './fcalendar.component.html',
  styleUrl: './fcalendar.component.scss'
})
export class FcalendarComponent  implements OnInit{
  @Input() schedule: any;
  @Input() weekCalendar: string | null = null;
  @Output() dateChange = new EventEmitter<Date>();
  @Output() triggleModal = new EventEmitter<void>();

  calendarOptions!: CalendarOptions;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.calendarOptions = {
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
      initialView: this.weekCalendar ? 'timeGridWeek' : 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: this.weekCalendar ? 'timeGridWeek,timeGridDay' : 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      slotLabelFormat: {
        hour: 'numeric', // display hour
        minute: '2-digit', // display minutes
        hour12: false // set to false for 24-hour format
      },
      selectable: true,
      selectMirror: true,
      weekends: true,
      events: this.schedule.events || [], // Assuming `schedule` contains events data
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
    };
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.dateChange.emit(selectInfo.start);
    this.triggleModal.emit(); // Trigger modal if needed
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }
}
