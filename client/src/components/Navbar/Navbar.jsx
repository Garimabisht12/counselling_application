// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <header className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 py-4 px-4 text-center sm:flex-row sm:justify-between">
        <h1 className="text-xl font-bold sm:text-2xl">
          ABC College
        </h1>
        <h2 className="text-sm font-medium opacity-90 sm:text-base">
          123 Main Street, Applewood - xxxxxx
        </h2>
      </div>
    </header>
  );
}
