"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Button from "@/components/Button";
import { FaArrowCircleRight } from "react-icons/fa";

const Home = () => {
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
      <div className="mt-8">
        <Link href="/chat">
          <Button
            text="Get Started"
            variant="special"
            icon={<FaArrowCircleRight className="text-lg" />}
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
