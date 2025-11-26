export default function Card({ children, className = "" }) {
  return (
    <div className={"bg-white shadow-md p-6 rounded-lg " + className}>
      {children}
    </div>
  );
}
