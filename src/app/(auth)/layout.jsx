import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function AuthLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        {children}
      </div>
    </ClerkProvider>
  )
}