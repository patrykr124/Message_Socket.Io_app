import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatSkeleton from "./ChatSkeleton";
import MessageInput from "./MessageInput";

export default function Chat() {
  const { isMessagesLoading, getMessages, selectedUser, messages, subscribeToMessages,unsubscribeFromMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    getMessages(selectedUser?._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [getMessages, selectedUser?._id,subscribeToMessages,unsubscribeFromMessages]);

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
      <div className="md:p-8 p-2 flex-1 flex flex-col overflow-x-hidden md:overflow-auto">
        {messages.map((mess) => {
          const messageSendTimeMin = mess.createdAt
            .split("T")[1]
            .split(".")[0]
            .slice(0, 5);
          const messageSendTimeYear = mess.createdAt.split("T")[0];
          const nowDate = new Date().toISOString().split("T")[1].slice(0, 5);
          let time = `${messageSendTimeMin} ${messageSendTimeYear}`;
          if (messageSendTimeMin === nowDate) {
            time = "just now";
          }

          return (
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
              <p className="chat-footer text-zinc-600">{time}</p>
            </div>
          );
        })}
        <div ref={lastMessageRef} className="" />
      </div>
      <MessageInput />
    </div>
  );
}
