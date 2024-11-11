import ToDoList from "./containers/ToDo/ToDoList.tsx";
import ToDoForm from "./containers/ToDo/ToDoForm.tsx";

function App() {
  return (
    <div className="container">
      <ToDoList />
      <ToDoForm />
    </div>
  );
}

export default App;
