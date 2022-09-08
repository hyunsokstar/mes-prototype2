import { combineReducers } from 'redux';
import userSlice from '../slices/user';
import taskBoardSlice from "../slices/task_board";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  task_board: taskBoardSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;