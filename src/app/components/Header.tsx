export default function Header({ setOpenSetting }) {
  return (
    <header className="w-full flex justify-between items-center px-10">
      <div className="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-slate-800"
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

        <span className="text-slate-800 font-bold">Pomodoro Timer</span>
      </div>

      <nav className="flex gap-8">
        <a href="#" className="text-slate-800">
          Home
        </a>
        <a href="#" className="text-slate-800">
          About
        </a>
        <button
          onClick={() => setOpenSetting((value) => !value)}
          className="text-slate-800"
        >
          Settings
        </button>
      </nav>
    </header>
  );
}
