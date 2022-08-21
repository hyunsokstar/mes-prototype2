import React, { useState } from 'react';
import styled from 'styled-components'
import Modal from 'react-modal';
import DataGrid from 'react-data-grid';

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' }
];

const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' }
];


type Props = {}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
    },
};


function searchModalForUser({ }: Props) {
    let subtitle: HTMLHeadingElement | null;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>

            <ModalWrapper>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>

                    <div style={{ border: "0px solid green" }}>
                        <div style={{display:"flex", justifyContent:"flex-end", border:"0px solid"}}>
                            <button onClick={closeModal} >close</button>
                        </div>
                        <br />
                        <DataGrid columns={columns} rows={rows} />
                    </div>

                </Modal>


            </ModalWrapper>

        </div>
    )
}

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
`

export default searchModalForUser