import React, { useEffect, useState } from "react";
import "./TaskView.css";
import TaskModal from "./TaskModal/TaskModal";
import editIcon from "../../../assets/svg/edit_icon.svg";
import trashIcon from "../../../assets/svg/trash_icon.svg";

function TaskView({ onTasksChange }) {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [modalData, setModalData] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} | ${hours}:${minutes}`;
    };

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
        if (onTasksChange) {
            onTasksChange(savedTasks);
        }
    }, [onTasksChange]);

    const updateTasks = (newTasks) => {
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        if (onTasksChange) {
            onTasksChange(newTasks);
        }
    };

    const addTask = (task) => {
        updateTasks([...tasks, task]);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((_, i) => i !== taskId);
        updateTasks(updatedTasks);
    };

    const updateTask = (updatedTask) => {
        const updatedTasks = tasks.map((task, i) =>
            i === editingTaskId ? updatedTask : task
        );
        updateTasks(updatedTasks);
        setEditingTaskId(null);
    };

    const handleUpdate = (taskId) => {
        setEditingTaskId(taskId);
        setModalData(tasks[taskId]);
    };

    return (
        <section className="container">
            <TaskModal addTask={addTask} updateTask={updateTask} editingTask={modalData} setModalData={setModalData} />
            {tasks.length === 0 ? (
                <div className="container-center d-flex flex-column justify-content-center align-items-center">
                    <i className="mb-5">There are no tasks active at the moment...</i>
                    <button type="button" className="btn-fade" data-bs-toggle="modal" data-bs-target="#taskModal">
                        <p>+ Add a task</p>
                    </button>
                </div>
            ) : (
                <>
                    <button type="button" className="btn-fade mb-5" data-bs-toggle="modal" data-bs-target="#taskModal">
                        <p>+ Add a task</p>
                    </button>
                    {tasks.map((task, taskId) => (
                        <div key={taskId} className="row task-card mb-5 ms-1 me-1 align-items-center">
                            <div className="col-10 text-start">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <b>Starts: </b>
                                <small>{formatDate(task.dateStarted)}</small>
                                <br />
                                <b>Duration: </b>
                                <small>{task.duration}</small>
                            </div>
                            <div className="col-2 d-flex justify-content-center align-items-center">
                                <img src={editIcon} onClick={() => handleUpdate(taskId)} alt="edit_icon" className="me-5" data-bs-toggle="modal" data-bs-target="#taskModal" />
                                <img src={trashIcon} onClick={() => deleteTask(taskId)} alt="trash_icon" />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </section>
    );
}

export default TaskView;
