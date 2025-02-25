import { LogOut, MessageSquare, SettingsIcon, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg ">
      <div className="wrapper h-16 px-4 ">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="size-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatly</h1>
            </Link>
          </div>

          <div className="flex gap-2">
            <Link
              className="flex items-center gap-1 btn rounded-lg cursor-pointer hover:opacity-80 transition-all "
              to="/profile"
            >
              <SettingsIcon className="size-5 " />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={`/profile/${authUser._id}`}
                  className="flex btn rounded-lg items-center gap-1 cursor-pointer hover:opacity-80 transition-all "
                >
                  <User className="size-5 " />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  className="flex gap-1 btn rounded-lg items-center cursor-pointer hover:opacity-80 transition-all"
                  onClick={logout}
                >
                  <LogOut className="size-5 " />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
