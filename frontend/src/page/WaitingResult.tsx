import { useEffect } from "react";
import * as roundUserAPI from "../api/roundUserApi";
import { useNavigate, useParams } from "react-router-dom";

function WaitngResult() {
  const { roundId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const poll = async () => {
      if (!roundId) return;
      const res = await roundUserAPI.isAllUserCompleted(parseInt(roundId));
      if (res) {
        navigate(`/match/${roundId}`);
      }
    };

    poll();
    const interval = setInterval(poll, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-screen h-screen bg-secondary justify-center items-center flex font-bold text-3xl sm:text-7xl text-accent">
      Waiting for result ...
    </div>
  );
}

export default WaitngResult;
