import React, { useState } from 'react';




const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [todo, setTodo] = useState([]);




  function addTodoList() {
    if (inputValue.trim() === '') return;




    const newTodo = { text: inputValue, editing: false };
    setTodo([...todo, newTodo]);




    console.log('Sending to backend:', inputValue);




    fetch('http://localhost:3000/additems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputValue }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error('Error connecting to network');
          return;
        }
        return res.json(); // ✅ FIXED here
      })
      .then((data) => {
        console.log('The fetched data is:', data);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      });




    setInputValue('');
  }




  return (
    <div>
      <h1>{inputValue}</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addTodoList}>Add</button>




      <ul>
        {todo.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};




export default App;




