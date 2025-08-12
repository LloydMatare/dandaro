import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

function useRegister() {
  const [loading, setLoading] = useState(false);
  //@ts-ignore
  const { setAuthUser } = useAuthContext();

  const register = async ({
    fullName,
    email,
    password,
    confirmPassword,
    gender,
  }: any) => {
    const success = handleInputsError({
      fullName,
      email,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      console.log(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, register };
}

export default useRegister;

function handleInputsError({
  fullName,
  email,
  password,
  confirmPassword,
  gender,
}: any) {
  if (!fullName || !email || !password || !confirmPassword || !gender) {
    toast.error("Please fill in required feilds");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password does not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password should be at least 6 characters");
    return false;
  }

  return true;
}
