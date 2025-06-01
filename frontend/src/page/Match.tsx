import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {
  getMatchSummary,
  type MatchItem,
} from "../api/resultApi";

const Match: React.FC = () => {
  const [summary, setSummary] = useState<MatchItem[] | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await getMatchSummary(1);
      if (res.success) {
        setSummary(res.data);
      }
    };
    fetchSummary();
  }, []);

  console.log(summary);

  return (
    <>
      <div className="BG flex absolute inset-0 items-center justify-center -z-10">
        <div className="w-[1095px] h-[1319px] bg-secondary blur-[254.5px]" />
      </div>
      <NavBar />
      <div className="flex flex-col justify-center items-center mt-19 gap-16 px-2 sm:px-4">
        <div className="flex justify-center items-center m-4 my-12">
          <div className="text-center justify-center text-accent text-4xl font-bold">
            Match result
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-end gap-10 lg:gap-40 max-w-9xl">
          <div className="flex justify-center items-end gap-2 sm:gap-4 md:gap-6 scale-[0.9] sm:scale-100">
            {[1, 0, 2].map((rankIndex) => {
              const item = summary?.[rankIndex];
              if (!item) return null;

              const podiumStyle =
                rankIndex === 0
                  ? "bg-accent h-[180px] sm:h-[270px] md:h-[350px] w-[130px] text-white"
                  : rankIndex === 1
                  ? "bg-primary h-[140px] sm:h-[200px] md:h-[250px] text-white"
                  : "bg-[#FEE6E9] h-[120px] sm:h-[160px] md:h-[200px]";

              return (
                <div key={item.id} className="flex flex-col items-center">
                  <div className="text-base sm:text-lg md:text-xl text-primary font-bold">
                    {item.name}
                  </div>
                  <div
                    className={`w-20 sm:w-28 md:w-40 rounded-t-md mt-2 flex flex-col justify-end items-center font-bold shadow-lg ${podiumStyle}`}
                  >
                    <p className="mb-1 sm:mb-2">Match</p>
                    <p className="mb-2 sm:mb-4 text-xs sm:text-sm">
                      {item.count}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full flex justify-center items-center">
            <div className="max-h-[450px] overflow-y-auto rounded-xl shadow-xl">
              <table className="w-full max-w-[320px] sm:w-[300px] text-left bg-white">
                <thead className="bg-secondary text-primary sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-center">No.</th>
                    <th className="px-4 py-2 text-center">Name</th>
                    <th className="px-4 py-2 text-center">Match</th>
                  </tr>
                </thead>
                <tbody>
                  {summary?.slice(3).map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 1 ? "bg-red-50" : ""}
                    >
                      <td className="px-4 py-2 text-center">{index + 4}</td>
                      <td className="px-4 py-2 text-center">{item.name}</td>
                      <td className="px-4 py-2 text-center">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Match;
