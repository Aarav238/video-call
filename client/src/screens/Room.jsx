import { useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider"

const Room = () => {

    const socket = useSocket();

    const userJoined = useCallback(({email , id}) => {
        console.log(email , id);
    }, [])

    useEffect(() => {
        socket.on("user:joined", userJoined)

        return () => {
            socket.off("user:joined", userJoined)
        }
    } , [socket,userJoined])

  return (
    <div><h1>Room</h1></div>
  )
}

export default Room