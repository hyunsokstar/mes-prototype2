
import { Button } from 'antd'
import React, { useState } from 'react'
import ImageModalForProfile from '../modal/ImageModalForProfile'

type IProps = {
  row: any
  column: any
  onRowChange: (e: any) => void
}

function FileUploadButton({ row, column, onRowChange }: IProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("row for FileUploadButton : ", row);

  const imageModalHandler = (option: boolean) => {
    console.log("이미지 열어 : ", option);
    
    setIsModalOpen(option);
  }

  return (
    <>
      <ImageModalForProfile url={row.imgUrl} modalOpen={isModalOpen} setIsModalOpen = {setIsModalOpen} />
      <div>
        {row.imgUrl === "none" ? (
          <button>파일 업로드</button>
        )
          : (
            <button onClick={() => imageModalHandler(true)}>이미지 열기</button>
          )}


      </div>
    </>
  )
}

export default FileUploadButton