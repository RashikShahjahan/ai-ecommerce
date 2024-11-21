export interface ChatInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    handleSend: () => void;
    isLoading: boolean;
  }

  interface Message {
    role: 'user' | 'assistant';
    content: string;
  }
  
 export interface ChatAreaProps {
    messages: Message[];
    isLoading: boolean;
  }

  export interface AuthProps {
    mode: 'authenticated' | 'public';
  }
  