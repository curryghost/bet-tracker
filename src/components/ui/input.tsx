interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...props }: InputProps) {
  return (
    <input
      className="rounded-lg bg-gray-600 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-indigo-500"
      {...props}
    />
  );
}
