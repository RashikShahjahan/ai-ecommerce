import { useState } from "react";
import {getChatResponse } from "./api";

function App() {
  const [prompt, setPrompt] = useState("");
  const [chatId, setChatId] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const data = await getChatResponse(prompt, chatId);
    setChatId(data.message.chatId);
    setResponse(data.message.message[0].text);
  }

  return (
    <div>
      <div>
        <p>{response}</p>
      </div>
      <div>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default App