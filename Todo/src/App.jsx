import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Navbar from "./compoents/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
    
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e,id) => {
    let val = todos.filter((i) => i.id === id);
    setTodo(val[0].todo);
    let value = todos.filter((i) => {
      return i.id !== id;
    });
    settodos(value);
    saveToLS(value);
  };

  const handleDelete = (e,id) => {
    settodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((item) => item.id !== id);
      saveToLS(updatedTodos);
      return updatedTodos;
    });
  };

  const handleAdd = () => {
    console.log(todo);
    
      settodos((prevTodos) => {

        const updatedTodos = [...prevTodos,  { id: uuidv4(), todo, isCompleted: false }];
        saveToLS(updatedTodos);
        return updatedTodos;
      });
    
    setTodo("");

  };

  const handleChange = (e) => {
    setTodo(e.target.value);

  };

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-green-100 min-h-[80vh] md:w-[81%]">
        <h1 className="font-bold text-center text-3xl ">
          TODO - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Task</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-full px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-green-800 mx-2 rounded-full hover:bg-green-850 disabled:bg-green-500 p-4 py-2 text-sm font-bold text-black"
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="my-4"
          id="show"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className={"todo flex my-3 justify-between"}>
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full w-3/4">
                    <button
                      onClick={(e) => handleEdit(e,item.id)}
                      className="bg-green-600 hover:bg-green-750 p-2 py-2 text-sm font-bold text-black rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e,item.id);
                      }}
                      className="bg-green-600 hover:bg-green-750 p-2 py-1 text-sm font-bold text-black rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
