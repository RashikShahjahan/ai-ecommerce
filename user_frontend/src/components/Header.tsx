import {  UserButton } from '@clerk/clerk-react'
import SignInButton from './SignInButton'
import { AuthProps } from '../types'


const Header = ({ mode }: AuthProps) => {
  return (
    <header className="absolute top-0 right-0 p-4 z-10">
      {mode === 'public' && <SignInButton />}
      {mode === 'authenticated' && (
        <UserButton 
          appearance={{
            elements: {
              rootBox: "shadow-[0_0_10px_rgba(139,92,246,0.2)]",
              avatarBox: "border-2 border-purple-500/30",
            }
          }}
        />
      )}
    </header>
  )
}

export default Header