import { configureStore} from '@reduxjs/toolkit';
import toDoTasksReducer from '../containers/ToDo/ToDoTasksSlice.ts'
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    tasks: toDoTasksReducer
  }
  })


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;