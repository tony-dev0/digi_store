import LoupeIcon from "@mui/icons-material/Loupe";
import {
  Day,
  Week,
  Month,
  Inject,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  DragAndDrop,
  Resize,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";
import toast from "react-hot-toast";

export default function calender() {
  registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);
  const data = [
    {
      Id: 1,
      Subject: "New Budget Report",
      StartTime: new Date(2025, 3, 11, 10, 0),
      EndTime: new Date(2025, 3, 11, 12, 30),
      IsAllDay: false,
    },
    {
      Id: 2,
      Subject: "Brainstorm Meeting Cohurt",
      StartTime: new Date(2025, 3, 10, 10, 0),
      EndTime: new Date(2025, 3, 10, 12, 30),
      IsAllDay: false,
      Status: "Completed",
      Priority: "High",
    },
  ];
  return (
    <>
      <div className="title-head-e m-3">
        {" "}
        <p> Event Management </p>{" "}
      </div>
      <div className="px-2">
        <div className="w-100 d-flex justify-content-end mb-2 mt-4">
          <button
            className="py-2 pe-3 btn btn-customx"
            onClick={() => toast("click on the calender to add new event")}
          >
            <LoupeIcon /> Add New Event
          </button>
        </div>
      </div>
      <div className="container">
        <main className="schedule-component mt-4">
          <ScheduleComponent
            width="100%"
            height="550px"
            eventSettings={{ dataSource: data }}
            selectedDate={new Date(2025, 3, 6)}
            currentView="Month"
          >
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="Week" />
              <ViewDirective option="Month" />
            </ViewsDirective>
            <Inject services={[Day, Week, Month, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </main>
      </div>
    </>
  );
}
