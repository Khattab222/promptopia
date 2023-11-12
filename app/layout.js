import { Inter } from 'next/font/google'
import '@styles/globals.css'
import Provider from '@components/Provider'
import Nav from '@components/Nav'




export const metadata = {
  title: 'promptopia',
  description: 'Discover and share AI Prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body >
        <Provider>
        <div className='main'>

        <div className='gradients'/>
        </div>
        <main className='app'>
          <Nav/>
        {children}
        </main>

        </Provider>
      </body>
    </html>
  )
}
