import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getUsersInRound } from "../api/roundUserApi";
import { getprofile } from "../api/userApi";
import * as roundAPI from "../api/roundApi";

interface User {
  id: number;
  userId: number;
  title: string;
  isJoin: boolean;
}

const Participants: React.FC = () => {
  const { roundId } = useParams();
  const navigate = useNavigate();

  const [queryParam] = useSearchParams();

  const isPlayer = queryParam.has("player");

  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState<"host" | "player">("player");
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getprofile();
      console.log(res);
      const userId = res?.data?.data?.id;
      if (res.success && userId) {
        console.log("Set currentUserId to:", userId);
        setCurrentUserId(userId);
      } else {
        console.warn("Cannot find user id in response");
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!roundId || currentUserId === null) return;

    const poll = async () => {
      const res = await getUsersInRound(parseInt(roundId));
      console.log("Round users from backend", res.data);

      if (res.success && Array.isArray(res.data)) {
        const newUsers: User[] = res.data.map((u: any) => ({
          id: u.id,
          userId: u.UserId,
          title: u.User?.Username ?? u.Username ?? "Unknown",
          isJoin: u.isJoined,
        }));
        setUsers(newUsers);
      }
    };

    poll();
    const interval = setInterval(poll, 2000);
    return () => clearInterval(interval);
  }, [roundId, currentUserId]);

  const fetchRoundStatus = async () => {
    if (!roundId) return;
    const status = await roundAPI.isRoundStarted(parseInt(roundId));
    if (status) {
      navigate(`/swipe/${roundId}`);
    }
  };

  useEffect(() => {
    fetchRoundStatus();
    const interval = setInterval(fetchRoundStatus, 2000);
    return () => clearInterval(interval);
  }, [roundId, currentUserId]);

  useEffect(() => {
    if (!currentUserId || users.length === 0) return;

    const isHost = users.some(
      (u) => u.userId === currentUserId && u.isJoin === true
    );

    setRole(isHost ? "host" : "player");
    console.log("Role updated to:", isHost ? "host" : "player");
  }, [users, currentUserId]);

  const handleSwipe = async () => {
    if (!roundId) return;
    const res = await roundAPI.startRound(parseInt(roundId));
    if (res) navigate(`/swipe/${roundId}`);
  };

  return (
    <>
      <Navbar />
      <div className="w-screen min-h-screen bg-secondary pb-8 justify-center items-center ">
        <div className="flex justify-center items-center">
          <div className="flex sm:w-[50%] w-[80%] my-8 gap-3 sm:flex-row flex-col justify-center">
            <div className="text-primary text-3xl font-bold">Participants</div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-5 mt-4">
          <div className="MiddleContainer gap-8 sm:w-[50%] w-[80%] h-[500px] overflow-y-auto bg-white rounded-2xl flex flex-col items-center py-10 px-4 shadow-xl">
            {users.length === 0 ? (
              <div className="text-xl text-gray-500">No participants yet</div>
            ) : (
              users.map((user) => (
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
                      readOnly
                      className="text-lg w-full sm:text-xl font-bold bg-secondary text-slate-800 outline-none p-2 rounded-xl"
                    />
                    <div className="text-sm font-medium justify-center items-center flex text-white px-3 py-1 rounded-full w-fit mx-auto">
                      {user.isJoin ? (
                        <div className="bg-[#31AC0C] mt-2 text-sm font-medium text-white px-3 py-1 rounded-full w-fit mx-auto">
                          Join
                        </div>
                      ) : (
                        <div className="bg-accent mt-2 text-sm font-medium text-white px-3 py-1 rounded-full w-fit mx-auto">
                          Waiting
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {!isPlayer && (
            <button
              onClick={() => handleSwipe()}
              className="sm:w-[50%] w-[80%] bg-accent hover:bg-[#F32322] text-white font-bold rounded-2xl h-14 flex items-center justify-center transition"
            >
              Let&apos;s Swipe
            </button>
          )}

          {isPlayer && (
            <div className="text-xl text-gray-600 font-medium">
              waiting for host to start...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Participants;