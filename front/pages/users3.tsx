import React, { useEffect, useState, useCallback } from 'react'
import DataGrid from 'react-data-grid';
import axios from "axios";
import api from "../utils/api"
import TextEditor from '../components/util/TextEditor'
import { throttle } from "lodash";
import Notiflix from "notiflix";
import Pagination from '@material-ui/lab/Pagination'
import { selectEditor, selectFormatter } from '../common/editor_mapping';
import searchModalForUser from '../components/modal/searchModalForUser';
import { SelectColumn } from "react-data-grid";

// redux 작업
import { RootState } from '../store/reducer';
import taskBoardSlice from '../slices/task_board';

import { useSelector, useDispatch } from 'react-redux';
import router, { useRouter } from 'next/router'


const sample_columns = [
  { key: "email", name: "email", editor: TextEditor, hidden: "false" , resizable: "true"},
  { key: "name", name: "name", editor: TextEditor, hidden: "false" , resizable: "true"},
  { key: "todo", name: "todo", formatter: searchModalForUser, hidden: "false" , resizable: "true"},
  { key: "test_complete", name: "test_complete", editor: TextEditor, hidden: "false" , resizable: "true"}
]

const rows = [
  { id: 0, email: 'tere@daum.net', name: "hyun", todo: "hi", test_complete: "hi" },
  { id: 1, email: 'tere@daum.net', name: "hyun", todo: "hi", test_complete: "hi" },
];

const styles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: "80%",
  margin: "auto"
};

type Props = {}

function TaskBoard({ }: Props) {
  const columns = useSelector((state: RootState) => state.task_board.columns);
  // const [columns, setColumns] = useState<any>([])
  
  const [basicRows, setBasicRows] = useState([]);
  const [pageInfo, setPageInfo] = useState<{ page: number, total: number }>({
    page: 1,
    total: 1
  })
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());
  useEffect(() => {
    getAllGridDataForRowsForUsersTable(pageInfo.page);
  }, [pageInfo.page])
  
  // 리덕스 관련
  const dispatch = useDispatch();
  // const test = useSelector((state: RootState) => state.task_board.columns);

  console.log("columns from redux : ", columns);
  

  const getAllGridDataForRowsForUsersTable = async (page: number = 1) => {
    try {
      const response = await axios.get(
        `${api.cats}/getGridDataByTableName/rowsForUsersTable/${page}/8`,
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log("response.data.data : ", response.data.data);
        const columns_for_grid = response.data.data.columns_for_grid
        const rows_for_grid = response.data.data.rows_for_grid
        const new_columns = columns_for_grid.map((column: any) => {
          if (column.hidden !== "true") {
            return {
              ...column,
              editor: column.editor ? TextEditor : TextEditor,
              formatter: column.formatter && selectFormatter(column.formatter),
              resizable: column.resizable === "true" ? true : false,
            }
          }
        }).filter((v: any) => v)
        console.log("new_columns : ", new_columns);
        // setColumns(new_columns);

        dispatch(
          taskBoardSlice.actions.setColumns({
            new_columns: new_columns 
          }),
      );


        console.log("rows_for_grid : ", rows_for_grid);
        setPageInfo({ page: response.data.data.current_page, total: response.data.data.total_page })
        setBasicRows(rows_for_grid)
      }
    } catch (error) {
      console.log("error : ", error);

    }
  }

  const onRowsChangeHandler = (data: any, idx: any) => {
    console.log("data for row change handler : ", data);
    setBasicRows(data);
  }

  const modify_column_width_by_table_name_and_key = useCallback(async (data: object) => {
    Notiflix.Loading.circle()

    try {
      console.log("data_for_save : ", data);
      const response = await axios.post(
        `${api.cats}/modify_column_width_by_table_name_and_key`,
        data,
        { withCredentials: true }
      );
      if (response.data.success) {
        Notiflix.Loading.remove()
        console.log("response.data : ", response.data);
        console.log("컬럼 넓이 api 요청 !!");
        return
      }
    } catch (error: any) {
      console.log("error : ", error);
    }
  }, [])

  const updateColumnWidthByKey = useCallback((index: number, width: number, columns: any) => {
    console.log("columns : ", columns);
    console.log("index : ", index);

    const data = {
      table_name: "rowsForUsersTable",
      key: columns[index].key,
      width: width.toFixed(2)
    }

    console.log("data : ", data);
    modify_column_width_by_table_name_and_key(data);


    Notiflix.Loading.remove()
  }, [])

  const setPage = (page: any) => {
    setPageInfo({ ...pageInfo, page: page });
  }



  return (
    <div style={styles}>
      <div>
        <h1>taks board</h1>
      </div>
      <DataGrid
        columns={[SelectColumn, ...sample_columns]} 
        rows={basicRows}
        style={{ width: "100%" }}
        onRowsChange={(data, idx) => { onRowsChangeHandler(data, idx) }}
        onColumnResize={
          throttle((index: number, width: number) => updateColumnWidthByKey(index, width, columns), 2000, { 'leading': false })
        }
        rowKeyGetter={(row) => row._id || ""}
        selectedRows={selectedRows}
        onSelectedRowsChange={(row) => {
          console.log("row : ", row);
          setSelectedRows(row)
      }}
      />

      <br />

      <Pagination
        count={pageInfo.total}
        page={pageInfo.page}
        size="large"
        defaultPage={1}
        shape="rounded"
        onChange={(e, page) => {
          setPage(page)
        }}
        
      />

    </div>
  )
}

export default TaskBoard
