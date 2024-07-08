"use client";
import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";

export default function Home() {
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(10);
  const [seconds, setSecond] = useState(0);
  const [stage, setStage] = useState(0);
  const [consumedSecond, setConsumedSecond] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [tasks, setTasks] = useState([]); // New state for tasks

  const alarmRef = useRef();
  const pomodoroRef = useRef();
  const shortBreakRef = useRef();
  const longBreakRef = useRef();

  const updateTimeDefaultValue = () => {
    setPomodoro(pomodoroRef.current.value);
    setShortBreak(shortBreakRef.current.value);
    setLongBreak(longBreakRef.current.value);
    setOpenSetting(false);
    setSecond(0);
    setConsumedSecond(0);
  };

  const switchStage = (index) => {
    const isYes =
      consumedSecond && stage !== index
        ? confirm("Are you sure you want to switch?")
        : false;
    if (isYes) {
      reset();
      setStage(index);
    } else if (!consumedSecond) {
      setStage(index);
    }
  };

  const getTickingTime = () => {
    const timeStage = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    };
    return timeStage[stage];
  };
  const updateMinute = () => {
    const updateStage = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    };
    return updateStage[stage];
  };

  const reset = () => {
    setConsumedSecond(0);
    setTicking(false);
    setSecond(0);
    updateTimeDefaultValue();
  };

  const timeUp = () => {
    reset();
    setIsTimeUp(true);
    alarmRef.current.play();
  };

  const clockTicking = () => {
    const minutes = getTickingTime();
    const setMinutes = updateMinute();

    if (minutes === 0 && seconds === 0) {
      timeUp();
    } else if (seconds === 0) {
      setMinutes((minute) => minute - 1);
      setSecond(59);
    } else {
      setSecond((second) => second - 1);
    }
  };

  const startTimer = () => {
    setIsTimeUp(false);
    setTicking((ticking) => !ticking);
  };

  useEffect(() => {
    window.onbeforeunload = () => {
      return consumedSecond ? "Show waring" : null;
    };

    const timer = setInterval(() => {
      if (ticking) {
        setConsumedSecond((value) => value + 1);
        clockTicking();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, pomodoro, shortBreak, longBreak, ticking]);

  const options = ["Pomodoro", "Short Break", "Long Break"];

  const addTask = () => {
    setTasks((prevTasks) => [...prevTasks, "task"]);
    console.log(tasks);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10 bg-slate-100">
      <Header setOpenSetting={setOpenSetting} />

      <section className="mx-52">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center">
            <p className="text-slate-800 font-semibold">
              A simple Pomodoro Timer to help you stay focused.
            </p>
          </div>

          <div className="flex items-center justify-center w-full">
            <div className="w-full bg-slate-800 shadow-2xl h-80 rounded-lg text-center flex flex-col gap-4 justify-center items-center p-16">
              <div className="flex gap-5 items-center">
                {options.map((option, index) => {
                  return (
                    <h1
                      key={index}
                      className={` ${
                        index === stage ? "bg-gray-500 px-2 bg-opacity-30" : ""
                      } p-1 cursor-pointer transition-all rounded`}
                      onClick={() => switchStage(index)}
                    >
                      {option}
                    </h1>
                  );
                })}
              </div>
              <div
                className="text-8xl timer-circle w-52 h-52 flex justify-center items-center"
                id="timer"
              >
                <h1 className="text-8xl font-bold select-none m-0">
                  {getTickingTime()}:{seconds.toString().padStart(2, "0")}
                </h1>
              </div>
              <div className="flex gap-4 control-buttons">
                <button
                  className="bg-blue-500 text-white w-28 h-12 rounded-lg"
                  onClick={startTimer}
                >
                  {ticking ? "Stop" : "Start"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-52">
        <button onClick={addTask} className="w-full h-16 bg-slate-300 hover:bg-slate-400 justify-center items-center flex px-20 rounded-lg bg-opacity-30">
          <svg className="text-slate-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14" /><path d="M12 5v14" />
          </svg>
        </button>
      </section>

      <section className="mx-52 h-16 overflow-y-auto p-4 no-scrollbar">
        {tasks.map((task, index) => { 
          return (
            <p key={index} className="text-slate-800">{task}</p>
          )
        })}
      </section>

      <footer className="flex flex-col items-center justify-center">
        <p className="text-slate-800">Made with ❤️ by Bart Tynior</p>
      </footer>

      <Modal
        openSetting={openSetting}
        setOpenSetting={setOpenSetting}
        pomodoroRef={pomodoroRef}
        shortBreakRef={shortBreakRef}
        longBreakRef={longBreakRef}
        updateTimeDefaultValue={updateTimeDefaultValue}
      />
    </main>
  );
}
