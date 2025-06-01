import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getuserid } from "../api/userApi";
import { getGroupsByUser } from "../api/groupApi";
import { getLatestRoundInGroup } from "../api/roundApi";
import { isUserInRound } from "../api/roundUserApi";

const WaitingRoom = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const pollForRoom = async () => {
      const profile = await getuserid();
      const userId = profile.user?.id;
      if (!userId) return;

      const groups = await getGroupsByUser(userId);
      for (const group of groups) {
        const latest = await getLatestRoundInGroup(group.GroupId);
        if (latest?.RoundId) {
          const exists = await isUserInRound(latest.RoundId, userId);
          if (exists.success && exists.data === true) {
            navigate(`/participants/${latest.RoundId}`);
            return;
          }
        }
      }
    };

    pollForRoom();
    const interval = setInterval(pollForRoom, 2000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-xl text-primary">
      Waiting for invitation to join a room...
    </div>
  );
};

export default WaitingRoom;