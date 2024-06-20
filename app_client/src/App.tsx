import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import BrowseFile from './components/BrowseFile/BrowseFile';
import Uploaded from './components/Uploaded/Uploaded';
import Questions from './components/Questions/Questions';
import CreateQuestion from './components/CreateQuestion/CreateQuestion';


function App() {
  const [tab, setTab] = useState('browse');
  return (
    <div className="App">
      <Header onClick={setTab}/>

      {tab === 'browse' && <BrowseFile />}
      {tab === 'uploaded' && <Uploaded />}
      {tab === 'questions' && <Questions />}
      {tab === 'create' && <CreateQuestion />}
      

    </div>
  );
}

export default App;
