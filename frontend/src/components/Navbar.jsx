import {Link} from "react-router"
import { useUser } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
export default function Navbar(){
    const { isSignedIn } = useUser();
    return (
      <>
        <div className="navbar bg-base-100 shadow-sm">
          {isSignedIn ? (
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />{" "}
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/">HomePage</Link>
                  </li>
                  <li>
                    <Link to="/timeline">Timeline</Link>
                  </li>
                  <li>
                    <Link to="/favourites">Favourites</Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}

          <div className={isSignedIn ? "navbar-center" : "navbar-start"}>
            <Link to="/" className="btn btn-ghost text-xl">
              MoodSync
            </Link>
          </div>
          {!isSignedIn ? (
            <div className="navbar-center">
              <Link
                to="/register"
                className="h-10 w-20 flex items-center justify-center hover:bg-gray-700 rounded-2xl"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="h-10 w-20 flex items-center justify-center hover:bg-gray-700 rounded-2xl"
              >
                Login
              </Link>
            </div>
          ) : null}
          <div className="navbar-end">
            <UserButton  />
          </div>
        </div>
      </>
    );
}