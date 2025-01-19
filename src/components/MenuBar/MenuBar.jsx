import React from "react";
import "./MenuBar.css";
import agendaIcon from "../../assets/svg/agenda_icon.svg";
import homeIcon from "../../assets/svg/home_icon.svg";
import taskIcon from "../../assets/svg/task_icon.svg";
import starIcon from "../../assets/svg/star_icon.svg";
import bellIcon from "../../assets/svg/bell_icon.svg";

function MenuBar({ currentView, setCurrentView }) {
    const menuItems = {
        Agenda: {
            name: "Agenda",
            icon: homeIcon,
            selectedClass: "agenda-selected"
        },
        Tasks: {
            name: "Tasks",
            icon: taskIcon,
            selectedClass: "tasks-selected"
        },
        Priority: {
            name: "Priority",
            icon: starIcon,
            selectedClass: "priority-selected"
        },
        Notifications: {
            name: "Notifications",
            icon: bellIcon,
            selectedClass: "notifications-selected"
        },
    };

    const handleClick = (view) => {
        setCurrentView(view);
    };

    return (
        <>
            <div className="row d-flex align-items-center p-3 pt-5">
                <div className="col-4 col-lg-4">
                    <div className="logo">
                        <img src={agendaIcon} alt="Agenda Icon" />
                    </div>
                </div>
                <div className="col-8 col-lg-8 mx-auto">
                    <h1>FlowMate</h1>
                </div>
                <nav className="mt-5">
                    <ul>
                        {Object.keys(menuItems).map((view) => {
                            const item = menuItems[view];
                            return (
                                <li key={view}
                                    onClick={() => handleClick(view)}
                                    className={currentView === view ? item.selectedClass : ""}>
                                    <img src={item.icon} alt={`${item.name} Icon`} />
                                    <p>{item.name}</p>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default MenuBar;
