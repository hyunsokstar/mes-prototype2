import React from 'react'


type IProps = {}

function SearchBox({ }: IProps) {
  return (
    <div style={{float:"right"}}>
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
      <input type="text" placeholder='검색어 입력' width={80} />
    </div>
  )
}

export default SearchBox