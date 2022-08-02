import React, { useState } from 'react';

function Input(props) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function inputChangeHandler(event) {
        const {name, value} = event.target;
        setNote(prev => {
            return {...prev, [name] : value};
        });
    }

    return (
        <div className="note-input">
            <input onChange={inputChangeHandler} className="title" name="title" 
            type="text" placeholder="Title" value={note.title} />
            <input onChange={inputChangeHandler} className="content" name="content" 
            type="text" placeholder="Content" value={note.content} />
            <button onClick={() => {props.addItemToList(note)}} type="button" className="add-btn">add</button>
        </div>
    );
}

export default Input;