import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

interface ToDoTask {
  id: string;
  taskTitle: string;
  completed: boolean;
}

interface ToDoTasksState {
  tasks: ToDoTask[];
  loading: boolean;
  error: string | null;
}

const initialState: ToDoTasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const getTasks = createAsyncThunk("toDoTasks/getTasks", async () => {
  const response = await axiosAPI.get("toDoTasks.json");
  const data = response.data;
  return Object.keys(data || {}).map((key) => ({
    id: key,
    ...data[key],
  }));
});

export const addTask = createAsyncThunk(
  "toDoTasks/addTask",
  async (taskTitle: string) => {
    const response = await axiosAPI.post("toDoTasks.json", {
      taskTitle,
      completed: false,
    });
    return { id: response.data.name, taskTitle, completed: false };
  },
);

export const deleteTask = createAsyncThunk(
  "toDoTasks/deleteTask",
  async (id: string) => {
    await axiosAPI.delete(`toDoTasks/${id}.json`);
    return id;
  },
);

export const checkTaskStatus = createAsyncThunk(
  "toDoTasks/checkTaskStatus",
  async (task: ToDoTask) => {
    const checkedTask = { ...task, completed: !task.completed };
    await axiosAPI.put(`toDoTasks/${task.id}.json`, checkedTask);
    return checkedTask;
  },
);

const toDoTasksSlice = createSlice({
  name: "toDoTasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(checkTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default toDoTasksSlice.reducer;
