import React, { useEffect, useState } from 'react'
import DataGrid from 'react-data-grid';
import axios from "axios";
import api from "../utils/api"


// const columns = [
//   { key: 'id', name: 'ID' },
//   { key: 'title', name: 'Title' }
// ];

const rows = [
  { id: 0, email: 'tere@daum.net' , name: "hyun" , gender: "man"},
  { id: 1, email: 'demo@naver.com' , name: "demo", gender: "girl" }
];

const styles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: "80%",
  margin: "auto",
  // border: "1px solid green"
};


type Props = {}


function users({ }: Props) {

  const [columns, setColumns] = useState([])
  const [basicRows, setBasicRows] = useState([]);
  const [selectList, setSelectList] = useState<Set<any>>(new Set());
  const [pageInfo, setPageInfo] = useState<{ page: number, total: number }>({
    page: 1,
    total: 1
  })

  useEffect(() => {
    getAllColumns(pageInfo.page);
  }, [pageInfo.page])

  const getAllColumns = async (page: number = 1) => {


    try {
      const response = await axios.get(
        `${api.cats}/all_cats_columns/${page}/4`,
        // `${api.cats}/all_cats_columns/${page}/2`,
        { withCredentials: true }
      );
      console.log("resposne : ", response);
      if (response.data.success) {

        const new_columns = response.data.data.columns_list.map((column: any) => {
          if (column.editor) {
            return {
              ...column,
              // editor: column.editor === "TextEditor" ? TextEditor : ""
            }
          }
        })

        // setPageInfo({ page: response.data.data.current_page, total: response.data.data.total_page })

        setColumns(new_columns);
      }

    } catch (error) {
      console.log("error : ", error);

    }
  }

  return (
    <div style={styles}>
      <DataGrid columns={columns} rows={rows} style={{ width: "100%" }} />
    </div>
  )
}

export default users



// function App() {
//   return <DataGrid columns={columns} rows={rows} />;
// }