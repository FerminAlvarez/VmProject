import { Link } from "react-router-dom";
import FilePythonComponent from "../components/FilePythonComponent";
import { useKeycloak } from "@react-keycloak/web";

export default function PublicPage() {
    const { keycloak } = useKeycloak();

    return (
        <div className="flex flex-col space-y-10">
            <h1>Run your Python files</h1>
            <p>Select and run your Python files!</p>

            <FilePythonComponent token={keycloak.token} />

            <Link to="/">
                <button>Home</button>
            </Link>
        </div>
    );
}
