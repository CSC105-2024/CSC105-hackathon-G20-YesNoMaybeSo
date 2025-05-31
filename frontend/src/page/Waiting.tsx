import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkAllCompleted } from "../api/roundUserApi";

const WaitingResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roundId } = location.state || {};

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await checkAllCompleted(roundId);
      if (res.success && res.data === true) {
        clearInterval(interval);
        navigate("/match", { state: { roundId } });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [roundId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-xl text-primary">
      Waiting for others to finish swiping...
    </div>
  );
};

export default WaitingResult;