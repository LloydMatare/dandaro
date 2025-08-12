import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext<any>(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const { authUser } = useAuthContext();

  const APP_URL = "https://dandaro.onrender.com";
  //@ts-ignore
  const API_URI = "http://localhost:5173";

  useEffect(() => {
    if (authUser) {
      console.log("Connecting socket for user:", authUser._id);
      const newSocket = io(`${APP_URL}`, {
        withCredentials: true,
        autoConnect: true,
        query: {
          userId: authUser._id,
        },
      });

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        newSocket.emit("addNewUser", authUser._id);
      });

      // Listen for online users
      newSocket.on("getOnlineUsers", (users: any[]) => {
        setOnlineUsers(users);
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]); // Add authUser as dependency

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
