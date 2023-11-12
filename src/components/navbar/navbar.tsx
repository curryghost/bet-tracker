import Button from "../ui/button";

export default function Navbar() {
  return (
    <header>
      <nav className="flex items-center justify-between border-b border-gray-800 p-5">
        <a href="/" className="text-sm font-bold">
          Bet Tracker
        </a>
        <a href="/add-bet">
          <Button className="w-24 rounded-full bg-indigo-700 py-2 text-sm font-bold shadow-sm shadow-gray-600 transition hover:bg-indigo-500 focus:bg-indigo-900 focus:text-gray-400">
            Add Bet
          </Button>
        </a>
      </nav>
    </header>
  );
}
