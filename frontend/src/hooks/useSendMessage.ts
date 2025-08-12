import useConversation from "@/store/use-conversation";
import { useState } from "react";
import toast from "react-hot-toast";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  //@ts-ignore
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: any) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setMessages([...messages, data]);

      if (data.error) throw new Error(data.error);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
}

export default useSendMessage;
