import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BrowseFilePage from "../pages/BrowseFilePage/BrowseFilePage";
import UploadedFilesPage from "../pages/UploadedFilesPage/UploadedFilesPage";
import DocumentViewPage from "../pages/DocumentViewPage/DocumentViewPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "browse_file", element: <BrowseFilePage />},
            {path: "uploaded_files", element: <UploadedFilesPage/>},
            {path: "document/:ticker", element: <DocumentViewPage/>}
        ]
    }
]);