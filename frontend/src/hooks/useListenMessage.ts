import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/store/use-conversation";
import { useEffect } from "react";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  //@ts-ignore
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: any) => {
      setMessages([...messages, newMessage]);
    });
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
