import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions, DateSelectArg, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-fcalendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './fcalendar.component.html',
  styleUrls: ['./fcalendar.component.scss']
})
export class FcalendarComponent implements OnInit {
  @Input() schedule: any = {}; // Default to an empty object in case it's undefined
  @Input() weekCalendar: string | null = null;
  @Output() dateChange = new EventEmitter<Date>();
  @Output() triggleModal = new EventEmitter<void>();

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    initialView: this.weekCalendar ? 'timeGridWeek' : 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: this.weekCalendar ? 'timeGridWeek,timeGridDay' : 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    },
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    },
    eventContent: (arg) => {
      return { html: `<div class="fc-event-title">${arg.event.title}</div>` }; // Only show the title
    },
    selectable: true,
    selectMirror: true,
    weekends: true,
    editable: true, // Enable dragging of events
    events: [], // Initialize as an empty array
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
  };

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    // Ensure the 'events' property is set safely
    const eventsData = this.schedule?.events ?? []; // Default to an empty array if undefined
    if (Array.isArray(eventsData)) {
      this.calendarOptions.events = eventsData; // Use valid events
    } else {
      console.error('Invalid events data:', eventsData);
    }
    this.changeDetector.detectChanges(); // Trigger change detection to apply changes
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Enter Event Title:');
    if (title) {
      const newEvent: EventInput = {
        title: title,
        start: selectInfo.start, // Use the start date from DateSelectArg
        allDay: true,
      };
      // Add new event to the events array
      this.calendarOptions.events = [...(this.calendarOptions.events as EventInput[]), newEvent]; 
      this.changeDetector.detectChanges(); // Refresh calendar to show new event
      this.dateChange.emit(selectInfo.start);
      this.triggleModal.emit(); // Trigger modal if needed
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  }

  handleEventDrop(info: EventDropArg) {
    const droppedEvent = info.event; // This is the event that was dropped
    console.log('Event dropped:', droppedEvent.title);
    console.log('New start:', droppedEvent.start); // New start time
    console.log('New end:', droppedEvent.end); // New end time, if applicable

    // Logic to handle the event drop, e.g., save to backend
  }

  setUnavailableDaysStyle() {
    const unavailableEvents = document.querySelectorAll('.fc-day-unavailable');
    unavailableEvents.forEach(event => {
      const dayCell = event.closest('td');
      if (dayCell) {
        if (dayCell.querySelector('.fc-day-today')) {
          return;
        }
        dayCell.style.backgroundColor = 'rgba(211, 211, 211, 1)'; 
      }
    });
  }
}
