import styled from "styled-components"
import { useRef, useImperativeHandle } from "react"


const NoteModalBuild = styled.dialog`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    min-height: 700px;
    padding: 24px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background-color: #d1d1d1;
    border-radius: 5px;
    border: 2px solid #dedede;
    color: #313133;

    &::backdrop {
        backdrop-filter: blur(6px);
    }

    & div {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }


    & button {
        cursor: pointer;
        font-size: 24px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color:rgb(79, 76, 76);
        font-weight: bold;
        color: #ffffff;
        border-width: 3px;
    }

    & h2 {
        text-align: center;
        font-size: 2rem;
        text-transform: capitalize;
    }
    
`

export default function NoteModal({modalTitle, modalContent, ref}) {
    const dialog = useRef()

    useImperativeHandle(ref, () => ({
        open: () => dialog.current.showModal(),
        close: () => dialog.current.close(),
    }));
    
    const handleClose = () => {
        dialog.current.close()
    }

    return (
        <NoteModalBuild ref={dialog} >
            <div>
                <button onClick={handleClose}>✕</button>
                <h2>{modalTitle}</h2>
                <p>{modalContent}</p>
            </div>
        </NoteModalBuild>
    )
}