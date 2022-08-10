import React, { useState } from 'react';
import UserInfo from "./UserInfo"


const user_data = [
    { name: "hyun1", age: 20, hobby: "game" },
    { name: "hyun2", age: 20, hobby: "soccer" },
    { name: "hyun3", age: 20, hobby: "basketball" }
]

const UserContainer = () => {
    const [userList, setUserList] = useState(user_data);
    const [selectedRowNum, setSelectedRowNum] = useState<number>()
    const [selectedRows, setSelectedRows] = useState<any>()
    return (
        <div>
            <UserInfo user_data={userList} setUserList= {setUserList} setSelectedRowNum={setSelectedRowNum} setSelectedRows={setSelectedRows} selectedRowNum = {selectedRowNum} />
        </div>
    )
}

export default UserContainer