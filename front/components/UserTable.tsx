import React, { useEffect, useState } from 'react'
import api from "../utils/api"
import axios from "axios";
import DataGrid from 'react-data-grid';
import { IExcelHeaderType } from "../types/type";
import { columnlist } from "../common/columnInit";
import ExcelTable from "../components/Excel/ExcelTable";
import { SelectColumn } from "react-data-grid";



const rows = [
  { email: "terecal@daum.net", name: 'chulsu' },
  { email: "hyun@daum.net", name: 'hyun' }
];

interface IRow {
  _id: number;
  email: string;
  name: string;
}


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
  const [selectRow, setSelectRow] = useState<number>(0);


  const getAllCats = async () => {
    try {
      const response = await axios.get(
        `${api.cats}/allCats`,
        { withCredentials: true }
      );
      console.log("response : ", response);
      if (response.data.success) {
        setBasicRow(response.data.data)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getAllCats();
  }, []);

  function setRow(e: any) {
    console.log("e : ", e);
    setBasicRow(e)
  }



  const competeId = (rows: any) => {
    // const tempRow = [...rows];
    // const spliceRow = [...rows];
    // spliceRow.splice(selectRow, 1);
    // const isCheck = spliceRow.some(
    //   (row) =>
    //     row.tmpId === tempRow[selectRow].tmpId &&
    //     row.tmpId !== undefined &&
    //     row.tmpId !== ""
    // );

    // if (spliceRow) {
    //   if (isCheck) {
    //     return Notiflix.Report.warning(
    //       "아이디 경고",
    //       `중복되는 아이디가 존재합니다.`,
    //       "확인"
    //     );
    //   }
    // }

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