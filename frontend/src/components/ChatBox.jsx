import { useState } from "react";
import API from "../api/axios";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const send = async () => {
    const { data } = await API.post("/profile/chat", {
      message,
    });

    setChat([...chat, { user: message, bot: data.reply }]);
    setMessage("");
  };

  return (
    <div className="border p-4">
      <div className="h-64 overflow-auto">
        {chat.map((c, i) => (
          <div key={i}>
            <p>
              <b>You:</b> {c.user}
            </p>
            <p>
              <b>AI:</b> {c.bot}
            </p>
          </div>
        ))}
      </div>

      <input
        className="border p-2 w-full mt-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={send} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Send
      </button>
    </div>
  );
}
