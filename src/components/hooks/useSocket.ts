
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

const SOCKET_URL ="https://re-web-server.vercel.app";

interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export const useSocket = () => {
  const { data: session } = useSession();
  const userId = (session?.user as AuthUser | undefined)?.id;
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (userId) {
      const socketInstance = io(SOCKET_URL, {
        query: { userId },
        transports: ["websocket"], // More stable for real-time
      });

      // Move setState to a callback to avoid cascading sync renders
      socketInstance.on("connect", () => {
        setSocket(socketInstance);
      });

      return () => {
        socketInstance.disconnect();
        setSocket(null);
      };
    }
  }, [userId]);

  return socket;
};