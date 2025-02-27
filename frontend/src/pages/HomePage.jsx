import Chat from "../components/Chat";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

export default function HomePage() {
  const { selectedUser } = useChatStore();
  
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center wrapper pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full  h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {selectedUser ? <Chat /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  );
}
