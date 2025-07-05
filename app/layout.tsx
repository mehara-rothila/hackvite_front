// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EduLink Pro - Educational Communication Platform',
  description: 'Bridge the gap between students and lecturers with AI-powered insights, seamless messaging, and smart scheduling.',
  keywords: 'education, communication, students, lecturers, AI, messaging, scheduling',
  authors: [{ name: 'EduLink Pro Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'EduLink Pro - Educational Communication Platform',
    description: 'Bridge the gap between students and lecturers with AI-powered insights, seamless messaging, and smart scheduling.',
    type: 'website',
    locale: 'en_US',
    siteName: 'EduLink Pro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduLink Pro - Educational Communication Platform',
    description: 'Bridge the gap between students and lecturers with AI-powered insights, seamless messaging, and smart scheduling.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="EduLink Pro" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
        <div id="modal-root"></div>
        <div id="toast-root"></div>
      </body>
    </html>
  )
}