import Keycloak from "keycloak-js";

// Create a Keycloak configuration object
const keycloakConfig = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

export default keycloakConfig;
