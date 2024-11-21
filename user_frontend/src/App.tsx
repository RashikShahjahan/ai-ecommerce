import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Chatbox from "./components/ChatBox";
import Header from "./components/Header";
import { useAuth } from "@clerk/clerk-react";
import { setAuthToken } from "./api";
import { useEffect } from "react";

function App() {
  const { getToken } = useAuth();
  
  useEffect(() => {
    const setupAuth = async () => {
      const token = await getToken();
      if (token) {
        setAuthToken(token);
      }
    };
    
    setupAuth();
  }, [getToken]);

  return (
    <>
      <SignedIn>
        <>
          <Header mode="authenticated" />
          <Chatbox mode="authenticated" />
        </>
      </SignedIn>
      <SignedOut>
        <>
          <Header mode="public" />
          <Chatbox mode="public" />
        </>
      </SignedOut>
    </>
  );
}

export default App;