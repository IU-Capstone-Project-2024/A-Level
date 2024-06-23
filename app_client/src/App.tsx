import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import BrowseFile from './components/BrowseFile/BrowseFile';
import Uploaded from './components/Uploaded/Uploaded';
import Questions from './components/Questions/Questions';
import CreateQuestion from './components/CreateQuestion/CreateQuestion';
import Document from './components/Document/Document';


function App() {
  const [tab, setTab] = useState('browse');

  return (
    <div className="App">
      <Header onClick={setTab} active={tab}/>

      {tab === 'browse' && <BrowseFile />}
      {tab === 'uploaded' && <Uploaded />}
      {tab === 'questions' && <Questions />}
      {tab === 'create' && <CreateQuestion />}

    </div>
  );
}

export default App;
