import { useKeycloak } from "@react-keycloak/web";
import { Link } from "react-router-dom";
import "./App.css";
import TerminalsContainerComponent from "./components/TerminalsContainerComponent";
import HeroComponent from "./components/sections/HeroComponent";

function App() {
    const { keycloak } = useKeycloak();

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="top-0 mt-10 ">
                <HeroComponent />
                <div className="flex flex-row space-x-2 justify-center">
                    {!keycloak.authenticated ? (
                        <button className="bg-green-700 w-44" onClick={() => keycloak.login()}>
                            Login
                        </button>
                    ) : (
                        <>
                            <button className="bg-red-700 w-44" onClick={() => keycloak.logout()}>
                                Logout ({keycloak.tokenParsed.preferred_username})
                            </button>

                            <Link to="/public">
                                <button className="bg-sky-900 w-44 text-white">Public Page</button>
                            </Link>

                            <Link to="/protected">
                                <button className="bg-sky-900 w-44 text-white">
                                    Protected Page
                                </button>
                            </Link>

                            <Link to="/python-file">
                                <button className="bg-sky-900 w-44 text-white">
                                    Run Python files
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {keycloak.authenticated && <TerminalsContainerComponent token={keycloak.token} />}
        </div>
    );
}

export default App;
