import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkAllCompleted } from "../api/roundUserApi";

const WaitingResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roundId } = location.state || {};

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await checkAllCompleted(roundId);
      console.log("Polling:", res);
      if (res.success && res.data === true) {
        clearInterval(interval);
        navigate("/match", { state: { roundId } });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [roundId]);

  return (
    <div className='w-screen h-screen bg-secondary justify-center items-center flex font-bold text-3xl sm:text-7xl text-accent'>
      Waiting for result ...
    </div>
  );
};

export default WaitingResult;