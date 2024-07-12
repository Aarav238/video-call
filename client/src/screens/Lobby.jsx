import { useCallback, useState } from "react"
import { useSocket } from "../context/SocketProvider"; 

const Lobby = () => {

    const [email, setEmail] = useState("");

    const [room, setRoom] = useState("");

    const socket = useSocket();

    const handleSubmit = useCallback(
      (e) => {
        e.preventDefault();

        socket.emit("room:join", { email, room });
      },
      [email, room, socket]
    );

    return (
        <div>
            <h1>Lobbby</h1>
            <form  onSubmit={handleSubmit}>
                <label htmlFor="email"> Email ID</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                    <br />
                <label htmlFor="room">Room no.</label>
                <input 
                    type="text" 
                    id="room" 
                    value={room} 
                    onChange={e => setRoom(e.target.value)} />
                <br />

                <button>Join</button>

            </form>
        </div>

    )
}

export default Lobby