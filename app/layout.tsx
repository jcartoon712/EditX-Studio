import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EditX Studio - Professional Image & Video Editing',
  description: 'All-in-One Premium Image & Video Editing Web Application with AI-powered tools, professional filters, and collaborative editing features.',
  keywords: 'image editing, video editing, AI editing, photo editor, video editor, online editor, creative tools',
  authors: [{ name: 'EditX Studio Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'EditX Studio - Professional Image & Video Editing',
    description: 'All-in-One Premium Image & Video Editing Web Application',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EditX Studio - Professional Image & Video Editing',
    description: 'All-in-One Premium Image & Video Editing Web Application',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}