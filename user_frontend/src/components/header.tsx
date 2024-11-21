import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import SignInButton from './signinbutton'

const Header = () => {
  return (
    <header className="absolute top-0 right-0 p-4 z-10">
      <SignedOut>
        <SignInButton/>
      </SignedOut>
      <SignedIn>
        <UserButton 
          appearance={{
            elements: {
              rootBox: "shadow-[0_0_10px_rgba(139,92,246,0.2)]",
              avatarBox: "border-2 border-purple-500/30",
            }
          }}
        />
      </SignedIn>
    </header>
  )
}

export default Header