// import React, { useState } from "react";
// import Navbar from "../components/NavBar";

// interface Item {
//   id: number;
//   title: string;
// }

// const Participants: React.FC = () => {
//   const [item, setItems] = useState<Item[]>([]);
//   const [nextId, setNextId] = useState(1);
//   const [categoryName, setCategoryName] = useState("");

//   const handleItem = () => {
//     const newItem: Item = {
//       id: nextId,
//       title: "",
//     };
//     setItems((prev) => [...prev, newItem]);
//     setNextId((prev) => prev + 1);
//   };

//   const handleChangeItem = (id: number, value: string) => {
//     setItems((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, title: value } : item))
//     );
//   };

//   const handleDelete = (id: number) => {
//     setItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleSubmitCategory = () => {
//     const data = {
//       categoryName: categoryName || "Untitled",
//       items: item.filter((i) => i.title.trim() !== ""),
//     };

//     console.log("📦 Category Data:", data);
//     //Axios.post("/api/category", data)
//   };

//   return (
//     <>
//       <Navbar />
//         <div className="w-screen h-full bg-secondary pb-8">

//       <div className="flex justify-center items-center">
//         <div className="flex sm:w-[50%] w-[80%] min-h-15 justify-center font-bold rounded-2xl items-center  my-12 gap-3 sm:flex-row flex-col">
//           <div className="text-center justify-center text-accent text-4xl font-bold">
//             Participants
//           </div>

//         </div>
//       </div>

//       <div className="flex flex-col justify-center items-center gap-5">
//         <div className="MiddleContainer gap-8 sm:w-[50%] w-[80%] h-[700px] overflow-y-auto bg-white rounded-2xl flex flex-col items-center py-10 px-4 shadow-xl">
//           {item.map((item) => (
//             <div
//               key={item.id}
//               className="w-full max-w-[700px] bg-secondary rounded-2xl shadow-md p-4 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-16 items-center"
//             >
//                 <div>
//                     Username:
//                 </div>
//               <input
//                 value={item.title}
//                 onChange={(e) => handleChangeItem(item.id, e.target.value)}
//                 readOnly={true}
//                 placeholder="Username"
//                 className="text-lg text-center w-full sm:text-xl md:text-2xl font-bold bg-secondary text-slate-800 outline-none p-2 rounded-xl"
//               />

//             </div>
//           ))}

//           <div
//             onClick={handleItem}
//             className="w-full max-w-[700px] h-50 min-h-40 bg-[#FEE6E1] flex justify-center items-center border-2 border-black rounded-2xl border-dashed cursor-pointer hover:bg-white/50 transition"
//           >
//             <p className="text-center text-xl font-semibold">+ Add more</p>
//           </div>
//         </div>

//         <button
//           onClick={handleSubmitCategory}
//           className="sm:w-[50%] w-[80%] bg-accent hover:bg-[#F32322] text-white font-bold rounded-2xl h-14 flex items-center justify-center transition"
//         >
//           Let's Swipe
//         </button>
//       </div>
//       </div>
//     </>
//   );
// };

// export default Participants;

import React, { useState } from "react";
import Navbar from "../components/NavBar";

interface User {
  id: number;
  title: string;
  isJoin: boolean;
}

const Participants: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [nextId, setNextId] = useState(1);
  const [role, setRoles] = useState<"host" | "player">("host");
  const [categoryName, setCategoryName] = useState("");

  const handleAddUser = () => {
    const newUser: User = {
      id: nextId,
      title: "",
      isJoin: false,
    };
    setUsers((prev) => [...prev, newUser]);
    setNextId((prev) => prev + 1);
  };

  const handleChangeUser = (id: number, value: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, title: value } : user))
    );
  };

  const handleDeleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleSubmitCategory = () => {
    const data = {
      categoryName: categoryName || "Untitled",
      users: users.filter((u) => u.title.trim() !== ""),
    };

    console.log("📦 Category Data:", data);
    //Axios.post("/api/category", data)
  };

  return (
    <>
      <Navbar />
      <div className="w-screen h-full bg-secondary pb-8">
        <div className="flex justify-center items-center">
          <div className="flex sm:w-[50%] w-[80%] min-h-15 justify-center font-bold rounded-2xl items-center my-12 gap-3 sm:flex-row flex-col">
            <div className="text-center justify-center text-accent text-4xl font-bold">
              Participants
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <div className="MiddleContainer gap-8 sm:w-[50%] w-[80%] h-[700px] overflow-y-auto bg-white rounded-2xl flex flex-col items-center py-10 px-4 shadow-xl">
            {users.map((user) => (
              <div
                key={user.id}
                className="w-full max-w-[700px] bg-secondary rounded-2xl shadow-md p-4 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-16 items-center"
              >
                <div className="text-center justify-center items-center w-full grid grid-cols-3">
                  <div className="font-semibold text-xl text-gray-700">
                    Username:
                  </div>
                  <input
                    value={user.title}
                    onChange={(e) => handleChangeUser(user.id, e.target.value)}
                    readOnly={true}
                    placeholder="Username"
                    className="text-lg  w-full sm:text-xl md:text-xl font-bold bg-secondary text-slate-800 outline-none p-2 rounded-xl"
                  />

                  <div className=" text-sm font-medium justify-center items-center flex text-white  px-3 py-1 rounded-full w-fit mx-auto">
                    {user.isJoin ? (
                      <div className="bg-[#31AC0C6] mt-2 text-sm font-medium text-white  px-3 py-1 rounded-full w-fit mx-auto">
                        Join
                      </div>
                    ) : (
                      <div className="bg-accent mt-2 text-sm font-medium text-white  px-3 py-1 rounded-full w-fit mx-auto">
                        {" "}
                        Waiting
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div
              onClick={handleAddUser}
              className="w-full max-w-[700px] h-50 min-h-40 bg-[#FEE6E1] flex justify-center items-center border-2 border-black rounded-2xl border-dashed cursor-pointer hover:bg-white/50 transition"
            >
              <p className="text-center text-xl font-semibold">+ Add more</p>
            </div>
          </div>

          {role === "host" && (
            <button
              onClick={handleSubmitCategory}
              className="sm:w-[50%] w-[80%] bg-accent hover:bg-[#F32322] text-white font-bold rounded-2xl h-14 flex items-center justify-center transition"
            >
              Let's Swipe
            </button>
          )}

          {role === "player" && (
            <div>
              waiting for host to start...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Participants;
