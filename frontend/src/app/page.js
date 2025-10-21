"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Button from "@/components/Button";
import { FaArrowCircleRight } from "react-icons/fa";
import useSendRequest from "@/hooks/useSendRequest";
import LoadingV2 from "@/components/LoadingV2";

const Home = () => {
  const { sendRequest, loading, error } = useSendRequest();
  const [serverState, setServerState] = useState(null);

  useEffect(() => {
    const fetchServerState = async () => {
      try {
        const data = await sendRequest({
          route: "",
          method: "GET",
          isAuthRoute: true,
        });
        setServerState(data.message);
      } catch (err) {
        console.error("Error fetching server state:", err);
      }
    };

    fetchServerState();
  }, [sendRequest]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 transition-colors duration-100">
      <div className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center gap-4">
        <ThemeToggle />
        <Link href="/login">
          <Button text="Log In" variant="ghost" />
        </Link>
      </div>

      <h1 className="text-3xl sm:text-5xl text-center font-extrabold mb-4 p-4 text-neutral-50 bg-red-600">
        QUERYBOX - A RAG BASED CHATBOT
      </h1>
      <p className="text-xl text-center text-neutral-800 dark:text-neutral-200 transition-colors duration-100">
        Transform your documents into intelligent conversations. Upload PDFs,
        Texts, or URLs and chat with your content instantly.
      </p>

      {loading ? (
        <LoadingV2 message="Our server taking a quick nap 😴 — waking it up now. Just a moment!" />
      ) : (
        <div className="flex flex-col justify-center items-center mt-10 transition-all duration-700 ease-in ">
          <Link href="/chat">
            <Button
              text="Get Started"
              variant="special"
              icon={<FaArrowCircleRight className="text-lg" />}
            />
          </Link>

          {serverState && (
            <p className="text-sm text-neutral-500 mt-3 italic">
              Server is ready — {serverState}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
