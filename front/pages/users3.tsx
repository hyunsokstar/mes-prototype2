import React, { useEffect, useState, useCallback } from 'react'
import TaskBoardContainer from '../components/container/TaskBoardContainer';

const styles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: "80%",
  margin: "auto"
};

type Props = {}

function TaskBoard({ }: Props) {

  return (
    <div style={styles}>
      <TaskBoardContainer />
    </div>
  )
}

export default TaskBoard
