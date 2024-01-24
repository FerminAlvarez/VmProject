import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";

const AuthenticationHandler = ({ children }) => {
    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        if (initialized && !keycloak.authenticated) keycloak.login();
    }, [initialized]);

    if (!initialized) return <p>Loading ...</p>;

    if (!keycloak.authenticated) return <p>Authenticating ...</p>;

    return children; // Render children only if authenticated
};

export default AuthenticationHandler;
