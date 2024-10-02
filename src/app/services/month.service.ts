import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MonthService {
  private currentMonthSubject = new BehaviorSubject<Date>(new Date());
  currentMonth$ = this.currentMonthSubject.asObservable();

  setCurrentMonth(month: Date): void {
    this.currentMonthSubject.next(month);
  }
}
