import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedPage from "./pages/ProtectedPage"
import PublicPage from "./pages/PublicPage"
import PrivateRoute from "./utils/PrivateRoute"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "public",
        element: <PublicPage />
    },
    {
        path: "protected",
        element: <PrivateRoute> <ProtectedPage /></PrivateRoute>
    },
])