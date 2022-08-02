import React from 'react';

function Note(props) {
    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button className="delete-note-btn" onClick={() => {props.deleteNote(props.id)}} >delete</button>
        </div>
    );
}

export default Note;