import React, { useState } from 'react';
import SearchBox from './SearchBox';
import UserTableForFileUpload from './UserTableForFileUpload';
import axios from "axios";
import api from "../utils/api"



const UserContainer = () => {

    const [searchOption, setSearchOption] = useState("name")
    const [searchKeyword, setSearchKeyword] = useState("")
    const [searchResult, setSearchResult] = useState([])

    const searchSubmitHandler = async () => {
        try {
            console.log("searchOption, searchKeyword : ", searchOption, searchKeyword);
            const response = await axios.post(
                `${api.cats}/searchUsers`,
                {
                    searchOption: searchOption,
                    searchKeyword: searchKeyword
                },
                { withCredentials: true }
            );
            if (response.data.success) {
                console.log("response.data : ", response.data);
                setSearchResult(response.data.data);
            }

            // alert(response.data.data);

        } catch (error: any) {
            console.log("error : ", error);
        }
    }

    return (
        <>
            <div>
                <SearchBox setSearchOption={setSearchOption} setSearchKeyword={setSearchKeyword} searchSubmitHandler={searchSubmitHandler} />
            </div>
            <div>
                <UserTableForFileUpload searchResult={searchResult} />
            </div>
        </>
    )
}


export default UserContainer