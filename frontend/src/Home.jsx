import Navbar from "./components/Navbar";
import { Link,Outlet } from "react-router";
import ToastContainerComponent from "./components/ToastContainerComponent";
export default function Home() {
  return (
    <div className="w-full min-h-screen bg-slate-800 flex flex-col items-center">
     
      <Navbar />

      
      <nav className="my-4 flex space-x-4">
        <Link
          className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
          to="mood"
        >
          Select Mood
        </Link>
        <Link
          className="px-4 py-2 rounded-xl bg-gray-500 text-white hover:bg-gray-600 transition"
          to="express"
        >
          Express Mood
        </Link>
      </nav>

      
      <div className="flex justify-center items-center w-full">
        <Outlet />
      </div>

      
      <ToastContainerComponent />
    </div>
  );
}
