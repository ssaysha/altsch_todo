import { useState } from "react";
import TaskList from "./components/TaskList";
import "./index.css";

type Task = {
  id: number;
  title: string;
  details: string;
  completed: boolean;
};

type FilterType = "all" | "completed" | "incomplete";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Task ${i + 1}`,
      details: `Details for Task ${i + 1}`,
      completed: i % 3 === 0,
    }))
  );

  const [newTitle, setNewTitle] = useState<string>("");
  const [newDetails, setNewDetails] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<FilterType>("all");

  // Add new task
  const addTask = () => {
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: newTitle,
      details: newDetails,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTitle("");
    setNewDetails("");
  };

  // Delete task
  const deleteTask = (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Edit task
  const editTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  // Calculate filtered tasks count
  const filteredTasksCount = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "incomplete" && !task.completed);

    return matchesSearch && matchesFilter;
  }).length;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Aisha's Todo List
      </h1>

      {/* Add Task */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Task details"
          value={newDetails}
          onChange={(e) => setNewDetails(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addTask}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Add Task
        </button>
      </div>

      {/* Search & Filter */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex-1 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap mt-2 sm:mt-0">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-2 rounded ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-2 rounded ${
              filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("incomplete")}
            className={`px-3 py-2 rounded ${
              filter === "incomplete" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Incomplete
          </button>
        </div>
      </div>

      {/* Dynamic total tasks */}
      <p className="mb-2 text-gray-700 font-medium">
        Total Tasks Found: {filteredTasksCount}
      </p>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onEdit={editTask}
        searchTerm={searchTerm}
        filter={filter}
      />
    </div>
  );
}