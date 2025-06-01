import React, { useState } from "react";
import Navbar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { getUserIdByUsername, getuserid } from "../api/userApi";
import { createRound } from "../api/roundApi";
import { waitingUserToJoin } from "../api/roundUserApi";

interface Item {
  id: number;
  title: string;
}

const EnterMember: React.FC = () => {
  const [item, setItems] = useState<Item[]>([]);
  const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();
  const { groupId } = useParams();

  const handleItem = () => {
    setItems((prev) => [...prev, { id: nextId, title: "" }]);
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

  const handleSubmitCategory = async () => {
    if (!groupId) {
      console.error("Group ID missing");
      return;
    }

    const profile = await getuserid();
    const creatorId = profile?.user?.id;

    if (!creatorId) {
      console.error("Cannot get creator ID");
      return;
    }

    const usernames = item.map((i) => i.title.trim()).filter((v) => v !== "");
    const userIds: number[] = [];

    for (const username of usernames) {
      const res = await getUserIdByUsername(username);
      if (res.success && res.data?.id) {
        userIds.push(res.data.id);
      } else {
        console.warn(`Failed to find user: ${username}`);
      }
    }

    if (!userIds.includes(creatorId)) {
      userIds.unshift(creatorId);
    }

    if (userIds.length === 0) {
      console.error("No valid users found");
      return;
    }

    const roundRes = await createRound(parseInt(groupId));
    if (!roundRes.success) {
      console.error("Failed to create round");
      return;
    }

    const roundId = roundRes.data.RoundId;
    const joinRes = await waitingUserToJoin(roundId, userIds);
    if (!joinRes.success) {
      console.error("Failed to add users to round");
      return;
    }

    navigate(`/participants/${roundId}`);
  };

  return (
    <>
      <Navbar />
      <div className="w-screen h-full bg-secondary pb-8">
        <div className="flex justify-center items-center">
          <div className="flex sm:w-[50%] w-[80%] my-8 gap-3 sm:flex-row flex-col">
            <div className="text-primary text-3xl font-bold">Member</div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <div className="MiddleContainer gap-8 sm:w-[50%] w-[80%] max-h-[700px] overflow-y-auto bg-white rounded-2xl flex flex-col items-center py-10 px-4 shadow-xl">
            {item.map((item) => (
              <div
                key={item.id}
                className="w-full max-w-[700px] bg-secondary rounded-2xl shadow-md p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center"
              >
                <div className="flex flex-col sm:flex-row w-full">
                  <div className="text-xl font-bold p-2">Username:</div>
                  <input
                    value={item.title}
                    onChange={(e) => handleChangeItem(item.id, e.target.value)}
                    placeholder="Enter username"
                    className="text-lg text-center w-full font-bold text-slate-800 outline-none p-2 rounded-xl"
                  />
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-accent hover:bg-[#F32322] text-white font-semibold px-6 py-2 rounded-xl transition w-full md:w-[20%]"
                >
                  Delete
                </button>
              </div>
            ))}

            <div
              onClick={handleItem}
              className="w-full max-w-[700px] min-h-40 bg-[#FEE6E1] flex justify-center items-center border-2 border-black rounded-2xl border-dashed cursor-pointer hover:bg-white/50 transition"
            >
              <p className="text-xl font-semibold">+ Add more</p>
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
