import './App.css';
import Desktop from "./components/desktop"
import { useState, useEffect } from 'react';

function App() {
  const [todoId, setTodoId] = useState(1);
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);

  function getNewTodo() {
    setTodoId((todoId) => (todoId === 20 ? 1 : todoId + 1));
  }

  function getNewKey() {
    setTodoId(4);
  }

  useEffect(() => {
    async function fetchTodo() {
      const url = `/.netlify/functions/email?id=${todoId}`;
      try {
        setLoading(true);
        const todo = await fetch(url).then((res) => res.json());
        setTodo(todo.title);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTodo();
  }, [todoId]);



  


  return (
    <div className="app-root">
      <div className="App">
      <p>
        <button onClick={getNewKey}> Get another todo </button>
      </p>
      <p>{loading ? "Loading..." : todo}</p>
    </div>
      {/* <Desktop/> */}
    </div>
  );
}

export default App;
