"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const Ref = useRef(null);

  const [timer, setTimer] = useState("00:00:10");
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const getTimeRemaining = (endtime) => {
    const total = Date.parse(endtime) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return { total, hours, minutes, seconds };
  };

  const startTimer = (endtime) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(endtime);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
      setTimeLeft(total / 1000);
    } else {
      clearInterval(Ref.current);
    }
  };

  const clearTimer = (endtime) => {
    setTimer("00:00:10");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(endtime);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + timeLeft);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickStart = () => {
    clearTimer(getDeadTime());
    setIsPaused(false);
  };

  const onClickPause = () => {
    if (Ref.current) clearInterval(Ref.current);
    setIsPaused(true);
  };

  const onClickResume = () => {
    if (isPaused) {
      clearTimer(getDeadTime());
      setIsPaused(false);
    }
  };

  const onClickReset = () => {
    setTimeLeft(10);
    clearTimer(getDeadTime());
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10 bg-black">
      <header className="flex items-center justify-between w-full px-24">
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>

          <span className="text-white">Pomodoro Timer</span>
        </div>

        <nav className="flex gap-8">
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#" className="text-white">
            About
          </a>
          <a href="#" className="text-white">
            Settings
          </a>
        </nav>
      </header>

      <section className="px-24 mx-52">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center">
            <p className="text-white">
              A simple Pomodoro Timer to help you stay focused.
            </p>
          </div>

          <div className="flex items-center justify-center w-full">
            <div className="w-full bg-slate-600 h-80 rounded-lg text-center flex flex-col gap-4 justify-center items-center p-16">
              <p className="text-8xl">{timer}</p>
              <div className="flex gap-4">
                <button
                  className="bg-blue-500 text-white px-10 py-4 rounded-lg"
                  onClick={onClickStart}
                >
                  Start
                </button>
                <button
                  className="bg-blue-500 text-white px-10 py-4 rounded-lg"
                  onClick={onClickPause}
                >
                  Pause
                </button>
                <button
                  className="bg-blue-500 text-white px-10 py-4 rounded-lg"
                  onClick={onClickResume}
                >
                  Resume
                </button>
                <button
                  className="bg-blue-500 text-white px-10 py-4 rounded-lg"
                  onClick={onClickReset}
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-center justify-center">
        <p className="text-white">Made with ❤️ by</p>
        <p className="text-white">© 2021 Bart Tynior</p>
      </footer>
    </main>
  );
}
