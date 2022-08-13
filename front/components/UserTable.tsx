import React, { useEffect, useState } from 'react'
import api from "../utils/api"
import axios from "axios";
import DataGrid from 'react-data-grid';
import { IExcelHeaderType } from "../types/type";
import { columnlist } from "../common/columnInit";
import ExcelTable from "../components/Excel/ExcelTable";
import { SelectColumn } from "react-data-grid";


function UserTable() {
  const [column, setColumn] = useState<Array<IExcelHeaderType>>(
    columnlist.member
  );
  const [basicRow, setBasicRow] = useState<Array<any>>([
    {
      email: "",
      name: "",
    },
  ]);
  const [selectList, setSelectList] = useState<Set<any>>(new Set());


  const getAllCats = async () => {
    try {
      const response = await axios.get(
        `${api.cats}/allCats`,
        { withCredentials: true }
      );
      console.log("response : ", response);
      if (response.data.success) {

        const data_for_table = response.data.data;

        const new_rows = data_for_table.map((row:any)=> {
          return {
            ...row,
            id: row._id
          }
        })

        setBasicRow(new_rows)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getAllCats();
  }, []);

  function setRow(e: any) {
    // console.log("e : ", e);
    setBasicRow(e)
  }

  const competeId = (rows: any) => {
    setBasicRow(rows);
  };

  return (
    <div>
      <button>저장</button>
      <ExcelTable
      
        data_for_rows={basicRow}
        data_for_columns={[SelectColumn, ...column]}
        selectList={selectList}
        //@ts-ignore
        setSelectList={setSelectList}
        setRow={(e) => {
          // console.log("e ; ", e);
          let tmp: Set<any> = selectList;
          e.map((v, i) => {
            if (v.isChange) {
              tmp.add(v.id)
              v.isChange = false
            }
          });
          setSelectList(tmp);
          competeId(e);
        }} 

        />
    </div>
  );
}

export default UserTable;