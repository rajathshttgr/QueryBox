"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const MagicPin = () => {
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const register = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/auth/register`, {
        name: "Rajath Shettigar Test",
        email: "rj1210@example.com",
        password: "pass1234",
      });
      console.log(response);
      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      router.push("/chat");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div
        className="m-2 p-2 bg-neutral-100 text-black cursor-pointer hover:bg-neutral-300 rounded-md"
        onClick={register}
      >
        Magic Login
      </div>
      <p>If you get any issue with login, or want quick login try this.</p>
    </div>
  );
};

export default MagicPin;
