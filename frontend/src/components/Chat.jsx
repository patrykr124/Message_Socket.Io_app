import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatSkeleton from "./ChatSkeleton";
import MessageInput from "./MessageInput";

export default function Chat() {
  const { isMessagesLoading, getMessages, selectedUser, messages } =
    useChatStore();
  console.log(messages);
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
  }, [getMessages, selectedUser?._id]);

  if (isMessagesLoading)
    return (
      <div className="flex flex-1 flex-col overflow-auto ">
        <ChatHeader />
        <ChatSkeleton />
        <MessageInput />
      </div>

    );

  return (
    <div className="flex-1 flex flex-col ">
      <ChatHeader />
      <div className="p-8 flex-1 flex flex-col overflow-auto">
        {messages.map((mess) => (
          <div
            key={mess._id}
            className={`chat ${
              mess.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={authUser.profilePic}
                />
              </div>
            </div>
            <div className="chat-bubble">
              <p>{mess.text}</p>
              {mess.image ? (
                <div className="w-[300px]">
                  <img src={mess.image} />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
}
