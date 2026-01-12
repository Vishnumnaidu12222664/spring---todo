// import "../styles/dashboard.css";

// export default function Sidebar() {
//   return (
//     <div className="sidebar">
//       {/* LOGO / APP NAME */}
//       <h2 className="logo">TodoApp</h2>

//       {/* NAVIGATION */}
//       <ul className="nav-links">
//         <li className="active">Dashboard</li>
//         <li>My Tasks</li>
//         <li>Completed</li>
//       </ul>

//       {/* LOGOUT */}
//       <button
//         className="logout-btn"
//         onClick={() => {
//           localStorage.removeItem("token");
//           window.location.href = "/";
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }
// import "../styles/navbar.css";

// export default function Navbar() {
//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   return (
//     <nav className="navbar">
//       <h2 className="logo">TodoApp</h2>

//       <ul className="nav-links">
//         <li className="active">Dashboard</li>
//         <li>My Tasks</li>
//         <li>Completed</li>
//       </ul>

//       <button className="logout-btn" onClick={logout}>
//         Logout
//       </button>
//     </nav>
//   );
// }

import "../styles/navbar.css";

// export default function Navbar({ activePriority, setActivePriority }) {
//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   return (
//     <nav className="navbar">
//       <h2 className="logo">TodoApp</h2>

//       <ul className="nav-links">
//         <li className="active">Dashboard</li>
//         <li>My Tasks</li>
//         <li>Completed</li>
//       </ul>

//       {/* 🔽 PRIORITY FILTER */}
//       <select
//         className="priority-filter"
//         value={activePriority}
//         onChange={(e) => setActivePriority(e.target.value)}
//       >
//         <option value="ALL">All</option>
//         <option value="URGENT">Urgent</option>
//         <option value="NORMAL">Normal</option>
//         <option value="LATER">Later</option>
//       </select>

//       <button className="logout-btn" onClick={logout}>
//         Logout
//       </button>
//     </nav>
//   );
export default function Navbar({
  activePriority,
  setActivePriority,
  activeTab,
  setActiveTab,
}) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h2 className="logo">TodoApp</h2>

      <ul className="nav-links">
        <li
          className={activeTab === "DASHBOARD" ? "active" : ""}
          onClick={() => setActiveTab("DASHBOARD")}
        >
          Dashboard
        </li>

        <li
          className={activeTab === "MY_TASKS" ? "active" : ""}
          onClick={() => setActiveTab("MY_TASKS")}
        >
          My Tasks
        </li>

        <li
          className={activeTab === "COMPLETED" ? "active" : ""}
          onClick={() => setActiveTab("COMPLETED")}
        >
          Completed
        </li>
      </ul>

      <select
        className="priority-filter"
        value={activePriority}
        onChange={(e) => setActivePriority(e.target.value)}
      >
        <option value="ALL">All</option>
        <option value="URGENT">Urgent</option>
        <option value="NORMAL">Normal</option>
        <option value="LATER">Later</option>
      </select>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}


