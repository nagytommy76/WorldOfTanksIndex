import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

import Providers from '@/ProvidersProviders'

import Footer from '@/components/Footer/Footer'
import Navbar from '@/componentsNavbar/Navbar'

const montserrat = Montserrat({
   subsets: ['latin'],
})

export const metadata: Metadata = {
   title: 'Search for tanks, Marks of Excellence, Gunmarks, Vehicle stats and more | World of Tanks Index',
   description:
      'Detailed stats for all tanks in World of Tanks, including Marks of Excellence, Gunmarks, and more. Search for your favorite tanks and compare their performance.',
   authors: [{ name: 'Nagy Tamás', url: 'https://www.linkedin.com/in/tamasnagy93/' }],
   keywords: [
      'World of Tanks Index',
      'World of Tanks',
      'WoT Index',
      'WoT',
      'tanks',
      'Marks of Excellence',
      'Gunmarks',
      'Vehicle stats',
      'tank performance',
      'tank comparison',
      'tank search',
      'tank database',
      'tank statistics',
      'tank ratings',
      'tank reviews',
      'tank guides',
      'tank builds',
      'tank strategies',
      'tank gameplay',
      'tank tips',
      'tank tricks',
   ],
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html className={montserrat.className} lang='en'>
         <body>
            <main>
               <Providers>
                  <Navbar />
                  {children}
                  <Footer />
               </Providers>
            </main>
         </body>
      </html>
   )
}
