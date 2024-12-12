import './App.css';
import { useState } from 'react';

function TodoList() {
  const [taskTitle, setTaskTitle] = useState(''); //welcome
  const [taskDiscription, setDiscription] = useState('');
  const [taskDate, setTaskDate] = useState('');

  const [allData, setAllData] = useState([]);

  const [editIndex, setEditIndex] = useState(null); 

  function submitForm() {
    const newTask = {
      title: taskTitle,
      date: taskDate,
      discription: taskDiscription,
    };

    setAllData([...allData, newTask]);
    setTaskTitle('');
    setTaskDate('');
    setDiscription('');
  }

  // Delete Task
  function deleteTask(index) {
    const updatedData = allData.filter((datas, list) => list !== index); 
    setAllData(updatedData);
  }



  // Open Edit Modal
  function openEditModal(index) {
    setEditIndex(index);

    const taskToEdit = allData[index];
    setTaskTitle(taskToEdit.title);
    setTaskDate(taskToEdit.date);
    setDiscription(taskToEdit.discription);
  }

  // Save Edited Task
  function saveEditedTask() {
    const updatedData = [...allData];
    updatedData[editIndex] = {
      title: taskTitle,
      date: taskDate,
      discription: taskDiscription,
    };
    setAllData(updatedData);
    setEditIndex(null);
    setTaskTitle('');
    setTaskDate('');
    setDiscription('');
  }

  return (
    <>
      <div className="overall-content">
        <div className="content">
          <div className="task-manager-header">
            <form>
              <div className="row">
                <div className="col-md-6">
                  <label>Task Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Enter Task"
                  />
                </div>
                <div className="col-md-6">
                  <label>Task Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    placeholder="Enter Task"
                  />
                </div>
                <div className="col-md-12">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter Task"
                    value={taskDiscription}
                    onChange={(e) => setDiscription(e.target.value)}
                  ></textarea>
                </div>
                <div className="col-md-12 mt-3">
                  <input
                    type="button"
                    onClick={submitForm}
                    className="form-control btn btn-primary"
                    value="Add Task"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="task-manager-body mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allData.map((task, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.date}</td>
                    <td>{task.discription}</td>
                    <td className='overall'>
                      <button
                        className="btn del btn-danger me-2"
                        onClick={() => deleteTask(index)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-warning edit"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        onClick={() => openEditModal(index)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label>Task Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Task Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea
                  className="form-control"
                  value={taskDiscription}
                  onChange={(e) => setDiscription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={saveEditedTask}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;