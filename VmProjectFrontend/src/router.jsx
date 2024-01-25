import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthenticationHandler from "./auth/AuthenticationHandler";
import ProtectedPage from "./pages/ProtectedPage";
import PublicPage from "./pages/PublicPage";
import FilePythonPage from "./pages/FilePythonPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "public",
        element: <PublicPage />,
    },
    {
        path: "protected",
        element: (
            <AuthenticationHandler>
                <ProtectedPage />
            </AuthenticationHandler>
        ),
    },
    {
        path: "python-file",
        element: (
            <AuthenticationHandler>
                <FilePythonPage />
            </AuthenticationHandler>
        ),
    },
]);
