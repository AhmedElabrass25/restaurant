import React from "react";
import { Link } from "react-router-dom";

const AuthButtons = ({ user, handleLogout }) => {
  return (
    <>
      <div className="hidden md:flex">
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <div className="space-x-3">
            <Link
              to="/signin"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-100"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthButtons;
