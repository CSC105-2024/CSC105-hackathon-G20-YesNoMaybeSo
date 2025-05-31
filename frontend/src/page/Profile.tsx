import React from "react";
import Navbar from "../components/NavBar";
import { FaRegUser } from "react-icons/fa";
import Back from "../img/image-mesh-gradient.png";

function Profile() {
  return (
    <>
      <div className="relative min-h-screen w-full">
        <img
          src={Back}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <div className="relative z-20">
          <Navbar />
        </div>

        <div className="relative z-10 flex flex-col min-w-[70svw] justify-center min-h-[calc(100vh-64px)] items-center px-4 py-4 mt-6 w-full max-w-screen-xl mx-auto">
          <h3 className="font-bold flex w-full  text-white sm:text-[#092737] mb-6 justify-center text-5xl">
            Proflie
          </h3>

          <div className="w-full max-w-[600px] min-h-[40vh] bg-[#FFE7AC] rounded-2xl p-6 shadow flex justify-center items-center mx-auto">
            <div className="flex flex-row justify-center items-center gap-9">
              <div className="text-8xl">
                <FaRegUser />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-4">
                  <div className="text-xl font-semibold text-[#E84057]">
                    User Name :
                  </div>
                  <div className="text-xl font-semibold text-[#E84057]">
                    i wanna be your star star
                  </div>
                </div>

                <div className="flex flex-row gap-4">
                  <div className="text-xl font-semibold text-[#E84057]">
                    User Id :
                  </div>
                  <div className="text-xl font-semibold text-[#E84057]">
                    9
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <button className="bg-[#E74645] mt-6 w-full max-w-[600px] h-[60px] text-white text-2xl font-bold font-['Poppins'] rounded-2xl shadow-md">
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
