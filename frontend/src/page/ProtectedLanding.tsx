import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../utils/axiosInstance";

export default function ProtectedLanding() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await Axios.get("/user/me", { withCredentials: true });
        if (res.data.success) {
          navigate("/home");
        } else {
          navigate("/login");
        }
      } catch (e) {
        navigate("/login");
      }
    };

    checkLogin();
  }, [navigate]);

  return null;
}
