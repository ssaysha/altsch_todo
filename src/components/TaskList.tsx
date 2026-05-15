import { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  details: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedTask: Partial<Task>) => void;
  searchTerm?: string;
  filter?: "all" | "completed" | "incomplete";
};

export default function TaskList({
  tasks,
  onDelete,
  onEdit,
  searchTerm = "",
  filter = "all",
}: TaskListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDetails, setEditDetails] = useState<string>("");
  const [editCompleted, setEditCompleted] = useState<boolean>(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [tasks, searchTerm, filter]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "incomplete" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / tasksPerPage));

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDetails(task.details);
    setEditCompleted(task.completed);
  };

  const saveEdit = (id: number) => {
    onEdit(id, {
      title: editTitle,
      details: editDetails,
      completed: editCompleted,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {currentTasks.length === 0 && (
        <p className="text-center text-gray-600">No tasks found.</p>
      )}

      {currentTasks.map((task) => (
        <div
          key={task.id}
          className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          {editingId === task.id ? (
            <div className="space-y-2">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                value={editDetails}
                onChange={(e) => setEditDetails(e.target.value)}
                placeholder="Task details"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={editCompleted ? "yes" : "no"}
                onChange={(e) =>
                  setEditCompleted(e.target.value === "yes")
                }
                className="p-2 border rounded"
              >
                <option value="no">Incomplete</option>
                <option value="yes">Completed</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(task.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <p className="text-gray-600">{task.details}</p>

                <span
                  className={`inline-block mt-1 px-2 py-1 rounded-full text-sm font-medium ${
                    task.completed
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {task.completed ? "Completed" : "Incomplete"}
                </span>
              </div>

              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => startEdit(task)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(task.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Prev
        </button>

        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}