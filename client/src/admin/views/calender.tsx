
import {
   Day,
   Week,
   Month,
   Inject, 
   ScheduleComponent,
   ViewDirective,
   ViewsDirective,
   } from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";

export default function calender() {
registerLicense("Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhNYVZpR2Nbek5xflZDal1RVBYiSV9jS3tTdUVlWHxdd3BVQWZcWQ==");
const data = [
  {
  Id: 1,
  Subject: "New Budget Report",
  StartTime: new Date(2025, 3, 11, 10, 0),
  EndTime: new Date(2025, 3, 11, 12, 30),
  IsAllDay: false
  },
  {
  Id: 2,
  Subject: "Brainstorm Meeting Cohurt",
  StartTime: new Date(2025, 3, 10, 10, 0),
  EndTime: new Date(2025, 3, 10, 12, 30),
  IsAllDay: false,
  Status:"Completed",
  Priority:"High"
  }
]
  return (
    <main className="schedule-component">
 <ScheduleComponent 
 width={800}
 height={600}
 eventSettings={{dataSource:data}}
 selectedDate={new Date(2025, 3, 6)}
 currentView="Month"
 >
    <ViewsDirective>
    <ViewDirective option="Day" />
    <ViewDirective option="Week" />
    <ViewDirective option="Month" />
    </ViewsDirective>
    <Inject services={[Day, Week, Month]} />
</ ScheduleComponent>
    </main>
  )
}
