import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const [dropdownProfileOpen, setDropdownProfileOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="flex justify-between p-5 w-full h-16 items-center shadow-md bg-white z-[9999] relative">
      <NavLink to="/" className="text-black sm:text-xl text-lg font-bold">
        Yes No Maybe So
      </NavLink>

      <div className="relative justify-center items-center">
        <button
          onClick={() => setDropdownProfileOpen(!dropdownProfileOpen)}
          className="text-3xl"
        >
          <FaUserCircle />
        </button>

        {dropdownProfileOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg z-[9999]">
            <button
              onClick={handleLogout}
              className="block px-4 py-2 w-full text-left hover:bg-gray-100 transition"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
