
import { useEffect, useState } from "react";
import Pusher, { Channel } from "pusher-js";
import { useSession } from "next-auth/react";

// Pusher config from env
const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY as string;
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string;
const PUSHER_HOST = process.env.NEXT_PUBLIC_PUSHER_HOST as string | undefined;

interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}
function usePusher() {
  const { data: session } = useSession();
  const userId = (session?.user as AuthUser | undefined)?.id;
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    if (!userId || !PUSHER_KEY || !PUSHER_CLUSTER) return;

    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      forceTLS: true,
      ...(PUSHER_HOST ? { wsHost: PUSHER_HOST, wsPort: 6001, enabledTransports: ["ws", "wss"] } : {}),
      auth: {
        params: { userId },
      },
    });

    const userChannel = pusher.subscribe(`user-${userId}`);
    // Do not set state synchronously here to avoid cascading renders
    setTimeout(() => setChannel(userChannel), 0);

    return () => {
      userChannel.unsubscribe();
      pusher.disconnect();
      setChannel(null);
    };
  }, [userId]);

  return channel;
}

export default usePusher;
// Only one export default allowed