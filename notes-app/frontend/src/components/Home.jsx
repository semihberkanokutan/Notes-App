// src/App.jsx
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import NoteList from './NoteList';
import NoteModal from './NoteModal';


const HomeBuild = styled.div`
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 4rem;

    & .homeTop {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;

        & button {
            padding: 0.3rem;
            cursor: pointer;
            background-color: #007bff;
            color: #fff;
            border: 1px solid #007bff;
            font-size: 2.2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            line-height: 0;
            transition: all .2s ease;

            &:hover {
                background-color: #006999;
            }
        }
    }

`

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState({
    activeTitle: null,
    activeContent: null,
  })
  const navigate = useNavigate()
  const dialog = useRef()
  const activeNoteRef = useRef()

  const handleOpenNote = async (id) => {
    try {
      const res = await axios.get(`https://notesapp-459915.uc.r.appspot.com/api/notes/${id}/`);
      console.log(res.data)
      setActiveNote({
        activeTitle: res.data.title,
        activeContent: res.data.content
      })
      dialog.current.open()
    } catch (err) {
      console.error('Couldnt fetch the data:', err);
    }
  }

  const handleNavigate = () => {
    navigate('/new')
  }

  const fetchNotes = async () => {
    try {
      const res = await axios.get('https://notesapp-459915.uc.r.appspot.com/api/notes/');
      setNotes(res.data);
    } catch (err) {
      console.error('Couldnt fetch the data:', err);
    }
  };

  

  const deleteNote = async (id) => {
    try {
      await axios.delete(`https://notesapp-459915.uc.r.appspot.com/api/notes/${id}/`);
      fetchNotes();
    } catch (err) {
      console.error('Couldnt delete the data:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <HomeBuild>
        <div className='homeTop'>
            <h1>📝 Notes</h1>
            <button onClick={handleNavigate}>+</button>
        </div>
        <NoteList 
          notes={notes} 
          onDelete={deleteNote} 
          onRead={handleOpenNote} 
          ref={activeNoteRef}
        />
        <NoteModal 
          modalTitle={activeNote.activeTitle} 
          modalContent={activeNote.activeContent}
          ref={dialog}
        />
    </HomeBuild>
  );
}

export default App;
