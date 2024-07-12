import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";

const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);

  const userJoined = useCallback(({ email, id }) => {
    console.log("user connected ", email, id);
    setRemoteSocketId(id);
  }, []);

  useEffect(() => {
    socket.on("user:joined", userJoined);

    return () => {
      socket.off("user:joined", userJoined);
    };
  }, [socket, userJoined]);

  return (
    <div>
      <h1>Room</h1>
      <h4>{remoteSocketId ? "connected": 'No Connection'}</h4>
    </div>
  );
};

export default Room;
