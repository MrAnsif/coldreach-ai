import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link';
import { Crown } from 'lucide-react';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">ColdMessageGen</h1>
          <div className="flex items-center space-x-4">
            <Link href={'/pricing'}>
              <h1 className='flex font-semibold items-center gap-2 bg-amber-300 rounded-2xl p-2 hover:bg-yellow-500'>Plan <Crown className='w-5 h-5' /> </h1>
            </Link>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}