import { ReactKeycloakProvider } from "@react-keycloak/web";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import keycloakConfig from "./config/keycloakConfig.js";
import "./index.css";
import { router } from "./router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ReactKeycloakProvider authClient={keycloakConfig}>
        <RouterProvider router={router} />
    </ReactKeycloakProvider>
);
