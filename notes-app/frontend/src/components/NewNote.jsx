import styled from 'styled-components'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const FormBuild = styled.form`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #dedede;
    max-width: 600px;
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 24px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 5px;

    & h1 {
        text-align: center;
    }

    & input, textarea {
        outline: none;
        padding: 8px;
        font-size: 16px;
        border: 2px solid #6c757d;


        &:focus {
            border-color: #007bff;
        }
    }

    & input {
        
    }

    & textarea {
        
        resize: none;
        height: 150px;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 12px;

        & button {
            font-size: 1rem;
            padding: .375rem .75rem;
            border-radius: 4px;
            font-weight: 400;
            white-space: nowrap;
            text-decoration: none;
            transition: all .15s ease;
            text-align: center;

            &:hover {
                cursor: pointer;
            }
        }

        & .cancelBtn {
            background-color: none;
            color: #6c757d;
            border: 1px solid #6c757d;

            &: hover {
                background-color: #6c757d;
                color: #fff;
            }
        }

        & .saveBtn {
            background-color: #007bff;
            border: 1px solid #007bff;
            color: #fff;

            &: hover {
                background-color: #0069d9;
                color: #fff;
            }
        }
    }

`

export default function NewNote({initialNote = null}) {
    const title = useRef()
    const content = useRef()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.current.value.trim() || !content.current.value.trim()) return;
        try {
            await axios.post('https://notesapp-459915.uc.r.appspot.com/api/notes/', 
                {title: title.current.value, content: content.current.value});
        } catch (err) {
            console.error('Not eklenemedi:', err);
        }
        title.current.value = ''
        content.current.value = ''
        navigate('/')
    }

    const handleCancel = () => {
        navigate('/')
    }


    return (
        <FormBuild onSubmit={handleSubmit}>
            <h1>{initialNote ? 'Edit the Note' : 'Add New Note'}</h1>
            <input 
                type="text" 
                ref={title}
                placeholder='Title'
            />
            <textarea 
                ref={content} 
                placeholder='Content'
            />
            <div>
                <button 
                    className='cancelBtn'
                    type='button'
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button 
                    className='saveBtn' 
                    type='submit'
                >
                    Save
                </button>
            </div>
        </FormBuild>
    )
}