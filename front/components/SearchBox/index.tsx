import React, { useState } from 'react'


type IProps = {
  setSearchOption: any,
  setSearchKeyword: any,
  searchSubmitHandler: any
}

function SearchBox({ setSearchOption, setSearchKeyword, searchSubmitHandler }: IProps) {

  const changeSearchOptionHandler = (e: any) => {
    console.log("e.target.value : ", e.target.value);
    setSearchOption(e.target.value);
  }

  const serachInputHandler = (e:any) => {
    setSearchKeyword(e.target.value);
  }

  return (
    <div style={{ float: "right" }}>
      <select name="" id="" defaultValue="name" onChange={changeSearchOptionHandler}>
        <option value="name">이름</option>
        <option value="position">분야</option>
        <option value="completion">complete</option>
        <option value="rating">rating</option>
      </select>
      <input type="text" placeholder='검색어 입력' width={80} onChange={serachInputHandler}/>
      <button onClick={searchSubmitHandler}>검색</button>
    </div>
  )
}

export default SearchBox