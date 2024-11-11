import { useSelector } from "react-redux";
import { useEffect } from "react";
import { checkTaskStatus, deleteTask, getTasks } from "./ToDoTasksSlice.ts";
import { RootState, useAppDispatch } from "../../app/store.ts";

const ToDoList = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div className="container p-4 d-flex flex-column gap-2">
      {tasks.map((task) => (
        <div
          className="task d-flex justify-content-between align-items-center px-4 py-2 border border-1 bg-light rounded-4"
          key={task.id}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(checkTaskStatus(task))}
            className="form-check-input"
          />
          <span
            className={
              task.completed
                ? "text-decoration-line-through"
                : "text-decoration-none"
            }
          >
            {task.taskTitle}
          </span>
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(deleteTask(task.id));
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
