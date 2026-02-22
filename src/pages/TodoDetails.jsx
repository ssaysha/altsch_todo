import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TodoDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Todo
  const [todo, setTodo] = useState({
    id: Number(id),
    title: `Task ${id}`,
    details: `Details for Task ${id}`,
    completed: false,
  });

  const [editing, setEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDetails, setEditDetails] = useState(todo.details);
  const [editCompleted, setEditCompleted] = useState(todo.completed);


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
      <h1 className="text-2xl font-bold mb-4 text-center"> Todo Details</h1>
      {editing ? (<>  <div className="mb-4"> <label className="font-semibold"> Title</label>
 <input
value={editTitle}

              onChange={(e)=>setEditTitle(e.target.value)}

              className="w-full p-2 border rounded"

            />

          </div>


          <div className="mb-4">

            <label className="font-semibold">

              Details

            </label>

            <textarea

              value={editDetails}

              onChange={(e)=>setEditDetails(e.target.value)}

              className="w-full p-2 border rounded"

            />

          </div>
          <div className="mb-4"> <label className="font-semibold"> Status </label> 
          <select value={editCompleted ? "completed":"incomplete"}onChange={(e)=>
                setEditCompleted(
                  e.target.value==="completed" )}className="p-2 border rounded" >
                    <option value="completed">Completed</option>
              <option value="incomplete">Incomplete </option></select></div> </> ) : ( <><p className="mb-2"> <strong>Title:</strong> {todo.title}</p>
          <p className="mb-2"><strong>Details:</strong> {todo.details}</p>
        <p className="mb-4"><strong>Status:</strong>{" "}{todo.completed? "Completed" : "Incomplete"} </p></>
      )}
      <div className="flex gap-3">
        {editing ? (<button onClick={saveChanges}className="px-4 py-2 bg-green-600 text-white rounded">Save</button>) : (
          <button onClick={()=>setEditing(true)}className="px-4 py-2 bg-yellow-500 text-white rounded" >Edit</button> )}
      <button
onClick={()=>navigate("/")}className="px-4 py-2 bg-gray-400 text-white rounded" >Back </button>
      </div>
    </div>
  );
}

export default TodoDetails;