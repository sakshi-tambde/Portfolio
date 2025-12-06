import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import "../css/style.css";

export default function Content() {
    const navigate = useNavigate();
    const location = useLocation();

    // Toggle state for MYSELF link
    const toggleRef = useRef(0);

    // Reset toggle when user navigates anywhere except "/"
    useEffect(() => {
        if (location.pathname !== "/") {
            toggleRef.current = 0;
        }
    }, [location.pathname]);

    // Dual-toggle handler
    const handleMyselfClick = (e) => {
    e.preventDefault(); // prevent normal Link navigation

    if (location.pathname === "/") {
        // If already on home → go directly to about
        navigate("/about");
        toggleRef.current = 0; // reset cycle
        return;
    }

    // Normal toggle behavior when not on "/"
    if (toggleRef.current === 0) {
        navigate("/");      // first click → home
        toggleRef.current = 1;
    } else {
        navigate("/about"); // second click → about
        toggleRef.current = 0;
    }};


    return (
        <div id="site">
            <main className="nav-bar">
                <div id="main-content">
                    <div id="my-outlet">
                        <Outlet />
                    </div>
                </div>

                <ul className="content" id="menu">
                    {/* Dual-behavior MYSELF link */}
                    <li>
                        <Link to="/" className="myself" onClick={handleMyselfClick}>
                            <span className="myself-label">MYSELF</span>
                        </Link>
                    </li>

                    {/* Normal links */}
                    <li>
                        <Link to="/ai" className="ai">
                            <span className="ai-label">AI</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/thumb" className="thumb">
                            <span className="thumb-label">THUMBNAILS</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/poster" className="poster">
                            <span className="poster-label">POSTER</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/credit" className="credit">
                            <span className="credit-label">CREDITS</span>
                        </Link>
                    </li>
                </ul>
            </main>
        </div>
    );
}
