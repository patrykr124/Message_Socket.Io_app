import { Users } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";

export default function Sidebar() {
  const {
    getUser,
    isUsersLoading,
    users,
    selectedUser,
    setSelectedUser,
    getLastMessage,
  } = useChatStore();
  const { onLineUsers } = useAuthStore();
 

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    getLastMessage();
  }, [getLastMessage]);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  function select(userId) {
    setSelectedUser(userId);
  }

  return (
    <aside className="h-full w-24 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
      {isUsersLoading ? (
        <SidebarSkeleton />
      ) : (
        <div className="userContainer overflow-y-auto w-full ">
          {users.map((user) => (
            <button
              onClick={() => select(user)}
              key={user._id}
              className={` w-full cursor-pointer p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors  ${
                selectedUser?._id === user._id ? "bg-base-300" : ""
              } `}
            >
              <div className="relative flex items-center justify-center gap-2">
                <div className="avatar size-18">
                  <img
                    className=""
                    src={user.profilePic || "/image/avatar.png"}
                    alt=""
                  />
                </div>
                {onLineUsers.includes(user._id)  && (
                  <div className="online absolute top-2 left-2.5 w-3 h-3 rounded-full bg-green-500 z-50" />
                )}
                
                <div className="flex-col lg:flex items-start hidden">
                  <p>{user.fullName}</p>
                  <span className="text-sm text-zinc-400">
                    {user.lastMessage}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
