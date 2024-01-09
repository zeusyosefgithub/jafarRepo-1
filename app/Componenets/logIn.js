'use client';
import rep6 from '../../images/rep6.png'
import Image from 'next/image';
import { UserAuth } from "../FireBase/authContext";
import { CiLogin } from "react-icons/ci";

export default function LogIn() {

    const { user, googleSignIn, logOut } = UserAuth();

    const handelSignIn = async() => {
        try{
          await googleSignIn();
        }
        catch(e){
          console.log(e);
        }
      }

    return (
        <div className="absolute LogIn_Page w-full">

            <div className="flex justify-center z-10">

                <div className="bg-gray-300 p-10 pr-28 pl-28 border-r-4 border-r-[#334155]">
                    <div className="text-4xl flex justify-center">تسجيل الدخول</div>
                    <div className='flex justify-center mt-20 items-center'>
                        
                        <button onClick={handelSignIn} className='text-2xl bg-gray-400 p-3 rounded-3xl hover:bg-black hover:text-white flex items-center'><CiLogin className='mr-4 text-3xl'/> تسجيل الدخول</button>
                    </div>
                    <div>
                        <Image
                            src={rep6}
                            width={300}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

//<div className="text-center mt-1/2 mb-1/2">Login Page</div>