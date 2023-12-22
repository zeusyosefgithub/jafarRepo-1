import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link';
import { FaHome } from "react-icons/fa";
import { IoListSharp } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import rep4 from "../images/rep4.jpeg";
import rep5 from "../images/rep5.jpeg";
import Image from 'next/image';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@700&family=Noto+Sans+Hebrew:wght@700&display=swap" rel="stylesheet"></link>
        <div className='items-center z-30 fixed top-0 w-full bg-[#334155] flex justify-between p-5'>
          <div className='flex justify-around w-3/6 test-fontt'>
            <Link href="/processes" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
              <GrUserAdmin/>
              <button className='ml-2'>
                ادارة
              </button>
            </Link>
            <Link href="/lists" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
              <IoListSharp/>
              <button className='ml-2'>
                القوائم
              </button>
            </Link>

            <Link href="/processes" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
              <FaFileInvoiceDollar/>
              <button className='ml-2'>
                انشاء فاتورة
              </button>
            </Link>

            <Link href="/" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
              <FaHome />
              <button className='ml-2'>
                الصفحة الرئيسية
              </button>
            </Link>
          </div>

          <div><Image
            className="rounded-lg"
            src={rep5}
            width={110}
            
          /></div>
        </div>






        <div className='mt-40'>
          {children}
        </div>

      </body>
    </html>
  )
}
