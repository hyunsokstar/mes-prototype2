import { createSlice } from '@reduxjs/toolkit';
import userSlice from "../slices/user"
import { useSelector, useDispatch } from 'react-redux';
import { Satellite } from '@mui/icons-material';

interface TaskBoardState {
}

// const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());

interface TaskBoardState {
  columns: Array<{}>;
  basicRows: Array<any>;
  pageInfo: {
    page: number,
    total: number
  };
  selectedRows: Set<any>;
}

const initialState = {
  columns: [{ key: "hi", name: "hyun" }],
  basicRows: [{
    
  }],
  pageInfo: {
    page: 1,
    total: 1
  },
  selectedRows: new Set<any>()

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
    setBasicRows(state, action) {
      state.basicRows = action.payload.new_basic_rows
    },
    addDefaultRow(state, action) {
      const random_id = Math.random() * 1000;



      state.basicRows = [...state.basicRows, action.payload]
    },
    addMultiRowsForSearchBoardForReadyToRegister(state, action) {
      // const random_id = Math.random() * 1000;
      state.basicRows = [...state.basicRows, ...action.payload]
    },
    setSelectedRows(state, action) {
      console.log("action.payload : ", action.payload);
      // let tmp: Set<any> = state.selectedRows;
      // tmp.add("1234")

      // action.payload.map((v, i) => {
      //   if (v.isChange) {
      //     console.log("v : ", v);
      //     tmp.add(v._id)
      //   }
      // });

      state.selectedRows = action.payload
    }

  },
  extraReducers: builder => { },
});

export default taskBoardSlice;