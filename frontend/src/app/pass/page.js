"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER || "";

const MagicPin = () => {
  const router = useRouter();
  axios.defaults.withCredentials = true;

  const login = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: "rj1210@example.com",
        password: "pass1234",
      });
      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      router.push("/chat");
    } catch (error) {
      console.log("error", error);
    }
  };

  const [pin, setPin] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = () => {
    if (pin === "9686") {
      setAuthorized(true);
      setError("");
    } else {
      setError("Invalid PIN");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {!authorized ? (
        <div className="flex flex-col items-center gap-2">
          <p>Enter Magic PIN</p>
          <input
            className="border rounded p-2 text-center w-32"
            value={pin}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 4);
              setPin(v);
              if (error) setError("");
            }}
            inputMode="numeric"
            placeholder="••••••"
          />
          <div
            className="m-2 p-2 w-32 text-center bg-neutral-100 text-black cursor-pointer hover:bg-neutral-300 rounded-md"
            onClick={handleVerify}
          >
            Verify PIN
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen flex-col">
          <div
            className="m-2 p-2 bg-neutral-100 text-black cursor-pointer hover:bg-neutral-300 rounded-md"
            onClick={login}
          >
            Magic Login
          </div>
          <p>If you get any issue with login, or want quick login try this.</p>
        </div>
      )}
    </div>
  );
};

export default MagicPin;
