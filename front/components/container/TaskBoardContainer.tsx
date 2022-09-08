import React from 'react'
import TaskBoardTable from '../table/TaskBoardTable'

type Props = {}

const TaskBoardContainer = (props: Props) => {
    return (
        <div>
            <h2>TaskBoard</h2>
            <TaskBoardTable />
        </div>
    )
}

export default TaskBoardContainer