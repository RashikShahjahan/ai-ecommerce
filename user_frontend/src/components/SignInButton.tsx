import { SignInButton as ClerkSignInButton } from '@clerk/clerk-react'

export default function SignInButton() {
  return (
    <ClerkSignInButton mode="modal">
      <button
        className="bg-gradient-to-r from-purple-900/80 to-purple-800/80 
          text-purple-100 px-6 py-2 rounded-md hover:from-purple-800/80 hover:to-purple-700/80 
          transition-all transform hover:scale-105 border border-purple-500/20
          shadow-[0_0_10px_rgba(139,92,246,0.1)]"
      >
        Sign in
      </button>
    </ClerkSignInButton>
  )
}