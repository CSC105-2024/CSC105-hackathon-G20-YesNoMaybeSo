import React from "react";
import NavBar from "../components/NavBar";
import { foods } from "../mockdata/mockData";
import { useNavigate } from "react-router-dom";

function CategoryItem() {
  const foodMoc = foods.result;
  const navigate = useNavigate();

  return (
    <>
      <div className="BG flex absolute inset-0 items-center justify-center -z-10">
        <div className="w-[1095px] h-[1319px] bg-secondary blur-[254.5px]" />
      </div>

      <NavBar />

      <div className="flex justify-center items-center m-4 my-12">
        <div className="text-center justify-center text-accent text-4xl font-bold ">
          Japanese food
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="MiddleContainer gap-4 sm:w-[90%] md:w-[50%] h-[auto] max-h-[600px] overflow-y-auto bg-white rounded-2xl flex flex-col items-center py-10 px-4 shadow-xl">
          {foodMoc.map((food, index) => (
            <div
              key={index}
              className="w-full bg-secondary text-center py-10 rounded-xl text-primary font-bold text-xl "
            >
              {food.name}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-[#E74645] mt-6 w-[90%] md:w-[50%] h-[50px] flex justify-center rounded-2xl shadow-md hover:opacity-90 transition">
          <button
            onClick={() => navigate("/entermember")}
            className="text-center text-white text-xl font-bold"
          >
            Create Room
          </button>
        </div>
      </div>
    </>
  );
}

export default CategoryItem;
