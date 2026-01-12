import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("NORMAL");
  const [status, setStatus] = useState("NOT_STARTED");
  
  const [activeTab, setActiveTab] = useState("DASHBOARD");

  const [activeStatus, setActiveStatus] = useState("ALL");
  const [activePriority, setActivePriority] = useState("ALL");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await api.get("/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title || !description || !deadline) {
      alert("Fill all fields");
      return;
    }

    await api.post(
      "/todos",
      { title, description, deadline, priority, status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("NORMAL");
    setStatus("NOT_STARTED");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTodos();
  };

  const updateTodo = async (todo, updates) => {
    await api.put(
      `/todos/${todo.id}`,
      { ...todo, ...updates },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTodos();
  };

  // const filteredTodos = todos.filter((todo) => {
  //   if (activeStatus !== "ALL" && todo.status !== activeStatus) return false;
  //   if (activePriority !== "ALL" && todo.priority !== activePriority)
  //     return false;
  //   return true;
  // });

  const filteredTodos = todos.filter((todo) => {
  // TAB FILTER
  if (activeTab === "MY_TASKS") {
    if (todo.status === "DONE") return false;
  }

  if (activeTab === "COMPLETED") {
    if (todo.status !== "DONE") return false;
  }

  // PRIORITY FILTER
  if (activePriority !== "ALL" && todo.priority !== activePriority)
    return false;

  return true;
});


  const stats = {
    done: todos.filter((t) => t.status === "DONE").length,
    missed: todos.filter((t) => t.status === "MISSED").length,
    pending: todos.filter(
      (t) => t.status === "NOT_STARTED" || t.status === "IN_PROGRESS"
    ).length,
  };

  return (
    <>
      {/* <Navbar /> */}
      {/* <Navbar
  activePriority={activePriority}
  setActivePriority={setActivePriority}
/> */}

<Navbar
  activePriority={activePriority}
  setActivePriority={setActivePriority}
  activeTab={activeTab}
  setActiveTab={setActiveTab}
/>



      <main className="dashboard-main">
        <h2 className="page-title">Your Tasks</h2>

        <div className="stats">
          <div className="stat-card done">
            <h3>{stats.done}</h3>
            <p>Done</p>
          </div>

          <div className="stat-card pending">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card missed">
            <h3>{stats.missed}</h3>
            <p>Missed</p>
          </div>
        </div>

        <div className="todo-form">
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
          </select>

          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="URGENT">Urgent</option>
            <option value="NORMAL">Normal</option>
            <option value="LATER">Later</option>
          </select>

          <button onClick={addTodo}>Add Task</button>
        </div>

        {filteredTodos.length === 0 ? (
          <div className="empty">No tasks found</div>
        ) : (
          <div className="todo-list">
            {filteredTodos.map((todo) => (
              <div className="todo-card" key={todo.id}>
                <h4>{todo.title}</h4>
                <p>{todo.description}</p>
                <small>Deadline: {todo.deadline}</small>

                <div className="meta">
                  <span className={`priority ${todo.priority.toLowerCase()}`}>
                    {todo.priority}
                  </span>
                  <span className="status">{todo.status}</span>
                </div>

                <div className="actions">
                  {todo.status !== "DONE" && (
                    <button onClick={() => updateTodo(todo, { status: "DONE" })}>
                      Mark Done
                    </button>
                  )}
                  <button className="delete" onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

