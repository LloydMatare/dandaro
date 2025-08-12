import { User, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import useConversation from "@/store/use-conversation";
import useSendMessage from "@/hooks/useSendMessage";
import { useAuthContext } from "@/context/AuthContext"; // adjust path
import useGetMessages from "@/hooks/useGetMessages";
import useGetConversations from "@/hooks/useGetConversations";
import { useSocketContext } from "@/context/SocketContext";
import useListenMessages from "@/hooks/useListenMessage";

function MessageContainer() {
  //@ts-ignore
  const { selectedConversation, setSelectedConversation } = useConversation();
  // useEffect(() => {
  //   return () => setSelectedConversation(null);
  // }, [setSelectedConversation]);

  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();

  useEffect(() => {
    if (authUser && socket) {
      socket.emit("addNewUser", authUser._id);
    }
  }, [authUser, socket]);

  return (
    <div className="flex flex-col overflow-auto p-4 h-full">
      <div className="w-full flex items-center gap-1 h-14 rounded-lg p-4 bg-slate-400">
        <p className="font-bold">To : </p>
        <p className="">{selectedConversation.fullName}</p>
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
}

export default MessageContainer;

const Messages = () => {
  const { authUser } = useAuthContext();
  const currentUserId = authUser?._id; // ✅ get logged-in user's ID
  const { messages, loading } = useGetMessages();
  useListenMessages();

  if (loading)
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="">Loading</p>
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!loading && messages.length === 0)
    return (
      <p className="flex-1 flex items-center justify-center text-center">
        Send a message to start the conversation
      </p>
    );

  return (
    <div className="flex-1 overflow-auto py-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          No messages yet
        </div>
      ) : (
        messages.map((message: any) =>
          message.senderId === currentUserId ? (
            <ChatEnd key={message._id} message={message} />
          ) : (
            <ChatStart key={message._id} message={message} />
          )
        )
      )}
    </div>
  );
};

const ChatStart = ({ message }: any) => {
  return (
    <div className=" flex  gap-2 p-2 ">
      <div className="chat-image avatar">
        <div className="bg-slate-700 text-white h-8 w-8 rounded-full flex items-center justify-center p-2">
          <User />
        </div>
      </div>
      <p className="text-xs">10:00</p>
      <div className={`bg-slate-400 text-white py-3 px-6 rounded-[1100px]`}>
        {message.message}
      </div>
    </div>
  );
};

const ChatEnd = ({ message }: any) => {
  return (
    <div className=" flex items-start  gap-2 p-2 chat-end">
      <div className={`bg-slate-700 text-white py-3 px-6 rounded-[1100px]`}>
        {message.message}
      </div>
      <p className="text-xs">10:00</p>
      <div className="chat-image avatar">
        <div className="bg-slate-400 text-white h-8 w-8 rounded-full flex items-center justify-center p-2">
          <User />
        </div>
      </div>
    </div>
  );
};

const MessageInput = () => {
  const [message, setMessage] = useState("");
  //@ts-ignore
  const { loading, sendMessage } = useSendMessage();
  //@ts-ignore
  const { setSelectedConversation } = useGetConversations();
  //@ts-ignore
  const { conversations } = useGetConversations();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 my-3 flex w-full items-center gap-2 mt-auto"
    >
      <Input
        type="text"
        className="w-full"
        placeholder="Send message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" onClick={handleSubmit}>
        {loading ? (
          <div className="">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <Send />
        )}
      </Button>
    </form>
  );
};

// const Skeleton = () => {
//   <div className="">
//     <div className=" flex  gap-2 p-2 ">
//       <div className="chat-image avatar">
//         <div className="bg-slate-700 text-white h-8 w-8 rounded-full flex items-center justify-center p-2" />
//       </div>
//       <p className="text-xs">10:00</p>
//       <div className={`bg-slate-400 text-white py-3 px-6 rounded-[1100px]`} />
//     </div>
//     <div className=" flex items-start  gap-2 p-2 chat-end">
//       <div className={`bg-slate-700 text-white py-3 px-6 rounded-[1100px]`} />
//       <p className="text-xs">10:00</p>
//       <div className="chat-image avatar">
//         <div className="bg-slate-400 text-white h-8 w-8 rounded-full flex items-center justify-center p-2" />
//       </div>
//     </div>
//   </div>;
// };
