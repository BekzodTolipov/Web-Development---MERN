import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Input from './Input';
import Note from './Note';

function App() {
    const [listOfNotes, setListOfNotes] = useState([]);

    function addNoteToList(note) {
        setListOfNotes([...listOfNotes, note]);
    }

    function deleteNoteHandler(id) {
        setListOfNotes(prev => {
            return prev.filter((note, index) => {
                return index !== id;
            })
        })
    }


    return <div className="layout">
        <Header />
        <Input addItemToList={addNoteToList}/>
        {
            listOfNotes.map((note, index) => {
                return (<Note 
                    key={index}
                    id={index}
                    title={note.title}
                    content={note.content}
                    deleteNote={deleteNoteHandler}
                />)
            })
        }
        <Footer />
    </div>;
}

export default App; 