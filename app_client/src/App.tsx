import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import BrowseFile from './components/BrowseFile/BrowseFile';
import Uploaded from './components/Uploaded/Uploaded';
import Questions from './components/Questions/Questions';
import CreateQuestion from './components/CreateQuestion/CreateQuestion';
import Document from './components/Document/Document';

type tabType = 'browse' | 'uploaded' | 'questions' |'create' | null;

interface DocumentProps {
  _id: string;
  path: string;
  filename: string;
  tasks: string[];
  img: string | null;
}


function App() {
  const [tab, setTab] = useState<tabType>('browse');
  const [document, setDocument] = useState<DocumentProps | null>(null);
  const [displayDocument, setDisplayDocument] = useState<boolean>(false);


  return (
    <div className="App">
      <Header onClick={setTab} active={tab} setDisplayDoc={setDisplayDocument}/>
      {!displayDocument && <>
        {tab === 'browse' && <BrowseFile setDoc={setDocument} setDisplayDoc={setDisplayDocument}/>}
        {tab === 'uploaded' && <Uploaded />}
        {tab === 'questions' && <Questions />}
        {tab === 'create' && <CreateQuestion />}  
      </>}

      {displayDocument && <Document doc={document}/>}
      
    </div>
  );
}

export default App;
