import React from 'react'

type Props = {}

const TextEditor = ({ row, column, onRowChange, onClose }: any) => {


    return (
        <div>
            <input type="text"
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