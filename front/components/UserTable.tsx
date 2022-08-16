import React, { useEffect, useState } from 'react'
import api from "../utils/api"
import axios from "axios";
import DataGrid from 'react-data-grid';
import { IExcelHeaderType } from "../types/type";
import { columnlist } from "../common/columnInit";
import ExcelTable from "../components/Excel/ExcelTable";
import { SelectColumn } from "react-data-grid";
import Password from 'antd/lib/input/Password';



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
        id: row._id,
        password: row.password,
        passwordCheck: row.passwordCheck
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

  function checkForRequiredField(row: any) {

    let missed_field = []

    if (!row.email) {
      missed_field.push("email")
    }

    if (!row.name) {
      missed_field.push("name")
    }

    if (!row.password) {
      missed_field.push("password")
    }

    if (!row.passwordCheck) {
      missed_field.push("passwordCheck");
    }

    if (!row.height) {
      missed_field.push("height");
    }

    if (!row.gender) {
      missed_field.push("gender");
    }

    return missed_field;

  }

  // todo:
  // 저장 버튼 클릭 체크된 행 정보를 백엔드로 보내서 저장 처리 
  const saveUser = async () => {
    console.log("회원 저장 버튼 클릭 !!");

    let missed_field: string | any[] = [];

    basicRow.map((row) => {
      // console.log("row : ", row);


      if (row.password !== row.passwordCheck) {
        alert("비밀번호와 비밀번호 확인이 일치 하지 않습니다");
        return
      }
    })


    const data_for_save = basicRow.filter((row) => {

      if (selectList.has(row.id)) {
        missed_field = checkForRequiredField(row)
        return row
      }
    })

    if (missed_field.length) {
      alert("필수 필드에 입력해 주세요 : " + missed_field);
      return
    } else {
      console.log("필수 필드 충족");
    }

    try {
      console.log("data_for_save : ", data_for_save);
      const response = await axios.post(
        `${api.cats}/saveMembers`,
        { users: data_for_save },
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

    console.log("행 추가 : ");
    const random_id = Math.random() * 1000;

    setBasicRow([
      {
        id: `${random_id}`,
        email: null,
        name: null,
      },
      ...basicRow,
    ]);
  }


  const deleteUserForCheck = async () => {
    console.log("삭제 버튼 클릭");
    console.log("basicRow : ", basicRow);


    try {
      const rows_for_delete = basicRow.filter((row) => {
        console.log("row : ", row);

        if (selectList.has(row.id)) {
          return row._id
        }
      })

      console.log("rows_for_delete : ", rows_for_delete);

      const ids_for_delete = rows_for_delete.map((row) => {
        return row.id
      })

      console.log("ids_for_delete : ", ids_for_delete); // ['62f8c8c77297cfa7f1e05154', '62f8f230ed2082e4d5cb287d']

      const response = await axios.post(
        `${api.cats}/deleteMembers`,
        { ids_for_delete: ids_for_delete },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("response.data : ", response.data);

        const basic_row_after_delete = basicRow.filter((row) => {
          if (!ids_for_delete.includes(row.id)) {
            return row
          }
        })
        alert("행 삭제 성공 !");
        setBasicRow(basic_row_after_delete);
      }

    } catch (error) {

    }


  }

  return (
    <div>
      <br /><br />

      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "10px", gap: "10px" }}>
        <button onClick={() => addRowForExcelTable()}>행 추가</button>
        <button onClick={() => saveUser()}>저장 하기</button>
        <button onClick={() => deleteUserForCheck()}>행 삭제</button>
      </div>

      <br /><br />

      <ExcelTable
        data_for_rows={basicRow}
        data_for_columns={[SelectColumn, ...column]}
        selectList={selectList}
        //@ts-ignore
        setSelectList={setSelectList}
        setRow={(e) => {
          console.log("e : ", e);

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