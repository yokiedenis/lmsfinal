import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
 

import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from '@/components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EDUSKILL ONLINE LEARNING MANAGEMENT SYSTEM',
  description: 'Created By Eduskill Team',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        
        <ConfettiProvider/>
        <ToastProvider/>
        {children}
        </body>
    </html>
    </ClerkProvider>
  )
}
