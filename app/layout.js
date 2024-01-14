import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from './FireBase/authContext';
import CheckAuth from './Componenets/checkAuth';





const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'جعفر كبها',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@700&family=Noto+Sans+Hebrew:wght@700&display=swap" rel="stylesheet"></link>

        
        <AuthContextProvider>
          <div className='test-fontt'>
            <CheckAuth children={children}/>
          </div>
        </AuthContextProvider>



      </body>
    </html>
  )
}
