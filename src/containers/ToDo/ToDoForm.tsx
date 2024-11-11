import { useState } from 'react';
import { useDispatch } from 'react-redux';


const ToDoForm = () => {
const [taskTitle, setTaskTitle] = useState('');
const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      dispatch();
      setTaskTitle('');
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="form-control"
        placeholder="Enter task title"
      />
      <button
        type="submit"
        className="btn btn-primary"
      >Add</button>
    </form>
  )
}

export default ToDoForm