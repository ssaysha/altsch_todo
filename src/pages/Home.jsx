import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  // Page title
  useEffect(() => {
    document.title = "Todo App";
  }, []);

  // 50 Tasks
  const initialTodos = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Task ${i + 1}`,
    details: `Details for Task ${i + 1}`,
    completed: i % 3 === 0,
  }));

  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [page, setPage] = useState(1);
  const tasksPerPage = 10;

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Add Task
  const addTask = () => {
    if (!title.trim()) return;
    const newTask = { id: Date.now(), title, details, completed: false };
    setTodos([newTask, ...todos]);
    setTitle("");
    setDetails("");
  };

  // Toggle Task
  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Filtered + Searched Todos
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && todo.completed) ||
      (filter === "incomplete" && !todo.completed);

    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredTodos.length / tasksPerPage));
  const start = (page - 1) * tasksPerPage;
  const visibleTodos = filteredTodos.slice(start, start + tasksPerPage);

  // Reset page if filter/search changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm, filter, todos]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
      <p className="text-center mb-4">Total Tasks: {todos.length}</p>

      {/* Add Task */}
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        placeholder="Task details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <div className="mb-4 flex gap-2">
        <button
          onClick={addTask}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Task
        </button>
        <button
          onClick={() => {
            setTitle("");
            setDetails("");
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Clear
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded ${
              filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("incomplete")}
            className={`px-3 py-1 rounded ${
              filter === "incomplete" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Incomplete
          </button>
        </div>
      </div>

      {/* Task List */}
      {visibleTodos.length === 0 ? (
        <p className="text-center">No tasks available</p>
      ) : (
        <ul className="space-y-3">
          {visibleTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-3 border rounded"
            >
              <div>
                <strong>{todo.title}</strong>
                <div>{todo.details}</div>
                <div>{todo.completed ? "Completed" : "Incomplete"}</div>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/todos/${todo.id}`}
                  className="px-2 py-1 bg-blue-600 text-white rounded"
                >
                  Details
                </Link>
                <button
                  onClick={() => toggleCompleted(todo.id)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Toggle
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm("Are you sure you want to delete this task?")
                    ) {
                      deleteTask(todo.id);
                    }
                  }}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;