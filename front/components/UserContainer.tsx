import React, { useState } from 'react';
import SearchBox from './SearchBox';
import UserTableForFileUpload from './UserTableForFileUpload';



const UserContainer = () => {
    return (
        <>
            <div>
                <SearchBox /> 
            </div>
            <div>
                <UserTableForFileUpload />
            </div>
        </>
    )
}

export default UserContainer