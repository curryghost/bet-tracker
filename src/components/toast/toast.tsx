import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { ImCancelCircle } from "react-icons/im";

export default function Toast() {
  const [isOpen, setIsopen] = useState(false);
  const [message, setMessage] = useState("");
  const [timeoutId, setTimeoutId] = useState(0);

  const handleOpenToast = (e: Event) => {
    setMessage((e as CustomEvent).detail);
    setIsopen(true);
  };

  const handleCloseToast = () => {
    setIsopen(false);
    setMessage("");
    clearTimeout(timeoutId);
  };

  useEffect(() => {
    window.addEventListener("open-toast", handleOpenToast);

    return () => {
      window.removeEventListener("open-toast", handleOpenToast);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeoutId(setTimeout(handleCloseToast, 3000));
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen]);

  if (isOpen) {
    return (
      <div
        id="toast"
        className="absolute right-10 top-7 inline-block h-20 w-72 rounded-lg bg-indigo-900 p-3 shadow-md shadow-gray-800"
      >
        <p className="text-md font-bold ">{message}</p>
        <button onClick={handleCloseToast} className="absolute right-2 top-2">
          <IconContext.Provider
            value={{
              size: "18px",
            }}
          >
            <ImCancelCircle />
          </IconContext.Provider>
        </button>
      </div>
    );
  }
}
