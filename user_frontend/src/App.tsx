import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Chatbox from "./components/ChatBox";
import Header from "./components/Header";

function App() {
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