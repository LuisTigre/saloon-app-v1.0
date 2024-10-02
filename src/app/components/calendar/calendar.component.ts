
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MonthService } from '../../services/month.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [CommonModule] // Add CommonModule to imports
})
export class CalendarComponent implements OnInit {

  @Input() weekCalendar?: String;
  currentMonth: Date = new Date();

  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: Array<{ date: number | null; day: number; available: boolean }> = [];
  selectedDay: number | null = 0;

  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() triggleModal = new EventEmitter<void>();

  @Input() schedule: any;
  
  constructor(private monthService: MonthService) {}

  ngOnInit(): void {
    this.monthService.currentMonth$.subscribe(month => {
      this.currentMonth = month;
      this.updateCalendar();    
    });
  }

  ngChanges(): void {
    this.updateCalendar();    
  }

  handleMonthChange(newMonth: Date): void {
    this.monthService.setCurrentMonth(newMonth);
  }
  
  prevMonth(): void {   
    if(this.currentMonth){
      this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);    
      this.handleMonthChange(this.currentMonth)
      this.updateCalendar();

    }     
  }
  
  nextMonth(): void {   
    if(this.currentMonth){
      this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
      this.handleMonthChange(this.currentMonth)    
      this.updateCalendar();
    }
  }

  prevWeek(): void {    
      let intWeekCalendar = Number(this.weekCalendar);
      intWeekCalendar -= 1;
      if(intWeekCalendar == 0){
        intWeekCalendar = 5;       
      }
      this.weekCalendar = intWeekCalendar.toString(); 
      this.updateCalendar();   

  }
  nextWeek(): void {    
      let intWeekCalendar = Number(this.weekCalendar);
      intWeekCalendar += 1;
    if(intWeekCalendar > 5){
        intWeekCalendar = 1;
      }
      this.weekCalendar = intWeekCalendar.toString();
      this.updateCalendar();
    
  }


  OpenModal(): void{
    this.triggleModal.emit();
  }

  updateCalendar(): void {

    
      const firstDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
      const lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    
      const days: Array<{ date: number | null; day: number; available: boolean }> = [];
      

      for (let i = 1; i <= lastDay.getDate(); i++) {
        let year = this.currentMonth.getFullYear();
        let month = this.currentMonth.getMonth();
        let day = new Date(year, month, i).getDay(); // Get the day (0-6)
      
        // Access the 'available' property from the schedule based on the day of the week
        let available = this.schedule.weeklySchedule[0].data[day]?.available;
      
        days.push({ date: i, day: day, available: available });
      }

        
      // Fill empty days
      const startDay = firstDay.getDay();
      for (let i = 0; i < startDay; i++) {
        days.unshift({ date: null, day: i, available: false });
      }

      this.calendarDays = days;

      if(this.weekCalendar){
        this.calendarDays = this.filterCalendarDaysByWeek(Number(this.weekCalendar));
      }   
   
  }
  
  onDateSelect(day: { date: number | null }): void {
    if (day.date !== null) {
      this.selectedDay = day.date
      this.dateChange.emit(new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day.date));


      console.log(`Selected date: ${day.date}-${this.currentMonth.getMonth() + 1}-${this.currentMonth.getFullYear()}`);
    }
  }

  filterCalendarDaysByWeek(weekNumber: number): any[] {
    
    let startIndex = (weekNumber - 1) * 7; 
    let endIndex = 0;
    if(weekNumber <= 4){
      endIndex = startIndex + 6;       
    }else{
      endIndex = this.calendarDays.length - 1

    }
     
    return this.calendarDays.filter((day, index) => {
      
      if(index >= startIndex && index <= endIndex){
        return true;
      }else{
        return false;
      }
      
    });
  }
  

  isToday(day: { date: number | null }): boolean {
   
      const today = new Date();
      return day.date !== null &&
             day.date === today.getDate() && 
             this.currentMonth.getMonth() === today.getMonth() && 
             this.currentMonth.getFullYear() === today.getFullYear();
   
  }

}
