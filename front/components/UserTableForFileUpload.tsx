import React, { useEffect, useState } from 'react'
import api from "../utils/api"
import axios from "axios";
import DataGrid from 'react-data-grid';
import { IExcelHeaderType } from "../types/type";
import { columnlist } from "../common/columnInit";
import ExcelTable from "./Excel/ExcelTable";
import { SelectColumn } from "react-data-grid";

// import {
// } from "../slices/user";
// import { useSelector } from "react-redux";
import User from "../slices/user";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/reducer';

interface IProps {
  searchResult: []
}

function UserTableForFileUpload({ searchResult }: IProps) {

  const [column, setColumn] = useState<Array<IExcelHeaderType>>(
    columnlist.member2
  );
  const [basicRow, setBasicRow] = useState<Array<any>>([
    {
      email: "",
      name: "",
    },
  ]);
  const [selectList, setSelectList] = useState<Set<any>>(new Set());
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log("searchResult : ", searchResult);
    
    const data_for_table = customize_data_for_table(searchResult);
    console.log("data_for_table : ", data_for_table);

    setBasicRow(data_for_table);
  }, [searchResult.length])

  useEffect(() => {
    // console.log("me : ", me);
    console.log("me.accessToken", me.accessToken);
  }, [me])


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
      // console.log("response : ", response);
      if (response.data.success) {
        const rows_from_res = response.data.data;
        const data_for_table = customize_data_for_table(rows_from_res);

        console.log("data_for_table : ", data_for_table);


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
  // ?????? ?????? ?????? ????????? ??? ????????? ???????????? ????????? ?????? ?????? 
  const saveUser = async () => {
    console.log("?????? ?????? ?????? ?????? !!");

    let missed_field: string | any[] = [];

    basicRow.map((row) => {
      // console.log("row : ", row);

      if (row.password !== row.passwordCheck) {
        alert("??????????????? ???????????? ????????? ?????? ?????? ????????????");
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
      alert("?????? ????????? ????????? ????????? : " + missed_field);
      return
    } else {
      console.log("?????? ?????? ??????");
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

    console.log("??? ?????? : ");
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
    console.log("?????? ?????? ??????");
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
        alert("??? ?????? ?????? !");
        setBasicRow(basic_row_after_delete);
      }

    } catch (error) {

    }


  }

  return (
    <div>
      <br /><br />
      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "10px", gap: "10px" }}>
        <button onClick={() => addRowForExcelTable()}>??? ??????</button>
        <button onClick={() => saveUser()}>?????? ??????</button>
        <button onClick={() => deleteUserForCheck()}>??? ??????</button>
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
        editable
        resizable
        resizeSave
      />

    </div>
  );
}

export default UserTableForFileUpload;