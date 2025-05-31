import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getprofile } from "../api/userApi";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getprofile();
        if (res.data.success) {
          setAllowed(true);
        } else {
          navigate("/login");
        }
      } catch (e) {
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  return allowed ? children : null;
};
export default ProtectedRoute;
