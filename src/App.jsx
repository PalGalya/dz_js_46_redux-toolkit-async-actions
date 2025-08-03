import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ExampleComponent from "./components/ExampleComponent";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="app-header">
          <h1>Redux з Асинхронними Діями</h1>
          <p>Просте завдання з createAsyncThunk</p>
        </header>
        <main>
          <ExampleComponent />
        </main>
      </div>
    </Provider>
  );
}

export default App;
