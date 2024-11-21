import { ChatInputProps } from "../types";

const ChatInput = ({ prompt, setPrompt, handleSend, isLoading }: ChatInputProps) => {
  return (
    <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className="min-w-0 flex-1 px-4 sm:px-6 py-3 bg-gray-900/30 text-purple-100 rounded-md border border-purple-500/20 
          focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-transparent transition-all
          placeholder-purple-300/30"
        placeholder="Whisper your desires into the void..."
      />
      <button
        onClick={handleSend}
        disabled={isLoading}
        className="shrink-0 bg-gradient-to-r from-purple-900/80 to-purple-800/80 text-purple-100 px-3 sm:px-6 py-3 rounded-md 
          hover:from-purple-800/80 hover:to-purple-700/80 transition-all transform hover:scale-105 
          disabled:opacity-50 disabled:hover:scale-100 font-medium border border-purple-500/20
          shadow-[0_0_10px_rgba(139,92,246,0.1)] whitespace-nowrap text-sm sm:text-base"
      >
        {isLoading ? "✧..." : "Manifest"}
      </button>
    </div>
  );
};

export default ChatInput; 