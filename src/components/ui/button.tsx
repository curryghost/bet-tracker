interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="w-24 rounded-full bg-indigo-700 py-2 text-sm font-bold shadow-sm shadow-gray-600 transition hover:bg-indigo-500 focus:bg-indigo-900 focus:text-gray-400"
      {...props}
    >
      {children}
    </button>
  );
}
