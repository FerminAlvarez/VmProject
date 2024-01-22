import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloakConfig from './utils/keycloak.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ReactKeycloakProvider authClient={keycloakConfig}>
    <RouterProvider router={router} />
  </ReactKeycloakProvider>
)
