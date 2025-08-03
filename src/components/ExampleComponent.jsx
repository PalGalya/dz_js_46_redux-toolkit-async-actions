import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  updateMessage,
  addUser,
  removeUser,
} from "../redux/slices/exampleSlice";
import { fetchUsers } from "../redux/asyncActions/fetchData";

const ExampleComponent = () => {
  const dispatch = useDispatch();
  const { counter, message, users, isLoading } = useSelector((state) => state.example);

  const [newMessage, setNewMessage] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const handleAddUser = () => {
    if (newUserName.trim()) {
      const newUser = {
        id: Date.now(),
        name: newUserName.trim(),
      };
      dispatch(addUser(newUser));
      setNewUserName("");
    }
  };

  const handleUpdateMessage = () => {
    if (newMessage.trim()) {
      dispatch(updateMessage(newMessage));
      setNewMessage("");
    }
  };

  const handleFetchUsers = () => {
    dispatch(fetchUsers());
  };

  return (
    <div className="example-component">
      {/* Простий індикатор завантаження */}
      {isLoading && <div>Завантаження...</div>}

      <div className="section">
        <h2>Лічильник</h2>
        <p>Поточне значення: <strong>{counter}</strong></p>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(reset())}>Скинути</button>
      </div>

      <div className="section">
        <h2>Повідомлення</h2>
        <p>{message}</p>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введіть нове повідомлення"
        />
        <button onClick={handleUpdateMessage}>Оновити</button>
      </div>

      <div className="section">
        <h2>Користувачі</h2>
        
        {/* Асинхронне завантаження */}
        <button onClick={handleFetchUsers} disabled={isLoading}>
          Завантажити користувачів з API
        </button>
        
        {/* Локальне додавання */}
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Ім'я користувача"
        />
        <button onClick={handleAddUser}>Додати локально</button>
        
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => dispatch(removeUser(user.id))}>
                Видалити
              </button>
            </li>
          ))}
        </ul>
        
        {users.length === 0 && <p>Користувачів поки немає</p>}
      </div>
    </div>
  );
};

export default ExampleComponent;
