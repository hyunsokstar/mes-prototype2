import React, { useState } from 'react'
import styled from 'styled-components';


type Props = {}


const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    text-align: center;
`;

const TextEditorForPassWordCheck = ({ row, column, onRowChange, onClose }: any) => {

    // console.log("row : ", row);
    const [inputColor, setInputColor] = useState("");


    return (
        <div>
            <Input
                type="text"
                onChange={(event) => {
                    let eventValue = event.target.value
                    console.log("eventValue : ", eventValue);
                    console.log("row : ", row);

                    if (row.password !== event.target.value) {
                        console.log("검증 비통과");
                        setInputColor("pink")
                    } else {
                        console.log("검증 통과");
                        setInputColor("skyblue")
                    }

                    onRowChange({
                        ...row,
                        [column.key]: eventValue,
                        isChange: true
                    })
                }}
                style={{ backgroundColor: inputColor }}
            />
        </div>
    )
}

export default TextEditorForPassWordCheck;