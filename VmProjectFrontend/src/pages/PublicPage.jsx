import { Link } from "react-router-dom";

export default function PublicPage() {
    return (
        <div className="flex flex-col space-y-10">
            <h1>Public Page</h1>
            <p>This is a demonstration page to show that anyone can access it.</p>
            <Link to="/">
                <button>Home</button>
            </Link>
        </div>
    )
}