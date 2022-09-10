import React from 'react'
import styled from 'styled-components';


type Props = {}


const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    text-align: center;
`;

const PlaceHolder = ({ row, column, onRowChange, onClose }: any) => {

    

    return (
        <div>
            <Input type="text"
            placeholder=''
                onChange={(event) => {
                    let eventValue = event.target.value

                }}

            />
        </div>
    )
}

export default PlaceHolder