import { createSlice } from '@reduxjs/toolkit';
import userSlice from "../slices/user"
import { useSelector, useDispatch } from 'react-redux';

interface TaskBoardState {

}

// const [columns, setColumns] = useState<any>([])
// const [basicRows, setBasicRows] = useState([]);
// const [pageInfo, setPageInfo] = useState<{ page: number, total: number }>({
//   page: 1,
//   total: 1
// })
// const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());

interface TaskBoardState {
  // columns: Array<{ key: string, name: string }>;
  columns: Array<{}>;
  basicRows: [];
  pageInfo: {
    page: number,
    total: number
  };
  selectedRows: [];
}

const initialState = {
  columns: [{ key: "hi", name: "hyun" }],
  basicRows: [],
  pageInfo: {
    page: 1,
    total: 1
  },
  selectedRows: []
} as TaskBoardState;


const taskBoardSlice = createSlice({
  name: 'task_board',
  initialState,
  reducers: {
    // setColumns
    setColumns(state, action) {
      console.log("action.payload :", action.payload);
      state.columns = action.payload.new_columns
    },
    
  },
  extraReducers: builder => { },
});

export default taskBoardSlice;