import { useState } from 'react';
import { addTask } from './ToDoTasksSlice.ts';
import { useAppDispatch } from '../../app/store.ts';


const ToDoForm = () => {
const [taskTitle, setTaskTitle] = useState('');
const dispatch = useAppDispatch()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() === '') {
      alert('Task title cannot be empty');
      return;
    }
    dispatch(addTask(taskTitle));
    setTaskTitle('');
  }

  return (
    <form onSubmit={onSubmit}
    className="position-fixed bottom-0 start-0 w-100 p-4 bg-light d-flex gap-3">
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