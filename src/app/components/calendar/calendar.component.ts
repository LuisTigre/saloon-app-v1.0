
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [CommonModule] // Add CommonModule to imports
})
export class CalendarComponent implements OnInit {


  currentMonth: Date = new Date();
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: Array<{ date: number | null; day: number; available: boolean }> = [];
  selectedDay: number | null = null;

  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();
  
  ngOnInit(): void {
    this.updateCalendar();
  }
  
  prevMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.updateCalendar();
  }
  
  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.updateCalendar();
  }
  
  updateCalendar(): void {
    const firstDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
   
    const days: Array<{ date: number | null; day: number; available: boolean }> = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: i, day: new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), i).getDay(), available: true});
    }

    
    // Fill empty days
    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      days.unshift({ date: null, day: i, available: false });
    }

    this.calendarDays = days;
   
  }

  onDateSelect(day: { date: number | null }): void {
    if (day.date !== null) {
      this.selectedDay = day.date
      this.dateChange.emit(new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day.date));


      console.log(`Selected date: ${day.date}-${this.currentMonth.getMonth() + 1}-${this.currentMonth.getFullYear()}`);
    }
  }

  isToday(day: { date: number | null }): boolean {
    const today = new Date();
    return day.date !== null &&
           day.date === today.getDate() && 
           this.currentMonth.getMonth() === today.getMonth() && 
           this.currentMonth.getFullYear() === today.getFullYear();
  }

  isAnvailable(day: {date: number | null}): boolean {
    return day.date === 15;
  }
}
