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

  const customize_data_for_table = (data: any) => {
    const data_for_table = data.map((row: any) => {
      return {
        ...row,
        id: row._id
      }
    })
    return data_for_table;
  }

  const getAllCats = async () => {
    try {
      const response = await axios.get(
        `${api.cats}/allCats`,
        { withCredentials: true }
      );
      console.log("response : ", response);
      if (response.data.success) {
        const rows_from_res = response.data.data;
        const data_for_table = customize_data_for_table(rows_from_res);

        setBasicRow(data_for_table);
      }
    } catch (error) {
    }
  }

  const competeId = (rows: any) => {
    setBasicRow(rows);
  };

  useEffect(() => {
    getAllCats();
  }, []);


  // todo:
  // 저장 버튼 클릭 체크된 행 정보를 백엔드로 보내서 저장 처리 
  const saveUser = async () => {
    console.log("회원 저장 버튼 클릭 !!");

    try {
      const response = await axios.post(
        `${api.cats}/saveMembers`,
        // { users: [{id:"1", email:"tere@daum.net"}, {id:"2", email:"hyun@daum.net"}] },
        { users:basicRow },
        { withCredentials: true }
      );
      // console.log("response.data : ", response.data);

      if (response.data) {
        console.log("response.data : ", response.data);
        
      }

    } catch (error: any) {
      console.log("error : ", error);
      
    }

  }

  return (
    <div>

      <button onClick={() => saveUser()}>저장 하기</button>

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