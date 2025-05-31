import React, { useState } from "react";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

interface Item {
  id: number;
  title: string;
}

const EnterMember: React.FC = () => {
  const [item, setItems] = useState<Item[]>([]);
  const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();

  const handleItem = () => {
    const newItem: Item = {
      id: nextId,
      title: "",
    };
    setItems((prev) => [...prev, newItem]);
    setNextId((prev) => prev + 1);
  };

  const handleChangeItem = (id: number, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: value } : item))
    );
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmitCategory = () => {
    const data = {
      items: item.filter((i) => i.title.trim() !== ""),
    };

    console.log("Category Data:", data);
    //Axios.post("/api/category", data)

    navigate("/participants");
  };

  return (
    <>
      <Navbar />
      <div className="w-screen h-full bg-secondary pb-8">
        <div className="flex justify-center items-center">
          <div className="flex sm:w-[50%] w-[80%] min-h-15 justify-center items-center  my-8 gap-3 sm:flex-row flex-col">
            <div className="text-center justify-center text-primary text-3xl font-bold">
              Member
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <div className="MiddleContainer gap-8 sm:w-[50%] w-[80%] h-[700px] overflow-y-auto bg-white rounded-2xl flex flex-col items-center py-10 px-4 shadow-xl">
            {item.map((item) => (
              <div
                key={item.id}
                className="w-full max-w-[700px] bg-secondary rounded-2xl shadow-md p-4 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-16 items-center"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="text-lg text-center w-full sm:text-xl md:text-2xl font-bold text-slate-800 outline-none p-2 rounded-xl">
                    Username :
                  </div>
                  <input
                    value={item.title}
                    onChange={(e) => handleChangeItem(item.id, e.target.value)}
                    placeholder="Enter username"
                    className="text-lg text-center w-full sm:text-xl md:text-2xl font-bold text-slate-800 outline-none p-2 rounded-xl"
                  />
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-accent hover:bg-[#F32322] text-white text-sm sm:text-base font-semibold px-6 py-2 rounded-xl w-full md:w-[20%] transition"
                >
                  Delete
                </button>
              </div>
            ))}

            <div
              onClick={handleItem}
              className="w-full max-w-[700px] h-50 min-h-40 bg-[#FEE6E1] flex justify-center items-center border-2 border-black rounded-2xl border-dashed cursor-pointer hover:bg-white/50 transition"
            >
              <p className="text-center text-xl font-semibold">+ Add more</p>
            </div>
          </div>

          <button
            onClick={handleSubmitCategory}
            className="sm:w-[50%] w-[80%] bg-accent hover:bg-[#F32322] text-white font-bold rounded-2xl h-14 flex items-center justify-center transition"
        >
            Create Room
          </button>
        </div>
      </div>
    </>
  );
};

export default EnterMember;
