import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimeSlot {
  start: Date;
  end: Date;
  bookable?: boolean;
}

@Component({
  selector: 'app-timeslot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.scss']
})

export class TimeslotComponent implements OnInit{
  @Input() selectedDate: Date | null = null;
  serviceDuration: number = 44 * 60 * 1000; // 30 minutes in milliseconds
  operatingHours: TimeSlot;
  unbookableSlots: Array<TimeSlot> = [];
  availableSlots: Array<TimeSlot> = [];

  constructor() {
    this.operatingHours = {
      start: new Date("2024-09-18T09:00:00"),
      end: new Date("2024-09-18T17:00:00")
    };    
    this.unbookableSlots = [
      { start: new Date("2024-09-18T10:00:00"), end: new Date("2024-09-18T12:00:00") },
      { start: new Date("2024-09-18T14:00:00"), end: new Date("2024-09-18T15:00:00") }
    ];
  }

  ngOnInit(): void {
    this.showAvailableTimeSlots();
  }
  
  showAvailableTimeSlots(): void {
    const startMillis = this.operatingHours.start.getTime();
    const endMillis = this.operatingHours.end.getTime();
    let currentStart = startMillis;
  
    while (currentStart + this.serviceDuration <= endMillis) {
      const slotStart = new Date(currentStart);
      const slotEnd = new Date(currentStart + this.serviceDuration);
  
      // Check if this slot overlaps with any unbookable slots
      const overlappingUnbookableSlot = this.unbookableSlots.find(unbookableSlot => 
        (slotStart < unbookableSlot.end) && (slotEnd > unbookableSlot.start)
      );
  
      if (overlappingUnbookableSlot) {
        // Slot overlaps with an unbookable slot, mark accordingly
        if (slotStart < overlappingUnbookableSlot.start) {
          // Add available slot before the unbookable slot
          this.availableSlots.push({ start: slotStart, end: overlappingUnbookableSlot.start, bookable: true });
        }
  
        // Add unbookable slot
        this.availableSlots.push({ start: overlappingUnbookableSlot.start, end: overlappingUnbookableSlot.end, bookable: false });
  
        // Move currentStart to the end of the unbookable slot
        currentStart = overlappingUnbookableSlot.end.getTime();
      } else {
        // Slot does not overlap with any unbookable slots
        this.availableSlots.push({ start: slotStart, end: slotEnd, bookable: true });
        currentStart += this.serviceDuration; // Move to the next slot
      }
    }
  }
  


  setDateToString(date : Date): string{
    let hour = date.getHours().toString().length == 1 ? '0'+date.getHours() : date.getHours();
    let min = date.getMinutes() === 0? "00" : date.getMinutes();
  
    return `${hour}:${min}`;
  }




  selectTimeSlot(event: any): void {
    const selectedElement = event.target; 
    const timeSlot = selectedElement.getAttribute('data-timeslot'); 
    console.log('Selected time slot:', timeSlot);
  
    
    const allSlots = document.querySelectorAll('.info');
    allSlots.forEach(slot => {
      slot.classList.remove('selected');
    });
  
   
    selectedElement.classList.add('selected');
  }
  
  calculateSlotWidth(slot: TimeSlot): number {
    const totalOperatingTime = this.operatingHours.end.getTime() - this.operatingHours.start.getTime();
    const slotDuration = slot.end.getTime() - slot.start.getTime();
    return (slotDuration / totalOperatingTime) * 100; // Returns the percentage width
  }
  
  
  
}



