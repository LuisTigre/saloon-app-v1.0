import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private scheduleData = {
    "adminId": "12345",
    "weeklySchedule": [ 
      {
        period: { start:"2024-12-01", end:"2024-12-31"}, 
        active: true,
        default: false,
        data:[
          {
            "available": false,
            "timeSlots": [],
            "weekname": "Sunday"
          },
          {
            "available": true,
            "timeSlots": [
              {
                "startTime": "09:00",
                "endTime": "17:00"
              }
            ],
            "weekname": "Monday"
          },
          {
            "available": true,
            "timeSlots": [
              {
                "startTime": "10:00",
                "endTime": "18:00"
              }
            ],
            "weekname": "Tuesday"
          },
          {
            "available": true,
            "timeSlots": [
              {
                "startTime": "09:00",
                "endTime": "17:00"
              }
            ],
            "weekname": "Wednesday"
          },
          {
            "available": true,
            "timeSlots": [],
            "weekname": "Thursday"
          },
          {
            "available": true,
            "timeSlots": [
              {
                "startTime": "09:00",
                "endTime": "17:00"
              }
            ],
            "weekname": "Friday"
          },
          {
            "available": false,
            "timeSlots": [],
            "weekname": "Saturday"
          }
        ]
      },{
        period: null, 
        active: true,
        default: true,
        data:[
          {
            "available": false,
            "timeSlots": [],
            "weekname": "Sunday"
          },
          {
            "available": true,
            "timeSlots": [
              {
                "startTime": "09:00",
                "endTime": "17:00"
              }
            ],
            "weekname": "Monday"
          },
          {
            "available": true,
            "timeSlots": [
              {
                "startTime": "10:00",
                "endTime": "18:00"
              }
            ],
            "weekname": "Tuesday"
          },
          {
            "available": true,
            "timeSlots": [
              {
                "startTime": "09:00",
                "endTime": "17:00"
              }
            ],
            "weekname": "Wednesday"
          },
          {
            "available": true,
            "timeSlots": [],
            "weekname": "Thursday"
          },
          {
            "available": true,
            "timeSlots": [
              {
                "startTime": "09:00",
                "endTime": "17:00"
              }
            ],
            "weekname": "Friday"
          },
          {
            "available": false,
            "timeSlots": [],
            "weekname": "Saturday"
          }
        ]
      },
    ],
    "exceptions": {
      "unavailableDays": [
        {
          "date": "2024-09-25",
          "available": false,
          "note": "Holiday - Closed"
        }
      ],
      "specialEvents": [
        {
          "date": "2024-09-26",
          "available": true,
          "timeSlots": [
            {
              "startTime": "11:00",
              "endTime": "15:00"
            }
          ],
          "note": "Special Event"
        }
      ]
    }
  }

  constructor() { }

  getScheduleData() {
    return this.scheduleData;
  }
}
