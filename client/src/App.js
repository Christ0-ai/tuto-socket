import "./bootstrap.min.css";

import io from "socket.io-client";
import { useEffect, useState } from "react";

// CONNEXION AU SERVER
const socket = io.connect("http://localhost:3001");

function App() {
  // room state
  const [room, setRoom] = useState("");

  // message state
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  const sendMessage = () => {
    //ENVOIE D'UN MESSAGE
    socket.emit("send_message", { message, room });
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">TUTO SOCKET IO REACT/NODE</h1>
      <div class="form-group mt-5 col-2">
        <input
          className="form-control"
          placeholder="Room number ..."
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={joinRoom}>
        Join Room
      </button>
      <div className="form-group col-2">
        <input
          className="form-control"
          placeholder="Message ..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={sendMessage}>
        Send Message
      </button>
      <h1>Message :</h1>
      {messageReceived}
    </div>
  );
}

export default App;
