import React from 'react'
import NavBar from '../components/NavBar';

function CategoryItem() {

  const List = () => (
    <div className="w-full max-w-[500px] h-[150px] bg-secondary rounded-2xl shadow-md p-4 sm:p-6 flex md:flex-row gap-4 sm:gap-16 justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="text-center text-primary text-2xl font-bold ">
          Takogaki
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="BG flex absolute inset-0 items-center justify-center -z-10">
        <div className="w-[1095px] h-[1319px] bg-secondary blur-[254.5px]" />
      </div>
      <NavBar />

      <div className="flex justify-center items-center m-4 my-12">
        <div className="text-center justify-center text-accent text-4xl font-bold ">
          category: Japanese food
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="MiddleContainer gap-8 sm:w-[40%] w-[50%] h-[600px]  overflow-y-auto bg-white rounded-2xl flex flex-col items-center py-10 px-4 shadow-xl">
          <List />
        </div>
      </div>

      <div className="flex justify-center ">
        <div className="bg-[#E74645] mt-6 w-[40%] h-[50px] flex justify-center rounded-2xl">
          <button className="text-center justify-start text-white text-2xl font-bold ">
            Create Room
          </button>
        </div>
      </div>
    </>
  );
}

export default CategoryItem
