import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'

import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'


import { ToasterProvider } from './providers/ToasterProvider';
import { Inter } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'
import SearchModal from './components/modals/SearchModal'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
      <ClientOnly>

      <ToasterProvider />
      <RentModal />
      <SearchModal />
      <LoginModal />
      <RegisterModal />
      <Navbar currentUser={currentUser} />
       </ClientOnly>

        <div className='pb-20 pt-28'>
        {children}


        </div>


      </body>
    </html>
  )
}
