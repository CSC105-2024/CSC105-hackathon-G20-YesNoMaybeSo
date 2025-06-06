import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as roundUserAPI from "../api/roundUserApi";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const [availableRounds, setAvailableRounds] = useState<
    roundUserAPI.AvailableRound[]
  >([]);

  const fetchAvailableRound = async () => {
    const rounds = await roundUserAPI.getAvailableRounds();
    setAvailableRounds(rounds);
  };

  const joinRound = async (roundUserId: number) => {
    const res = await roundUserAPI.joinUserToRound(roundUserId);
    if (res != -1) {
      navigate(`/participants/${res}?player`);
    }
  };

  useEffect(() => {
    fetchAvailableRound();
    const interval = setInterval(fetchAvailableRound, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-xl text-primary">
      <p>Waiting for invitation to join a room...</p>
      <div>
        {availableRounds.map((r, i) => {
          return (
            <div
              key={i}
              className="p-10 bg-secondary rounded-2xl text-center"
              onClick={() => joinRound(r.id)}
            >
              <p className="font-bold text-2xl">{r.Round.Group.GroupName}</p>
              <p className="font-light">By: {r.Round.Group.User.Username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WaitingRoom;
