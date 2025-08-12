import DashboardLayout from "@/components/layouts/DashboardLayout";
import MessageContainer from "@/components/MessageContainer";
import { useAuthContext } from "@/context/AuthContext";
import useConversation from "@/store/use-conversation";
import { MessageSquare } from "lucide-react";

function Dashboard() {
  //@ts-ignore
  const { selectedConversation } = useConversation();

  return (
    <DashboardLayout>
      {selectedConversation ? <MessageContainer /> : <NoChatSelected />}
    </DashboardLayout>
  );
}

export default Dashboard;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-lg">Welcome {authUser?.fullName}</p>
        <p className="">Please select a chat to start messaging </p>
        <MessageSquare size={50} className="animate-bounce mt-4" />
      </div>
    </div>
  );
};
