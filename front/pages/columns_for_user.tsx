import React, { useEffect, useState } from 'react'
import DataGrid from 'react-data-grid'
import axios from "axios";
import api from "../utils/api"
import TextEditor from '../components/util/TextEditor'
import { SelectColumn } from "react-data-grid";



// import ExcelTable from "../components/Excel/ExcelTable"

const sample_columns = [
  { key: 'key', name: 'key', editor: TextEditor },
  { key: 'name', name: 'name', editor: TextEditor },
  { key: 'width', name: 'width', editor: TextEditor },
];

const sample_rows = [
  // { key: "email", name: "email", width: 200 },
  { _id: 1, key: "name", name: "name", width: 200 },
  { _id: 2, key: "password", name: "password", width: 200 },
  { _id: 3, key: "passwordCheck", name: "passwordCheck", width: 200 },
  { _id: 4, key: "age", name: "age", width: 200 },
  { _id: 5, key: "gender", name: "gender", width: 200 }
];

type Props = {}

const styles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: "80%",
  margin: "auto",
  border: "1px solid green"
};


const columns_for_user = (props: Props) => {

  const [columns, setColumns] = useState([])
  const [basicRows, setBasicRows] = useState([]);
  const [selectList, setSelectList] = useState<Set<any>>(new Set());


  useEffect(() => {
    getAllColumns();
  }, [])


  const getAllColumns = async () => {
    try {
      const response = await axios.get(
        `${api.cats}/all_cats_columns`,
        { withCredentials: true }
      );
      console.log("resposne : ", response);
      if (response.data.success) {


        const new_columns = response.data.data.map((column: any) => {
          if (column.editor) {
            return {
              ...column,
              editor: column.editor === "TextEditor" ? TextEditor : ""
            }
          }
        })

        setColumns(new_columns);
        setBasicRows(sample_rows);
      }

    } catch (error) {
      console.log("error : ", error);

    }
  }

  const onRowsChangeHandler = (data: any, idx: any) => {
    console.log("data for row change handler : ", data);

    let tmp: Set<any> = selectList;
    data.map((v: any, i: any) => {
      if (v.isChange) {
        tmp.add(v._id)
        v.isChange = false
      }
    });
    setSelectList(tmp);
    setBasicRows(data);

  }

  const saveColumns = async () => {
    console.log("컬럼 저장");

    const data_for_save = basicRows;

    try {
      console.log("data_for_save : ", data_for_save);
      const response = await axios.post(
        `${api.cats}/save_columns`,
        // { users: data_for_save },
        data_for_save,
        { withCredentials: true }
      );
      if (response.data) {
        console.log("response.data : ", response.data);
      }

      alert(response.data.data);

    } catch (error: any) {
      console.log("error : ", error);
    }

  }

  return (
    <div style={styles}>

      <div>
        <button >행 추가</button>
        <button onClick={() => saveColumns()}>저장 하기</button>
        <button >행 삭제</button>
      </div>

      <br /><br />

      <div>

        <DataGrid
          columns={[SelectColumn, ...columns]}
          rows={basicRows} style={{ width: "100%" }}
          onRowsChange={(data, idx) => { onRowsChangeHandler(data, idx) }}
          rowKeyGetter={(row) => row._id || ""}
          selectedRows={selectList}
          onSelectedRowsChange={(row) => {
            console.log("row : ", row);
            setSelectList(row);
          }}
        />
      </div>

    </div>
  )
}

export default columns_for_user