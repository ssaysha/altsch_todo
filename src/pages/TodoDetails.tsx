import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Todo = {
  id: number;
  title: string;
  details: string;
  completed: boolean;
};

function TodoDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const numericId = Number(id);

  // Mock Todo
  const [todo, setTodo] = useState<Todo>({
    id: numericId,
    title: `Task ${numericId}`,
    details: `Details for Task ${numericId}`,
    completed: false,
  });

  const [editing, setEditing] = useState<boolean>(false);

  const [editTitle, setEditTitle] = useState<string>(todo.title);
  const [editDetails, setEditDetails] = useState<string>(todo.details);
  const [editCompleted, setEditCompleted] = useState<boolean>(todo.completed);

  const saveChanges = () => {
    setTodo({
      ...todo,
      title: editTitle,
      details: editDetails,
      completed: editCompleted,
    });

    setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo Details</h1>

      {editing ? (
        <>
          {/* Title */}
          <div className="mb-4">
            <label className="font-semibold">Title</label>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Details */}
          <div className="mb-4">
            <label className="font-semibold">Details</label>
            <textarea
              value={editDetails}
              onChange={(e) => setEditDetails(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="font-semibold">Status</label>

            <select
              value={editCompleted ? "completed" : "incomplete"}
              onChange={(e) =>
                setEditCompleted(e.target.value === "completed")
              }
              className="p-2 border rounded"
            >
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
        </>
      ) : (
        <>
          <p className="mb-2">
            <strong>Title:</strong> {todo.title}
          </p>

          <p className="mb-2">
            <strong>Details:</strong> {todo.details}
          </p>

          <p className="mb-4">
            <strong>Status:</strong>{" "}
            {todo.completed ? "Completed" : "Incomplete"}
          </p>
        </>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        {editing ? (
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default TodoDetails;