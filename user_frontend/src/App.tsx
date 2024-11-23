import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Chatbox from "./components/ChatBox";
import Header from "./components/Header";
import { useAuth } from "@clerk/clerk-react";
import { setAuthToken } from "./api";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";

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
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Header mode="authenticated" />
            <Chatbox mode="authenticated" />
          </div>
        </div>
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