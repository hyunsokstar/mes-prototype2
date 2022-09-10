import React from 'react'
import AppLayout from '../AppLayout'
import TaskBoardTable from '../table/TaskBoardTable'

type Props = {}

const TaskBoardContainer = (props: Props) => {
    return (
        <div>
            <AppLayout>
                <h2 style={{ textAlign: "center" }}>TaskBoard</h2>
                <TaskBoardTable />
            </AppLayout>
        </div>
    )
}

export default TaskBoardContainer