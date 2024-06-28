import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BrowseFilePage from "../pages/BrowseFilePage/BrowseFilePage";
import UploadedFilesPage from "../pages/UploadedFilesPage/UploadedFilesPage";
import DocumentViewPage from "../pages/DocumentViewPage/DocumentViewPage";

type tabType = 'browse' | 'uploaded' | 'questions' |'create' | 'generate'| null;

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "browse", element: <BrowseFilePage />},
            {path: "uploaded", element: <UploadedFilesPage/>},
            {path: "document/:ticker", element: <DocumentViewPage/>}
        ]
    }
]);