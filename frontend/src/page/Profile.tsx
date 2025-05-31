import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { FaRegUser } from "react-icons/fa";
import { getProfile, updateUsername } from "../api/userApi";

function Profile() {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      if (res.success) {
        setUser(res.data);
        setUsernameInput(res.data.username);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    const res = await updateUsername(usernameInput);
    if (res.success) {
      setUser({ ...user!, username: usernameInput });
      setIsEdit(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-secondary">
      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="flex justify-center items-center">
        <div className="relative flex flex-col min-w-[70svw] justify-center min-h-[700] mt-26 items-center px-4 py-4 w-full max-w-screen-xl mx-auto">
          <h3 className="font-bold flex w-full text-accent mb-6 justify-center text-5xl">
            Profile
          </h3>

          <div className="w-full max-w-[700px] min-h-[40vh] bg-white rounded-2xl p-6 shadow flex justify-center items-center mx-auto">
            <div className="flex flex-row justify-center items-center gap-9">
              <div className="sm:text-9xl text-6xl">
                <FaRegUser />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-4 items-center">
                  <div className="text-xl font-semibold text-primary">User Name :</div>
                  {isEdit ? (
                    <input
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      className="border px-2 py-1 rounded-md text-primary text-lg"
                    />
                  ) : (
                    <div className="text-xl font-semibold text-primary">
                      {user?.username}
                    </div>
                  )}
                </div>

                <div className="flex flex-row gap-4">
                  <div className="text-xl font-semibold text-primary">User Id :</div>
                  <div className="text-xl font-semibold text-primary">{user?.id ?? "-"}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full">
            {isEdit ? (
              <button
                onClick={handleSave}
                className="bg-[#4CAF50] mt-4 w-full max-w-[700px] h-[60px] text-white text-2xl font-bold font-['Poppins'] rounded-2xl shadow-md"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-[#E74645] mt-4 w-full max-w-[700px] h-[60px] text-white text-2xl font-bold font-['Poppins'] rounded-2xl shadow-md"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;