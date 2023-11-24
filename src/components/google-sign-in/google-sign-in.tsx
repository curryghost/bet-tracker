import { navigate } from "astro:transitions/client";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { checkRedirect, signInWithGoogle } from "../../firebase/client/auth";

export default function GoogleSignIn() {
  const handleSignIn = () => {
    signInWithGoogle();
  };

  useEffect(() => {
    checkRedirect()
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center gap-3 rounded-full border-2 border-indigo-800 bg-gray-900 px-4 py-2 text-sm font-bold shadow-sm shadow-indigo-500 hover:bg-gray-700 focus:bg-gray-950 focus:text-gray-500"
    >
      Sign in by Google
      <FcGoogle />
    </button>
  );
}
