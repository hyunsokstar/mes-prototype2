import React, { useEffect, useState } from 'react'
import DataGrid from 'react-data-grid'
import axios from "axios";
import api from "../utils/api"
import TextEditor from '../components/util/TextEditor'


// import ExcelTable from "../components/Excel/ExcelTable"

const sample_columns = [
  { key: 'key', name: 'key'  ,editor: TextEditor},
  { key: 'name', name: 'name' ,editor: TextEditor},
  { key: 'width', name: 'width' ,editor: TextEditor},
];

const sample_rows = [
  // { key: "email", name: "email", width: 200 },
  { key: "name", name: "name", width: 200},
  { key: "password", name: "password", width: 200 },
  { key: "passwordCheck", name: "passwordCheck", width: 200 },
  { key: "age", name: "age", width: 200 },
  { key: "gender", name: "gender", width: 200 }
];

type Props = {}

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: "80%",
  margin: "auto",
  border: "1px solid green"
};


const columns_for_user = (props: Props) => {

  const [columns, setColumns] = useState([])
  const [rows, setRows ] = useState([]);

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


        const new_columns = response.data.data.map((column: any)=> {
          if(column.editor){
            return {
              ...column,
              editor: column.editor === "TextEditor" ? TextEditor : ""
            }
          }
        })

        // setColumns(response.data.data);
        setRows(new_columns);
      }

    } catch (error) {
      console.log("error : ", error);

    }
  }

  const onRowsChangeHandler = (data:any,idx:any)=> {
    console.log("hi");
    
  }

  // {(data, idx) => {
  //   // setSelectRow && setSelectRow(idx.indexes[0])
  //   setRow(data, idx.indexes[0])
// }}

  return (
    <div style={styles}>
      <DataGrid columns={sample_columns} rows={rows} style={{ width: "100%" }} onRowsChange = {(data,idx)=> {onRowsChangeHandler(data,idx[0])}} />
    </div>
  )
}

export default columns_for_user