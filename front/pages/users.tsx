import React, { useEffect, useState, useCallback } from 'react'
import DataGrid from 'react-data-grid';
import axios from "axios";
import api from "../utils/api"
import TextEditor from '../components/util/TextEditor'
import { throttle } from "lodash";
import Notiflix from "notiflix";


const rows = [
  { id: 0, email: 'tere@daum.net', name: "hyun", gender: "man", hobby: "game", position: "dev", height: "174", age: 30, company: "hyundae", job: "scientist" },
  { id: 1, email: 'demo@naver.com', name: "demo", gender: "girl", hobby: "game", position: "dev", height: "174", age: 30, company: "hyundae", job: "developer" }
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


function users({ }: Props) {
  const [columns, setColumns] = useState<any>([])
  const [basicRows, setBasicRows] = useState([]);
  const [selectList, setSelectList] = useState<Set<any>>(new Set());
  const [pageInfo, setPageInfo] = useState<{ page: number, total: number }>({
    page: 1,
    total: 1
  })

  // get grid data
  // 1122
  useEffect(() => {
    getAllColumns();
    getAllRowsForUsersTable();
    // getGridTableForUsersTable(pageInfo.page);

  }, [pageInfo])

  const getAllRowsForUsersTable = async () => {
    try {
      const response = await axios.get(
        `${api.cats}/cats_columns/rowsForUsersTable`,
        { withCredentials: true }
      );
      if (response.data.success) {

        const new_columns = response.data.data.columns_list.map((column: any) => {
          if (column.editor && column.hidden !== "true") {
            
            return {
              ...column,
              editor: column.editor === "TextEditor" ? TextEditor : "",
              resizable: column.resizable === "true" ? true : false
            }
          }
        }).filter((v: any) => v)

        console.log("new_columns : ", new_columns);

        setColumns(new_columns);
      }

    } catch (error) {
      console.log("error : ", error);

    }
  }


  const getAllColumns = async () => {

    try {
      const response = await axios.get(
        `${api.cats}/cats_columns/users_table`,
        { withCredentials: true }
      );
      if (response.data.success) {

        const new_columns = response.data.data.columns_list.map((column: any) => {
          if (column.editor && column.hidden !== "true") {
            
            return {
              ...column,
              editor: column.editor === "TextEditor" ? TextEditor : "",
              resizable: column.resizable === "true" ? true : false
            }
          }
        }).filter((v: any) => v)

        console.log("new_columns : ", new_columns);

        setColumns(new_columns);
      }

    } catch (error) {
      console.log("error : ", error);

    }
  }

  const onRowsChangeHandler = (data: any, idx: any) => {
    console.log("data for row change handler : ", data);

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
      table_name: "users_table",
      key: columns[index].key,
      width: width.toFixed(2)
    }

    console.log("data : ", data);
    modify_column_width_by_table_name_and_key(data);


    Notiflix.Loading.remove()
  }, [])


  return (
    <div style={styles}>
      <div>
        <h2>Users Table</h2>
      </div>
      <DataGrid
        columns={columns}
        rows={rows}
        style={{ width: "100%" }}
        onRowsChange={(data, idx) => { onRowsChangeHandler(data, idx) }}
        onColumnResize={
          throttle((index: number, width: number) => updateColumnWidthByKey(index, width, columns), 2000, { 'leading': false })
        }
      />
    </div>
  )
}

export default users
