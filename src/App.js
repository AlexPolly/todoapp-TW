import './App.css';
import { useState } from 'react';


function App() {

  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [editStatus, setEditStatus] = useState({});



  const addTodo = (todo) => {
    const newTodo = {
      id: Math.random(),
      todo: todo,
    };
    setList([...list, newTodo]);
    setInput("");
  }

  const deleteTodo = (id) => {
    const newList = list.filter((todo) => todo.id !== id)
    setList(newList);
  };

  const handleEditChange = (e, id) => {
    const updatedList = list.map((todo) => {
      if (todo.id === id) {
        return { ...todo, todo: e.target.value };
      }
      return todo;
    });
    setList(updatedList);
  };
  

  return (
    <div className="App ">
      <h1 className='text-6xl text-white font-serif drop-shadow-2xl'>Todo-App</h1>
      <form className='max-w-lg w-full mt-10'>
        <div className='flex items-center gap-4'>

          <input
            className='py-3 px-5 w-full rounded-md text-black outline-none'
            value={input}  // Set the input field value to the state value
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter your Todo...'
            type="text"
          />

          <span onClick={() => addTodo(input)} className='py-3 px-5 bg-blue-500 font-semibold rounded-md'>Add</span>
        </div>

        <ul className='flex flex-col gap-4 mt-10'>
          {list.map((todo) => (
            <li className='flex items-center p-3  bg-blue-50 rounded-md transition-all hover:bg-white hover:bg-opacity-50 justify-between'>
              <div className='flex items-center gap-3'>
                <input className='w-5 h-5' type="checkbox" />
                {editStatus[todo.id] ? (
        <input
          type="text"
          value={todo.todo}
          onChange={(e) => handleEditChange(e, todo.id)}
          onBlur={() => setEditStatus({ ...editStatus, [todo.id]: false })}
        />
      ) : (
        <span className='text-black'>{todo.todo}</span>
      )}
              </div>
              <div className='flex items-center gap-3'>
                <span onClick={() => deleteTodo(todo.id)} className='w-6 h-6 p-5 flex cursor-pointer items-center justify-center bg-red-200 rounded-full text-red-500'><i className="fa-solid fa-trash"></i></span>
                <span onClick={() => setEditStatus({ ...editStatus, [todo.id]: true })} className='w-6 h-6 p-5 flex cursor-pointer items-center justify-center bg-blue-200 rounded-full text-blue-500'><i className="fa-solid fa-pen"></i></span>

              </div>

            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
