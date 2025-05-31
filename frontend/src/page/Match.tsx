import React from "react";
import NavBar from "../components/NavBar";
import {foods} from "../mockdata/mockData";

function Match() {
  const foodsData = foods.result;
  return (
    <>
      <div className="BG flex absolute inset-0 items-center justify-center -z-10">
        <div className="w-[1095px] h-[1319px] bg-secondary blur-[254.5px]" />
      </div>
      <NavBar />
      <div className="flex flex-col justify-center items-center mt-19 gap-16">
        <div className="flex justify-center items-center m-4 my-12">
          <div className="text-center justify-center text-accent text-4xl font-bold ">
            Match result
          </div>
        </div>

        <div className=" flex flex-row justify-center items-center px-4">
          <div className="flex justify-center items-end gap-2 sm:gap-4 md:gap-6   scale-[0.8] sm:scale-100">
            <div className="flex flex-col items-center">
              <div className="text-base sm:text-lg md:text-xl text-primary">
                jr
              </div>
              <div className="bg-primary w-20 sm:w-28 md:w-40 h-[140px] sm:h-[200px] md:h-[250px] rounded-t-md mt-2 flex flex-col justify-end items-center text-white font-bold shadow-lg">
                <p className="mb-1 sm:mb-2">Match</p>
                <p className="mb-2 sm:mb-4 text-xs sm:text-sm">8</p>
              </div>
            </div>

            <div className="flex flex-col items-center  gap-7 justify-center">
              <div className="text-base sm:text-lg md:text-xl text-primary">
                jr
              </div>
              <div className="bg-accent w-24 sm:w-32 md:w-48 h-[180px] sm:h-[270px] md:h-[350px] rounded-t-md mt-2 flex flex-col justify-end items-center text-white font-bold shadow-lg">
                <p className="mb-1 sm:mb-2">Match</p>
                <p className="mb-2 sm:mb-4 text-xs sm:text-sm">9</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-base sm:text-lg md:text-xl text-primary">
                jr
              </div>
              <div className="bg-[#FEE6E1] w-16 sm:w-24 md:w-32 h-[120px] sm:h-[160px] md:h-[200px] rounded-t-md mt-2 flex flex-col justify-end items-center text-primary font-bold shadow-lg">
                <p className="mb-1 sm:mb-2">Match</p>
                <p className="mb-2 sm:mb-4 text-xs sm:text-sm">9</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center p-20 py-0 ">
            <div className=" gap-4 w-[250px] sm:w-[300px] max-h-[400px] overflow-y-auto bg-white rounded-2xl flex flex-col items-center py-10 px-4 shadow-xl ">
              {foodsData.map((food, index) => (
                <div
                  key={index}
                  className="w-full bg-secondary text-center py-10 rounded-xl text-primary font-bold text-xl "
                >
                  {food.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      \
    </>
  );

  
}

export default Match;
