export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={
        "border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-300 outline-none " +
        className
      }
    />
  );
}
