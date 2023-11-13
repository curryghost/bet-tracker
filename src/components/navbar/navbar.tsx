import { useEffect, useState } from "react";
import { PiSignOutBold } from "react-icons/pi";
import { auth, signOutUser } from "../../firebase/client/auth";
import Button from "../ui/button";

export default function Navbar() {
  const [showSignOut, setShowSignOut] = useState(false);
  const handleSignOut = () => {
    signOutUser().catch((e) => {
      console.log(e.message);
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        user.getIdToken().then((token) => {
          document.cookie = `idToken=${token};`;
        });
        setShowSignOut(true);
      } else {
        localStorage.removeItem("user");
        document.cookie = `idToken=;`;
        setShowSignOut(false);
        if (window.location.pathname !== "/sign-in")
          window.location.replace("/sign-in");
      }
    });
  }, []);

  return (
    <header>
      <nav className="flex items-center justify-between border-b border-gray-800 p-5">
        <a id="home" href="/" className="text-sm font-bold">
          Bet Tracker
        </a>
        <div className="flex gap-5">
          <a href="/add-bet">
            <Button className="w-24 rounded-full bg-indigo-700 py-2 text-sm font-bold shadow-sm shadow-gray-600 transition hover:bg-indigo-500 focus:bg-indigo-900 focus:text-gray-400">
              Add Bet
            </Button>
          </a>
          {showSignOut && (
            <button
              onClick={handleSignOut}
              className="rounded-md border border-red-500 p-2 text-xs text-red-500 hover:text-red-300"
            >
              Sign Out <PiSignOutBold />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
