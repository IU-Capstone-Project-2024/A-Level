import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from "axios";
import './App.css';
import Header from './components/Header/Header';
import BrowseFile from './components/BrowseFile/BrowseFile';
import Uploaded from './components/Uploaded/Uploaded';
import Questions from './components/Questions/Questions';
import CreateQuestion from './components/CreateQuestion/CreateQuestion';
import Document from './components/Document/Document';
import { Outlet } from 'react-router';

type tabType = 'browse' | 'uploaded' | 'questions' |'create' | null;

interface DocumentProps {
  _id: string;
  path: string;
  filename: string;
  tasks: string[];
  img: string | null;
}
interface TopicTransformResp {
  names: string[];
}



function App() {
  const [tab, setTab] = useState<tabType>('browse');
  const [document, setDocument] = useState<DocumentProps | null>(null);
  const [displayDocument, setDisplayDocument] = useState<boolean>(false);
  const [topics, setTopics] = useState<TopicTransformResp>();


  async function getTopics() {
    const topicTransformResp : AxiosResponse<TopicTransformResp> = await axios.get(`http://0.0.0.0:8000/utils/topicEnum`);
      if (topicTransformResp.status === 200){
        setTopics(topicTransformResp.data);
      }
  }


  useEffect(()=> {
    getTopics();
  }, []);

  return (
    <div className="App">
      <Header onClick={setTab} active={tab} setDisplayDoc={setDisplayDocument}/>
      <Outlet />
      {/* {!displayDocument && <>
        {tab === 'browse' && <BrowseFile setDoc={setDocument} setDisplayDoc={setDisplayDocument}/>}
        {tab === 'uploaded' && <Uploaded />}
        {tab === 'questions' && <Questions />}
        {tab === 'create' && <CreateQuestion />}  
      </>}

      {displayDocument && <Document doc={document} topics={topics} setDocument={setDocument} setDisplayDoc={setDisplayDocument} setTab={setTab}/>}
       */}
    </div>
  );
}

export default App;
