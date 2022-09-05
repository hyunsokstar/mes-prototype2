import { log } from "console";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal'
import styled from 'styled-components'


// 오른쪽
import { FaSearchPlus, FaSearchMinus, FaSave, FaRedo, FaUndo, FaWindowClose } from "react-icons/fa";
import { SaveFilled } from "@ant-design/icons";

interface IProps {
    url: string
    modalOpen: boolean
    setIsModalOpen: any
}

interface ImgProps {
    src?: string,60
    originalWidth?: number,
    originalHeight?: number,
    style?: object,
    objectFit?: string,
    imagePercent?: number,
    imageDegree: number,
    width: any,
    height: any,
    aspectRatio?: any
}

const Img = styled.img`
    flex:"auto"; // 쓰나 마나 인듯 
    object-fit: ${(props: ImgProps) => props.objectFit === "none" ? "contain" : "fill"};
    width: "auto";
    height: "auto";
    border: "10px solid blue";
    aspect-ratio: "auto " + ${(props: ImgProps) => props.aspectRatio};
    transform: rotate(${(props: ImgProps) => props.imageDegree + "deg"});
`;

/* packages/shared/src/components/Modal/ImageOpenModal.tsx */
const ImageModalForProfile = ({ url, modalOpen, setIsModalOpen }: IProps) => {
    const [imagePercent, setImagePercent] = useState(100);
    const [objectFit, setObjectFit] = useState("cover");
    const [originalWidth, setOriginalWidth] = useState(0);
    const [originalHeight, setOriginalHeight] = useState(0);
    const [imageDegree, setImageDegree] = useState(0);

    const [currentImageWidth, setCurrentImageWidth] = useState(0);
    


    // console.log("url : ", url);

    const mode = (mode: any) => {
        let imgMode;
        if (mode === "cover") {
            imgMode = "맞춤"
        }
        if (mode === "none") {
            imgMode = "원본"
        }

        return (
            <span>
                {imgMode}
            </span>
        )
    }

    useEffect(() => {

        let img = new Image();
        img.src = url;

        let width = img.width;
        let height = img.height;

        setOriginalWidth(width);
        setOriginalHeight(height);

    }, [open, url])

    const set_original_width_height = () => {
        let img = new Image();
        img.src = url;

        let width = img.width;
        let height = img.height;

        setOriginalWidth(width);
        setOriginalHeight(height);

    }

    const imageButtonClickHandler = (option: any) => {
        // e.preventDefault();
        // console.log("e : ", e);

        if (option == "original") {
            console.log("original");
            setObjectFit("none")
            setImagePercent(100);
            setImageDegree(0)
            set_original_width_height();
        }
        if (option == "custom") {
            console.log("custom");
            setObjectFit("cover")
            setImageDegree(0)
            setImagePercent(100);
        }

        if (option == "enlargement") {
            console.log("enlargement");
            if (imagePercent < 500) {
                setImagePercent((prev) => prev + 20)
            } else {
                alert("100이상은 증가할수 없습니다.");
            }
        }
        if (option == "reduction") {
            console.log("reduction");

            if (imagePercent > 15) {
                setImagePercent((prev) => prev - 10)

            } else {
                alert("10% 이하는 감소할수 없습니다.");
            }

        }

        if (option == "rotation+") {
            console.log("rotation");

            let img = new Image();
            img.src = url;

            let width = img.width;
            let height = img.height;

            console.log("objectFit : ", objectFit);
            console.log("origianlWidth : ", originalWidth);
            console.log("originalHeight : ", originalHeight);

            // if (imageDegree === 0) {
            //     console.log("90니까 높이 넓이 바꿔");
            //     // setOriginalWidth(height);
            //     // setOriginalHeight(width);
            // } else if (imageDegree === 180) {
            //     console.log("180니까 넓이 높이 바꿔");
            //     // setOriginalWidth(height);
            //     // setOriginalHeight(width);
            // } else {
            //     console.log("원래 대로 유지");
            //     // setOriginalWidth(width);
            //     // setOriginalHeight(height);
            // }

            setImageDegree((prev) => {
                switch (prev) {
                    case 270:
                        return 0;
                    default:
                        return prev + 90;
                }
            }
            )
        }

        if (option == "rotation-") {
            console.log("rotation");
            let img = new Image();
            img.src = url;
            let width = img.width;
            let height = img.height;

            console.log("objectFit : ", objectFit);
            console.log("origianlWidth : ", originalWidth);
            console.log("originalHeight : ", originalHeight);

            if (imageDegree === 0) {
                console.log("90니까 높이 넓이 바꿔");
                setOriginalWidth(height);
                setOriginalHeight(width);
            } else if (imageDegree === 180) {
                console.log("180니까 넓이 높이 바꿔");
                setOriginalWidth(height);
                setOriginalHeight(width);
            } else {
                console.log("원래 대로 유지");
                setOriginalWidth(width);
                setOriginalHeight(height);
            }

            setImageDegree((prev) => {
                switch (prev) {
                    case 270:
                        return 0;
                    default:
                        return prev - 90;
                }
            }
            )
        }

    }

    const close_modal = (option: boolean) => {
        setImageDegree(0);
        setObjectFit("cover");
        setImagePercent(100);
        setIsModalOpen(false);
    }

    const calculateWidth = (option: string, imagePercent: number) => {
        let img = new Image();
        img.src = url;
        let width = img.width;
        // console.log("imagePercent : ", imagePercent);
        const ratio = imagePercent / 100;
        // console.log("ratio : ", ratio);


        if (option === "original_image") {
            // console.log("width : ", width);
            return width * ratio;
        } else if (option === "custom_image") {
            return 800 * ratio
        }
        // console.log("hi");
    }

    const calculateHeight = (option: string, imagePercent: number) => {
        let img = new Image();
        img.src = url;
        let height = img.height;
        const ratio = imagePercent / 100;

        // console.log("imagePercent : ", imagePercent);
        // console.log("height : ", height);

        if (option === "original_image") {
            return height;
        } else if (option === "custom_image") {
            return 800 * ratio
        }

    }

    return (
        <div>
            <div>
                <Modal isOpen={modalOpen}
                    style={{
                        content: {
                            width: "1800px",
                            height: "700px"
                        },
                        overlay: {
                            background: 'rgba(0,0,0,.6)',
                        }
                    }}>


                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px", height: "20px", zIndex: 5 }}>
                            <button onClick={() => imageButtonClickHandler("original")} name="original">원본</button>
                            <button onClick={() => imageButtonClickHandler("custom")} name="custom">맞춤</button>

                            <FaSearchPlus
                                onClick={() => imageButtonClickHandler("enlargement")}
                            />

                            <FaSearchMinus
                                onClick={() => imageButtonClickHandler("reduction")}
                            />

                            <FaRedo
                                onClick={() => imageButtonClickHandler("rotation+")}
                            />

                            <FaUndo
                                onClick={() => imageButtonClickHandler("rotation-")}
                            />

                            {/* <Link href={url} target="_blank" download>Download</Link> */}

                            <a href={url} download={url}>
                                <FaSave
                                    onClick={() => console.log("save")}
                                />
                            </a>

                            <FaWindowClose
                                onClick={() => close_modal(false)}
                            />

                        </div>
                        <br />

                        <div style={{ display: "flex", justifyContent: "center", gap: "10px", height: "20px" }}>
                            모드: {mode(objectFit)} &nbsp;&nbsp;
                            폭 : {originalWidth}, 높이: {originalHeight} &nbsp;&nbsp;
                            비율: {imagePercent} &nbsp;&nbsp;
                            각도: {imageDegree} &nbsp;&nbsp;
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", gap: "10px", height: "20px" }}>
                            <Img
                                src={url}
                                alt={"이미지 없음"}
                                objectFit={objectFit}
                                imagePercent={imagePercent}
                                imageDegree={imageDegree}
                                width={objectFit === "none" ? calculateWidth("original_image", imagePercent) : calculateWidth("custom_image", imagePercent)}
                                height={objectFit === "none" ? calculateHeight("original_image", imageDegree) : calculateHeight("custom_image", imagePercent)}
                            />
                        </div>

                    </div>
                </Modal>
            </div>
        </div>

    )

}


export default ImageModalForProfile;