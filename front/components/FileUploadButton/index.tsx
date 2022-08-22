
import { Button } from 'antd'
import React, { useState, useRef } from 'react'
import ImageModalForProfile from '../modal/ImageModalForProfile'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer';
import api from "../../utils/api"


type IProps = {
  row: any
  column: any
  onRowChange: (e: any) => void
}

function FileUploadButton({ row, column, onRowChange }: IProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileRef = useRef(null)

  const { me } = useSelector((state: RootState) => state.user);


  const onClickImageUpload = () => {// input[type='file']
    // @ts-ignore
    fileRef.current.click();
  }

  // console.log("row for FileUploadButton : ", row);

  const imageModalHandler = (option: boolean) => {
    // console.log("이미지 열어 : ", option);
    setIsModalOpen(option);
  }

  const uploadOneFileByAxios = async (e: any, rowId: string) => {
    console.log("hi file down load e : ", e);
    const data = new FormData()
    data.append('image', e.target.files[0])
    data.append('rowId', rowId)

    const response = await axios.post(`${api.cats}/upload`, data, {
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + me.accessToken,
      },
      
    })

    console.log("파일 업로드 성공 !", response);
  }

  return (
    <>
      <ImageModalForProfile url={row.imgUrl} modalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div>
        {row.imgUrl === "none" ? (
          <div>
            <button
              onClick={() => {
                onClickImageUpload()
              }}
              style={column.readonly && { background: "#B3B3B3" }}
            >
              업로드 버튼
            </button>
            <input
              hidden
              ref={fileRef}
              type={"file"}
              onChange={async (e) => {
                if (e.target.files && e.target.files.length !== 0) {
                  await uploadOneFileByAxios(e, row.id)
                }
              }
              }
            />
          </div>

        )
          : (
            <button onClick={() => imageModalHandler(true)}>이미지 열기</button>
          )}


      </div>
    </>
  )
}

export default FileUploadButton