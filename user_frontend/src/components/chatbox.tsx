import { useState } from "react";
import { getChatResponse } from "../api";

const Chatbox = () => {
const [prompt, setPrompt] = useState("");
const [chatId, setChatId] = useState("");
const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
  {
    role: 'assistant',
    content: '✧ Greetings, seeker of essences. What ethereal experience do you wish to capture today? ✧'
  }
]);
const [isLoading, setIsLoading] = useState(false);

const handleSend = async () => {
  setMessages(prev => [...prev, 
    { role: 'user', content: prompt },
    { role: 'assistant', content: '...' }
  ]);
  setPrompt("");
  setIsLoading(true);

  const data = await getChatResponse(prompt, chatId);
  setChatId(data.message.chatId);
  
  setMessages(prev => {
    const newMessages = [...prev];
    newMessages[newMessages.length - 1] = { 
      role: 'assistant', 
      content: data.message.message[0].text 
    };
    return newMessages;
  });
  setIsLoading(false);
}

return (
  <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6">
    <header className="text-center mb-6">
      <h1 className="text-4xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">
        Essence Emporium
      </h1>
      <p className="text-purple-200/70 font-serif">✧ Bottling Ethereal Experiences Since MMXXIV ✧</p>
    </header>

    <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
      <div className="flex flex-col space-y-3">
        {messages.map((message, index) => (
          <div key={index} className="flex items-start justify-end">
            <div className={`rounded-lg p-4 max-w-[80%] shadow-[0_0_10px_rgba(139,92,246,0.15)] transition-all duration-300 ${
              message.role === 'user' 
                ? 'bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/20 ml-auto' 
                : 'bg-gray-800/90 backdrop-blur-sm border border-purple-300/10 mr-auto'
            } ${isLoading && message === messages[messages.length - 1] ? 'opacity-50 animate-pulse' : ''}`}>
              <p className={`${
                message.role === 'user' 
                  ? 'text-purple-100' 
                  : 'text-gray-200'
              } leading-relaxed font-light`}>
                {message.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className="flex-1 px-6 py-3 bg-gray-900/30 text-purple-100 rounded-md border border-purple-500/20 
          focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-transparent transition-all
          placeholder-purple-300/30"
        placeholder="Whisper your desires into the void..."
      />
      <button
        onClick={handleSend}
        disabled={isLoading}
        className="bg-gradient-to-r from-purple-900/80 to-purple-800/80 text-purple-100 px-8 py-3 rounded-md 
          hover:from-purple-800/80 hover:to-purple-700/80 transition-all transform hover:scale-105 
          disabled:opacity-50 disabled:hover:scale-100 font-medium border border-purple-500/20
          shadow-[0_0_10px_rgba(139,92,246,0.1)]"
      >
        {isLoading ? "✧..." : "Manifest"}
      </button>
    </div>
  </div>
)
}

export default Chatbox