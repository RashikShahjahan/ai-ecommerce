import { useState } from "react";
import {getChatResponse } from "./api";

function App() {
  const [prompt, setPrompt] = useState("");
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    {
      role: 'assistant',
      content: '👋 Hello! I\'m your AI assistant. How can I help you today?'
    }
  ]);

  const handleSend = async () => {
    const data = await getChatResponse(prompt, chatId);
    setChatId(data.message.chatId);
    setMessages(prev => [...prev, 
      { role: 'user', content: prompt },
      { role: 'assistant', content: data.message.message[0].text }
    ]);
    setPrompt("");
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        <div className="flex flex-col space-y-2">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start justify-end">
              <div className={`rounded-lg p-3 max-w-[80%] shadow-sm ${
                message.role === 'user' 
                  ? 'bg-blue-500 ml-auto' 
                  : 'bg-white mr-auto'
              }`}>
                <p className={message.role === 'user' ? 'text-white' : 'text-gray-800'}>
                  {message.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App