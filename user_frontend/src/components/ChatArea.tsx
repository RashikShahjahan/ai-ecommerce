import { ChatAreaProps } from "../types";
const ChatArea = ({ messages, isLoading }: ChatAreaProps) => {
  return (
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
  );
};

export default ChatArea; 