import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import { TopicsProvider } from './context/TopicContext';
import { TabProvider } from './context/TabContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <React.StrictMode>
    <TopicsProvider>
      <TabProvider>
        <RouterProvider router={router} />
      </TabProvider>
    </TopicsProvider>
  </React.StrictMode>
);

reportWebVitals();
