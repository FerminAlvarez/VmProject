import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";

const PrivateRoute = ({children}) => {
    const {keycloak, initialized} = useKeycloak();

    useEffect(() => {
        if(initialized)
            if(!keycloak.authenticated)
                keycloak.login();
    },[initialized])

    if(!initialized)
        return <p>Loading ...</p>

    if(!keycloak.authenticated)
        return <p>Authenticanting</p>    

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? children : null;
};

export default PrivateRoute;