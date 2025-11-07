import React from "react";

const MobileNav = ({
  isOpen,
  commonLinks,
  userLinks,
  adminLinks,
  user,
  handleLogout,
  isAdmin,
}) => {
  return (
    <>
      {isOpen && (
        <div className="md:hidden mt-4 px-6 py-6 flex flex-col items-start space-y-5 text-gray-700 font-medium">
          {commonLinks}
          {user && (isAdmin ? adminLinks : userLinks)}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <div className="space-y-2">
              <Link
                to="/signin"
                className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-100"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MobileNav;
