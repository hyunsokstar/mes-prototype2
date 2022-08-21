// import { IExcelHeaderType } from '../../@types/type'
import styled from 'styled-components'
//@ts-ignore
// import DROPDOWN_IMG from '../../../../mes/public/images/ic_monitoring_open.png'
import React, { useRef } from 'react'




// period_unit : 0(day) , 1(week) , 2(month)
const InputWithSelect = ({ row, column, onRowChange }: any) => {
    // console.log("row for input: ", row);


    //     const typeOfUnit = (unit : 'kg' | '장') : 0 | 1 | undefined  => {
    //         return  unit === 'kg'
    //                 ? 0
    //                 : unit === '장'
    //                 ? 1
    //                 : undefined
    //     }

    //     const unitOfType = (type : 0 | 1 ) : 'kg' | '장'  => {
    //         return  type === 0
    //         ? 'kg'
    //         : type === 1
    //         ? '장'
    //         : undefined
    //     }

    // input
    // key 수정
    // const handleChange = (e: any) => {
    //     onRowChange({ ...row, [column.key]: Number(e.target.value), isChange: true })
    // }

    // // select
    // // period_unit 수정
    // const handleDayChange = (e: any) => {
    //     onRowChange({ ...row, period_unit: typeOfUnit(e.target.value), isChange: true })
    // }

    function inputChangeHandler(e: any) {
        console.log(e.target.value);
        onRowChange({ ...row, height: e.target.value, isChange: true })
    }

    function selectChangeHandler(e: any) {
        console.log(e.target.value);
        onRowChange({ ...row, gender: e.target.value, isChange: true })
    }

    return (
        <div style={{ verticalAlign: "middle" }} >
            <input style={{ width: "70%" }} placeholder="신장 입력" onChange={inputChangeHandler} value={row.height} />
            <select name="cars" id="cars" style={{ width: "20%", float: "right", marginTop: "8px" }} onChange={selectChangeHandler} defaultValue={row.gender}>
                <option value="man">남</option>
                <option value="girl">여</option>
            </select>
        </div>
    )

}


export { InputWithSelect }



