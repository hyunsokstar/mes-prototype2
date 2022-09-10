import React from 'react'
import styled from 'styled-components';

type Props = {}


const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    text-align: center;
`;

const TextEditor = ({ row, column, onRowChange, onClose }: any) => {

    return (
        <div>
            <Input
                style={{ textAlign: "left" }}
                type="text"
                value={row[column.key]}
                onChange={(event) => {
                    let eventValue = event.target.value

                    onRowChange({
                        ...row,
                        [column.key]: eventValue,
                        isChange: true
                    })
                }}

            />
        </div>
    )
}

export default TextEditor