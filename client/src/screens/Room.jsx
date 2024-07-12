import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../service/peer";
const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [mystream, setStream] = useState(null);
  const userJoined = useCallback(({ email, id }) => {
    console.log("user connected ", email, id);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    

    setStream(stream);
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
      <h4>{remoteSocketId ? "connected" : "No Connection"}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {mystream && (
        <>
        <h2>Your video</h2>
        <ReactPlayer
          playing
          muted
          height="300px"
          width="500px"
          url={mystream}
        />
        </>
        
      )}
    </div>
  );
};

export default Room;
