import { Users } from "lucide-react";
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";

export default function Sidebar() {
  const {
    getUser,
    isUsersLoading,
    users,
    selectedUser,
    setSelectedUser,
    getMessages,
  } = useChatStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  function select(userId) {
    setSelectedUser(userId);
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
 {isUsersLoading ? <SidebarSkeleton /> :     <div className="userContainer overflow-y-auto w-full ">
        {users.map((user) => (
          <button
            onClick={() => select(user)}
            key={user._id}
            className={` w-full cursor-pointer p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors  ${
                selectedUser?._id === user._id ? "bg-base-300" : ""
              } `}
          >
            <div className="avatar relative size-18">
              <img src={user.profilePic || "/image/avatar.png"} alt="" />
            </div>
            <div className="flex-col flex items-start">
              <p>{user.fullName}</p>
              <span className="text-sm text-zinc-400">Last message...</span>
            </div>
          </button>
        ))}
      </div>}
    
    </aside>
  );
}
