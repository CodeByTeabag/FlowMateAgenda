import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./AgendaView.css";

function AgendaView({ tasks = [] }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (tasks.length === 0) return;
        const formattedEvents = tasks.map((task) => ({
            title: task.title,
            start: task.dateStarted,
            end: new Date(
                new Date(task.dateStarted).getTime() + parseDuration(task.duration)
            ).toISOString(),
        }));
        setEvents(formattedEvents);
    }, [tasks]);

    const parseDuration = (duration) => {
        const [value, unit] = duration.split(" ");
        return parseInt(value, 10) * (unit === "hour" ? 60 * 60 * 1000 : 60 * 1000);
    };

    return (
        <div className="agenda-view full-calendar-wrapper">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={events}
                headerToolbar={{
                    left: "prev,today",
                    center: "title",
                    right: "next",
                }}
                contentHeight="auto"
                height="80vh"
                slotMinTime="08:00:00"
                slotMaxTime="21:00:00"
            />
        </div>
    );
}


export default AgendaView;
