import Fab from '@material-ui/core/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Zoom } from '@mui/material';
import React, { useState } from 'react';

function Input(props) {
  const [note, setNote] = useState({
    title: '',
    content: ''
  });

  const [isClicked, setIsClicked] = useState(false);

  function inputChangeHandler(event) {
    const { name, value } = event.target;
    setNote((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function textareaClickHandler() {
    setIsClicked(true);
  }

  return (
    <div>
      <form className='create-note'>
        {isClicked && (
          <input
            onChange={inputChangeHandler}
            className='title'
            name='title'
            type='text'
            placeholder='Title'
            value={note.title}
          />
        )}

        <textarea
          onChange={inputChangeHandler}
          className='content'
          rows={isClicked ? '4' : '1'}
          name='content'
          type='text'
          placeholder='Content'
          value={note.content}
          onClick={textareaClickHandler}
        />

        <Zoom in={isClicked}>
          <Fab
            onClick={() => {
              props.addItemToList(note);
            }}
            type='button'
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default Input;
