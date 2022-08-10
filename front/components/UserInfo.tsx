import { Divider, Radio, Table } from 'antd';
import React, { useState } from 'react';
import UserTable from "../components/UserTable"

// const data = [
//     { name: "hyun1", age: 20, hobby: "game" },
//     { name: "hyun2", age: 20, hobby: "soccer" },
//     { name: "hyun3", age: 20, hobby: "basketball" }
// ]

type userType = {
    name: any;
    age: any;
    hobby: any;
}

interface IProps {
    user_data?: userType [] | any;
    setSelectedRowNum: (e: number) => void;
    setSelectedRows?: (rows: userType []) => void;
    selectedRowNum?: number;
    setUserList?: (e: any) => any
}

const UserInfo = ({ user_data, setSelectedRowNum, setSelectedRows, selectedRowNum, setUserList }: IProps) => {


    function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("e : ", e);

        setSelectedRowNum(parseInt(e.target.value));
    }



    return (
        <div>

            {/* <Radio.Group
                onChange={({ target: { value } }) => {
                    console.log("value check !! : ", value);
                    setSelectionType(value);
                }}
                value={selectionType}
            >
                <Radio value="checkbox">Checkbox</Radio>
                <Radio value="radio">radio</Radio>
            </Radio.Group>

            <Divider />

            {newSelectedRows ? update : ""}

            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={myData}
            /> */}
            {/* <UserTable user_data={user_data} selectedRowNum={selectedRowNum} setSelectedRows={setSelectedRows} setSelectedRowNum={setSelectedRowNum} setUserList={setUserList} /> */}
            <UserTable />
        </div>
    );
};


export default UserInfo;