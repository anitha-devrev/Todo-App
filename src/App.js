import logo from "./logo.svg";
import "./App.css";
import TodoPage from "./todo/Pages/TodoPage";
import { DataProvider } from "./todo/Components/DataProvider";
function App() {
  return (
    <div className="App">
      <DataProvider>
        <TodoPage />
      </DataProvider>
    </div>
  );
}

export default App;
