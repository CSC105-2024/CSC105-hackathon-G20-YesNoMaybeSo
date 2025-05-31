import React, { useState, useEffect } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineHowToReg } from "react-icons/md";
import { BsPersonXFill } from "react-icons/bs";
import { registerUser } from "../api/userApi";

const registerSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [registerStatus, setRegisterStatus] = useState("");
  const [shakeTrigger, setShakeTrigger] = useState(false);

  const triggerShake = () => {
    setShakeTrigger(false);
    requestAnimationFrame(() => setShakeTrigger(true));
  };

  useEffect(() => {
    if (registerStatus === "success") {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (registerStatus === "error" || registerStatus === "empty") {
      const timer = setTimeout(() => setRegisterStatus(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [registerStatus, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      setRegisterStatus("error");
      triggerShake();
      return;
    }

    try {
      const res = await registerUser(formData.username, formData.password);
      if (res.success) {
        setRegisterStatus("success");
        setErrors({});
      } else {
        setRegisterStatus("error");
        setErrors({ username: res.msg });
        triggerShake();
      }
    } catch (e: any) {
      console.error("Register failed:", e.response?.data || e.message);
      const errorMsg = e.response?.data?.msg || "Something went wrong";
      setRegisterStatus("error");
      setErrors({ username: errorMsg });
      triggerShake();
    }
  };

  const errorMessage =
    errors.confirmPassword ??
    errors.username ??
    errors.password ??
    "Please correct the errors in the form";

  return (
    <div className="w-full h-screen bg-secondary overflow-hidden relative flex justify-center items-center ">
      <div className="z-10 flex flex-col items-center w-full max-w-md px-4">
        {registerStatus && (
          <div
            className={`w-full mb-4 transition-all ${
              registerStatus === "success"
                ? "animate-fadeInScale"
                : shakeTrigger
                ? "animate-shake"
                : ""
            }`}
          >
            <div className="w-full flex items-center justify-center gap-2 text-center py-2 px-4 rounded-xl text-black bg-white font-bold shadow-md">
              <div className="w-6 h-6 md:w-8 md:h-8 text-2xl items-center justify-center flex">
                {registerStatus === "success" ? (
                  <MdOutlineHowToReg className="text-green-500" />
                ) : (
                  <BsPersonXFill className="text-red-500" />
                )}
              </div>

              <span>
                {registerStatus === "success"
                  ? "Registration Successful"
                  : registerStatus === "empty"
                  ? "Please fill your username and password"
                  : errorMessage}
              </span>
            </div>
          </div>
        )}

        <div className="w-full p-6 bg-white rounded-3xl shadow-lg">
          <div className="text-start mb-6">
            <div className="text-black text-4xl font-bold ">Register</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xl text-black">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                className="w-full h-14 p-4 bg-zinc-100 rounded-2xl outline-none"
              />
              {errors.username && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.username}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-xl text-black">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className="w-full h-14 p-4 bg-zinc-100 rounded-2xl outline-none"
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-xl text-black">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className="w-full h-14 p-4 bg-zinc-100 rounded-2xl outline-none"
              />
              {errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-accent hover:bg-gray-500 text-white text-2xl rounded-2xl"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-black text-lg">
              Already have an account?{" "}
            </span>
            <Link to="/login" className="text-accent text-lg underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
