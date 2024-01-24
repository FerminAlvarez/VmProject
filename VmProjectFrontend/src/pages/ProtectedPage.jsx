import { Link } from "react-router-dom";

export default function PublicPage() {
    return (
        <div className="flex flex-col space-y-10">
            <h1>Protected Page</h1>
            <p>This is a private page for authenticated users.</p>
            <Link to="/">
                <button>Home</button>
            </Link>
        </div>
    );
}
