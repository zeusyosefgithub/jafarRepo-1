'use client';
import Link from 'next/link';
import { FaHome } from "react-icons/fa";
import { IoListSharp } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import { LuPlusSquare } from "react-icons/lu";
import { GrUpdate } from "react-icons/gr";
import rep6 from "../../images/rep6.png";
import Image from 'next/image';
import LogOut from './logout';

export default function NavBar() {
    return (
        <div className='items-center z-30 fixed top-0 w-full bg-[#334155] flex justify-between p-5'>
            <div className='flex justify-around w-3/6 test-fontt'>
                <Link href="/processes" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
                    <GrUserAdmin />
                    <button className='ml-2'>
                        ادارة
                    </button>
                </Link>
                <Link href="/lists" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
                    <IoListSharp />
                    <button className='ml-2'>
                        القوائم
                    </button>
                </Link>

                <Link href="/processes" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
                    <LuPlusSquare />
                    <button className='ml-2'>
                        اضافة
                    </button>
                </Link>

                <Link href="/" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
                    <FaHome />
                    <button className='ml-2'>
                        الصفحة الرئيسية
                    </button>
                </Link>

                <Link href="/updates" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
                    <GrUpdate/>
                    <button className='ml-2'>
                        تحديثات البرنامج
                    </button>
                </Link>
            </div>

            <div className='flex items-center'>

                <div className='mr-4'>
                    <LogOut />
                </div>


                <Image
                    className="rounded-lg bg-gray-300"
                    src={rep6}
                    width={90} />

            </div>
        </div>
    )
}