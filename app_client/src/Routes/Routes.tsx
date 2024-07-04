import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import BrowseFilePage from '../pages/BrowseFilePage/BrowseFilePage';
import UploadedFilesPage from '../pages/UploadedFilesPage/UploadedFilesPage';
import DocumentViewPage from '../pages/DocumentViewPage/DocumentViewPage';
import CreateQuestionPage from '../pages/CreateQuestionPage/CreateQuestionPage';
import QuestionsPage from '../pages/QuestionsPage/QuestionsPage';
import SavedCreatedQuestionPage from '../pages/SavedCreatedQuestionPage/SavedCreatedQuestionPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'browse', element: <BrowseFilePage /> },
      { path: 'uploaded', element: <UploadedFilesPage /> },
      { path: 'document/:filename', element: <DocumentViewPage /> },
      { path: 'create', element: <CreateQuestionPage /> },
      { path: 'questions', element: <QuestionsPage /> },
      { path: 'saved', element: <SavedCreatedQuestionPage /> },
    ],
  },
]);
