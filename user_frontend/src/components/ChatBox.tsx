import { useState } from "react";
import { getChatResponse } from "../api";
import ChatInput from './ChatInput';
import ChatArea from './ChatArea';
import { AuthProps } from "../types";

const Chatbox = ({ mode }: AuthProps) => {
const [prompt, setPrompt] = useState("");
const [chatId, setChatId] = useState("");
const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
  {
    role: 'assistant',
    content: mode === 'authenticated' 
      ? '✧ Greetings, seeker of essences. What ethereal experience do you wish to capture today? ✧'
      : '✧ Welcome to the Essence Emporium. Please sign in to begin capturing ethereal experiences. ✧'
  }
]
);

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

    <ChatArea 
      messages={messages}
      isLoading={isLoading}
    />

    {mode === 'authenticated' && (  
      <ChatInput 
      prompt={prompt}
      setPrompt={setPrompt}
      handleSend={handleSend}
        isLoading={isLoading}
      />
    )}
  </div>
)
}

export default Chatbox