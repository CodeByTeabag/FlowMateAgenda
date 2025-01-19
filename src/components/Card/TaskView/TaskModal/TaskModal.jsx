import React, { useState, useEffect } from "react";

function TaskModal({ addTask, updateTask, editingTask, setModalData }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateStarted, setDateStarted] = useState("");
    const [duration, setDuration] = useState("");
    const [timeUnit, setTimeUnit] = useState("min");

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setDateStarted(editingTask.dateStarted);
            const [durationValue, durationUnit] = editingTask.duration.split(" ");
            setDuration(durationValue);
            setTimeUnit(durationUnit);
        } else {
            resetFields();
        }
    }, [editingTask]);

    const resetFields = () => {
        setTitle("");
        setDescription("");
        setDateStarted("");
        setDuration("");
        setTimeUnit("min");
    };

    const handleSubmit = () => {
        if (!title || !dateStarted) {
            alert("Title and Date Started are required!");
            return;
        }

        const newTask = {
            title,
            description,
            dateStarted,
            duration: `${duration} ${timeUnit}`,
        };

        if (editingTask) {
            updateTask(newTask);
        } else {
            addTask(newTask);
        }

        resetFields();
        setModalData(null);
    };

    return (
        <div className="modal fade" id="taskModal" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{editingTask ? "EDIT TASK" : "ADD A NEW TASK"}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetFields}></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" placeholder="What needs to be done?" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <br />
                        <input type="text" className="mt-2" placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} />
                        <br />
                        <input type="datetime-local" className="mt-2" value={dateStarted} onChange={(e) => setDateStarted(e.target.value)} />
                        <br />
                        <div className="d-flex justify-content-between">
                            <input type="text" className="mt-2" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)}/>
                            <select name="time" className="mt-2" id="time" value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)}>
                                <option value="min">min</option>
                                <option value="hour">hour</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-fade" onClick={handleSubmit} data-bs-dismiss="modal">
                            <p>{editingTask ? "Update Task" : "Create Task"}</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskModal;
