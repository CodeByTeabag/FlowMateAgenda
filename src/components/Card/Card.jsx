import React, { useState } from "react";
import "./Card.css";
import AgendaView from "./AgendaView/AgendaView";
import TaskView from "./TaskView/TaskView";
import PriorityView from "./PriorityView/PriorityView";
import NotificationView from "./NotificationView/NotificationView";

function Card({ currentView }) {
  const [tasks, setTasks] = useState([]);

  const handleTasksUpdate = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const renderView = () => {
    switch (currentView) {
      case "Tasks":
        return {
          title: "Tasks",
          content: <TaskView onTasksChange={handleTasksUpdate} />,
        };
      case "Priority":
        return {
          title: "Priority",
          content: <PriorityView />,
        };
      case "Notifications":
        return {
          title: "Notifications",
          content: <NotificationView />,
        };
      default:
        return {
          title: "Agenda",
          content: <AgendaView tasks={tasks} />,
        };
    }
  };

  const { title, content } = renderView();

  return (
    <div className="p-3">
      <div className="card">
        <h2 className="ps-5 pt-4 pb-2">{title}</h2>
        <hr />
        {content}
      </div>
    </div>
  );
}

export default Card;
