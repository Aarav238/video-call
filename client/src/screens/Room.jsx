import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";

const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [mystream , setStream] = useState(null)
  const userJoined = useCallback(({ email, id }) => {
    console.log("user connected ", email, id);
    setRemoteSocketId(id);
  }, []);


  const handleCallUser = useCallback(
    async () => {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});

      setStream(stream)
    },
    [],
  )
  
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
      {remoteSocketId && (<button onClick={}>Call</button>)}
      
    </div>
  );
};

export default Room;
