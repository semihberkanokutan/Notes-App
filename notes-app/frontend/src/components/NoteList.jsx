// src/components/NoteList.jsx
import styled from "styled-components";
import TrashCanIcon from '../../public/trashcan.png'
import BookIcon from '../../public/book.png'
import { forwardRef } from "react";


const NoteListBuild = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`

const NoteBuild = styled.div`
  background-color: var(--color${Math.floor(Math.random() * 5)});
  padding: 24px;
  height: 300px;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  

  & h2 {
    text-transform: capitalize;  
    color: #313133;
  }

  & p {
    color: #313133;
  }

  & .btnGroup {
    position: absolute;
    right: 24px;
    bottom: 24px;
  }

  & .readBtn, .deleteBtn {
    background: none;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s ease;
    width: 50px;
    height: 50px;
    margin-right: 12px;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      
      border-radius: 50%;
    }

    
  }

  & .deleteBtn {
    & img {
      border: 1px solid red;
    }

    &:hover {
      background-color:rgb(224, 19, 40);
      border-color: rgb(224, 19, 40);
    }
  }

  & .readBtn {
    & img {
      border: 1px solid blue;
    }

    &:hover {
      background-color:rgb(14, 119, 154);
      border-color: rgb(14, 119, 154);
    }
  }

`

const NoteList = forwardRef(function NoteList({ notes, onDelete, onRead }, ref) {
  const colors = ['#BDDDE4', '#E69DB8', '#ADB2D4', '#C1CFA1', '#FFC785']
  
  return (
    <NoteListBuild>
      {Array.isArray(notes) && 
      notes.map((note) => (
        <NoteBuild 
          key={note.id} 
          style={{backgroundColor: colors[Math.floor(Math.random() * colors.length)]}}
          ref={ref}
        >
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <div className="btnGroup">
            <button className="readBtn" onClick={() => onRead(note.id)}>
              <img src={BookIcon} alt="" />
            </button>
            <button onClick={() => onDelete(note.id)} className="deleteBtn">
              <img src={TrashCanIcon} alt="" />
            </button>
          </div>
        </NoteBuild>
      ))}
    </NoteListBuild>
  );
});

export default NoteList

