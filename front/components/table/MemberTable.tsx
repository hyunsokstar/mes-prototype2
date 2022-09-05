import React, { useEffect, useState } from 'react'
import DataGrid from 'react-data-grid'
import axios from "axios";
import api from "../../utils/api"
import TextEditor from '../../components/util/TextEditor'
import { SelectColumn } from "react-data-grid";
import Pagination from '@material-ui/lab/Pagination'
import Notiflix from "notiflix";
import { useCallback } from 'react';
import { throttle } from "lodash";


const sample_columns = [
  { key: 'table_name', name: 'table_name', editor: TextEditor, width: 200, resizable: true },
  { key: 'key', name: 'key', editor: TextEditor, width: 200, resizable: true },
  { key: 'name', name: 'name', editor: TextEditor, width: 200, resizable: true },
  { key: 'width', name: 'width', editor: TextEditor, width: 200, resizable: true },
  { key: 'editor', name: 'editor', editor: TextEditor, width: 200, resizable: true },
  { key: 'order', name: 'order', editor: TextEditor, width: 200, resizable: true },
  { key: 'resizable', name: 'resizable', editor: TextEditor, width: 200, resizable: true },
];

// const sample_rows = [
//   // { key: "email", name: "email", width: 200 },
//   { _id: 1, key: "name", name: "name", width: 200 },
//   { _id: 2, key: "password", name: "password", width: 200 },
//   { _id: 3, key: "passwordCheck", name: "passwordCheck", width: 200 },
//   { _id: 4, key: "age", name: "age", width: 200 },
//   { _id: 5, key: "gender", name: "gender", width: 200 }
// ];

type Props = {}

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



const MemberTable = (props: Props) => {
  const [columns, setColumns] = useState([])
  const [basicRows, setBasicRows] = useState([]);
  const [selectList, setSelectList] = useState<Set<any>>(new Set());
  const [pageInfo, setPageInfo] = useState<{ page: number, total: number }>({
    page: 1,
    total: 1
  })
  const [columnWidthInfo, setColumnWidthInfo] = useState<{ key: string, width: number }>({
    key: "name",
    width: 200
  })


  useEffect(() => {
    getAllColumns(pageInfo.page);
  }, [pageInfo.page])


  const getAllColumns = async (page: number = 1) => {

    try {
      const response = await axios.get(
        `${api.cats}/cats_columns/rowsForUsersTable/${page}/8`,
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

        setPageInfo({ page: response.data.data.current_page, total: response.data.data.total_page })
        setBasicRows(new_columns);
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

  const addRowForExcelTable = () => {
    // console.log("행 추가!");

    console.log("행 추가 : ");
    const random_id = Math.random() * 1000;

    setBasicRows([
      {
        _id: `${random_id}`,
        email: null,
        name: null,
      },
      ...basicRows,
    ]);
  }

  const deleteUserForCheck = async () => {
    console.log("삭제 버튼 클릭");
    // console.log("basicRows : ", basicRows);

    try {

      const rows_for_delete = basicRows.filter((row: any) => {
        console.log("row : ", row);

        if (selectList.has(row._id)) {
          return row._id
        }
      })
      console.log("rows_for_delete : ", rows_for_delete);

      const ids_for_delete = rows_for_delete.map((row: any) => {
        return row._id
      })

      console.log("ids_for_delete : ", ids_for_delete); // ['62f8c8c77297cfa7f1e05154', '62f8f230ed2082e4d5cb287d']

      const response = await axios.post(
        `${api.cats}/deleteColumns`,
        { ids_for_delete: ids_for_delete },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("response.data : ", response.data);

        const basic_row_after_delete = basicRows.filter((row: any) => {
          if (!ids_for_delete.includes(row._id)) {
            return row
          }
        })
        alert("행 삭제 성공 !");
        setBasicRows(basic_row_after_delete);
      }

    } catch (error) {

    }


  }

  const setPage = (page: any) => {
    setPageInfo({ ...pageInfo, page: page });
  }

  const modify_column_width_by_table_name_and_key = useCallback(async (data: object) => {
    Notiflix.Loading.circle()

    try {
      console.log("data_for_save : ", data);
      const response = await axios.post(
        `${api.cats}/modify_column_width_by_table_name_and_key`,
        // { users: data_for_save },
        data,
        { withCredentials: true }
      );
      if (response.data.success) {
        Notiflix.Loading.remove()
        console.log("response.data : ", response.data);
        console.log("컬럼 넓이 api 요청 !!");
        return
      }
      // alert(response.data.data);

    } catch (error: any) {
      console.log("error : ", error);
    }


  }, [])

  const updateColumnWidthByKey = useCallback((index: number, width: number) => {

    // Notiflix.Loading.circle()

    const data = {
      table_name: "users_table",
      key: sample_columns[index-1].key,
      width: width.toFixed(2)
    }

    console.log("data : ", data);
    modify_column_width_by_table_name_and_key(data);


    // Notiflix.Loading.remove()
  }, [])

  return (
    <div style={styles}>

      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "10px", gap: "10px" }}>
        <button onClick={() => addRowForExcelTable()}>행 추가</button>
        <button onClick={() => saveColumns()}>저장 하기</button>
        <button onClick={() => deleteUserForCheck()}>행 삭제</button>
      </div>

      <br /><br />

      <div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          총 {pageInfo && pageInfo.total} 페이지, 현재 : {pageInfo && pageInfo.page}
        </div>

        <DataGrid
          columns={[SelectColumn, ...sample_columns]}
          rows={basicRows} style={{ width: "100%" }}
          onRowsChange={(data, idx) => { onRowsChangeHandler(data, idx) }}
          rowKeyGetter={(row) => row._id || ""}
          selectedRows={selectList}
          onSelectedRowsChange={(row) => {
            console.log("row : ", row);
            setSelectList(row);
          }}
          onColumnResize={
            throttle((index: number, width: number) => updateColumnWidthByKey(index, width), 2000, { 'leading': false })
          }
        />
      </div>

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

export default MemberTable