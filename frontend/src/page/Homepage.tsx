import React from 'react'
import NavBar from '../components/NavBar'
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="BG flex absolute inset-0 items-center justify-center -z-10">
        <div className="w-[1095px] h-[1319px] bg-secondary blur-[254.5px]" />
      </div>

      <NavBar />

      <div className="min-h-screen flex justify-center items-center  z-0">
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-6">
            <button
              onClick={() => navigate("/category")}
              className="bg-white text-black font-semibold px-12 py-15 rounded-lg shadow border hover:bg-gray-100 transition"
            >
              Create
            </button>

            <button
              onClick={() => navigate("/waiting")}
              className="bg-white text-black font-semibold px-12 py-15 rounded-lg shadow border hover:bg-gray-100 transition"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage
