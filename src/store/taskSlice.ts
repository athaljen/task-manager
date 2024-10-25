import {createSlice, TaskAbortError} from '@reduxjs/toolkit';
import {TaskType} from '../types/task.type';
import {RootStoreState} from './store.types';

type initialStateType = {
  Tasks: TaskType[];
};

type actionPayload = {
  payload: TaskType;
};

const initialState: initialStateType = {
  Tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    addTaskAction: (state, {payload}: actionPayload) => {
      state.Tasks.push(payload);
    },
    updateTaskAction: (state, {payload}: actionPayload) => {
      state.Tasks.map(task =>
        task.id == payload.id ? {...task, ...payload} : task,
      );
    },
    deleteTaskAction: (state, {payload}: actionPayload) => {
      state.Tasks = state.Tasks.filter(task => task.id !== payload.id);
    },
  },
});

export const {addTaskAction, deleteTaskAction, updateTaskAction} =
  taskSlice.actions;
export const selectTasks = (state: RootStoreState) => state.tasks.Tasks;
export default taskSlice.reducer;
