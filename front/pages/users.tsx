import React, { useEffect, useState } from 'react'
import DataGrid from 'react-data-grid';
import axios from "axios";
import api from "../utils/api"
import TextEditor from '../components/util/TextEditor'


// const columns = [
//   { key: 'id', name: 'ID' },
//   { key: 'title', name: 'Title' }
// ];

const rows = [
  { id: 0, email: 'tere@daum.net', name: "hyun", gender: "man", hobby: "game", position: "dev", height: "174", age: 30, company: "hyundae" },
  { id: 1, email: 'demo@naver.com', name: "demo", gender: "girl", hobby: "game", position: "dev", height: "174", age: 30, company: "hyundae" }
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
        // `${api.cats}/all_cats_columns/${page}/8`,
        `${api.cats}/cats_columns/users_table/${page}/9`,
        // `${api.cats}/all_cats_columns/${page}/2`,
        { withCredentials: true }
      );
      console.log("resposne : ", response.data.data.columns_list);
      if (response.data.success) {

        const new_columns = response.data.data.columns_list.map((column: any) => {
          if (column.editor && column.hidden !== "true") {
            console.log("hi", column);
            return {
              ...column,
              editor: column.editor === "TextEditor" ? TextEditor : ""
            }
          }
        }).filter(v => v)

        console.log(new_columns);
        // setPageInfo({ page: response.data.data.current_page, total: response.data.data.total_page })

        setColumns(new_columns);
      }

    } catch (error) {
      console.log("error : ", error);

    }
  }

  const onRowsChangeHandler = (data: any, idx: any) => {
    console.log("data for row change handler : ", data);

    // let tmp: Set<any> = selectList;
    // data.map((v: any, i: any) => {
    //   if (v.isChange) {
    //     tmp.add(v._id)
    //     v.isChange = false
    //   }
    // });
    // setSelectList(tmp);
    // setBasicRows(data);

  }

  return (
    <div style={styles}>
      <div>
        <h2>Users Table</h2>
      </div>
      <DataGrid columns={columns} rows={rows} style={{ width: "100%" }}
        onRowsChange={(data, idx) => { onRowsChangeHandler(data, idx) }}
      />
    </div>
  )
}

export default users

