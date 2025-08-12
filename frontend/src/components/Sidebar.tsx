import { Loader, LogOut, Search, Star, StarIcon, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useLogout from "@/hooks/useLogout";
import useGetConversations from "@/hooks/useGetConversations";
import LoadingState from "./LoadingState";
import useConversation from "@/store/use-conversation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "@/context/SocketContext";

function Sidebar() {
  const { loading, conversations } = useGetConversations();

  if (loading) {
    return <LoadingState />; // Added return here
  }

  return (
    <div className="p-6 flex h-full flex-col gap-4 border-r ">
      <SearchInput />

      {conversations.map((conversation: any) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}
      <div className="mt-auto">
        <LogOutButton />
      </div>
    </div>
  );
}

export default Sidebar;

export const Conversation = ({ conversation }: any) => {
  //@ts-ignore
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  console.log("Online : ", isOnline);

  const handleLogs = () => {
    setSelectedConversation(conversation);
  };

  return (
    <div
      className={`flex items-center justify-between gap-4 border p-2 rounded cursor-pointer hover:bg-slate-200 ${
        isSelected ? "bg-slate-300" : ""
      }`}
      onClick={() => handleLogs()}
    >
      <div className="flex items-center gap-2">
        <User />
        <p className="">{conversation.fullName}</p>
      </div>
      <div className="">
        {isOnline ? (
          <StarIcon size={14} className="text-red-600" />
        ) : (
          <Star size={14} />
        )}
      </div>
    </div>
  );
};

const SearchInput = () => {
  const [search, setSearch] = useState("");
  //@ts-ignore
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found");
  };

  // const handleVar = (e: any) => {
  //   e.preventDefault();
  //   console.log("Clicked");
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-2"
    >
      <Input
        className="flex-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit">
        <Search />
      </Button>
    </form>
  );
};

const LogOutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <Button onClick={logout} disabled={loading}>
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
};
