import React from 'react'


type IProps = {}

function SearchBox({ }: IProps) {

  const searchButtonHandler = () => {
    console.log("search button click");
    
  }

  return (
    <div style={{float:"right"}}>
      <select name="" id="">
        <option value="volvo">이름</option>
        <option value="saab">분야</option>
        <option value="opel">complete</option>
        <option value="audi">rating</option>
      </select>
      <input type="text" placeholder='검색어 입력' width={80} />
      <button onClick={searchButtonHandler}>검색</button>
    </div>
  )
}

export default SearchBox