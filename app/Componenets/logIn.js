'use client';
import rep6 from '../../images/rep6.png'
import Image from 'next/image';
import { UserAuth } from "../FireBase/authContext";
import { CiLogin } from "react-icons/ci";
import CustomerLogin from './CustomerLogin';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from '@nextui-org/react';
import { FiArrowRight } from 'react-icons/fi';
import GetTrucks from './getDocs';
import { useState } from 'react';

export default function LogIn() {

    const { user, googleSignIn, logOut , error } = UserAuth();
    const [typeLogIn, setTypeLogIn] = useState('admin');

    const handelSignIn = async () => {
        try {
            await googleSignIn();
        }
        catch (e) {
            console.log(e);
        }
    }

    const CustomersDetails = GetTrucks('CustomerDetails');
    const [cusVal, setCusVal] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isCustomer, setIsCustomer] = useState(false);

    function checkCustomer(id) {
        for (let index = 0; index < CustomersDetails?.length; index++) {
            if (id === CustomersDetails[index]?.id) {
                return true;
            }
        }
        return false;
    }

    function GetCustomer(pass) {
        for (let index = 0; index < CustomersDetails?.length; index++) {
            if (pass === CustomersDetails[index]?.id) {
                return CustomersDetails[index];
            }
        }
    }

    const handelSignInCustomer = () => {
        setErrorMessage('');
        if (!checkCustomer(cusVal)) {
            return setErrorMessage('الكود الذي ادخلته غير صحيح حاول مرة اخرى!!');
        }
        setErrorMessage('');
        setIsCustomer(true);
    }


    return (
        // <div className="absolute LogIn_Page w-full test-fontt">

        //     <div className="flex justify-center z-10">

        //         <div className="bg-gray-300 p-10 pr-28 pl-28 border-r-4 border-r-[#334155]">
        //             <div className="text-4xl flex justify-center">ØªØ³Ø¬ÙÙ Ø§ÙØ¯Ø®ÙÙ</div>
        //             <div className='flex justify-center mt-20 items-center'>

        //                 <button onClick={handelSignIn} className='text-2xl bg-gray-400 p-3 rounded-3xl hover:bg-black hover:text-white flex items-center'><CiLogin className='mr-4 text-3xl'/> ØªØ³Ø¬ÙÙ Ø§ÙØ¯Ø®ÙÙ</button>
        //             </div>
        //             <div>
        //                 <Image
        //                     src={rep6}
        //                     width={300}
        //                 />
        //             </div>
        //         </div>
        //     </div>
        // </div>



        <>
            {
                isCustomer ?
                    <CustomerLogin Data={GetCustomer(cusVal)} disable={() => { setCusVal(''); setIsCustomer(false); }} />
                    :
                    <div className='absolute top-1/4 w-full'>
                        <div className='flex justify-center'>
                            <Card className="w-full max-w-md p-10 bg-white rounded-xl shadow-xl">
                                <CardHeader className="">
                                    <div className='w-full'>
                                        {
                                            typeLogIn === 'admin' ?
                                                <div className='text-2xl text-center'>تسجيل دخول مسؤل</div>
                                                :
                                                <div className='text-2xl text-center'>تسجيل دخول زبون</div>

                                        }
                                        <div className='flex justify-center'>
                                            <Image
                                                src={rep6}
                                                width={220}
                                            />
                                        </div>
                                    </div>
                                </CardHeader>
                                {
                                    typeLogIn === 'admin' ?
                                        <>
                                            {
                                                error && <div>
                                                    <div dir='rtl' className='mt-2 mb-2 text-right text-danger text-sm'>{error}</div>
                                                </div>
                                            }
                                            <Divider />
                                            <div onClick={() => setTypeLogIn('customer')} className='mt-3 mb-3 text-sm hover:text-primary cursor-pointer flex items-center justify-end'>لتسجيل دخول زبون<FiArrowRight className='ml-1' /></div>
                                            <CardFooter>
                                                <Button onClick={handelSignIn} className="w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">تسجيل دخول</Button>
                                            </CardFooter>
                                        </>
                                        :
                                        <>
                                            <div className='space-y-4'>
                                                <div dir='rtl'>
                                                    <Input errorMessage={errorMessage} value={cusVal} onValueChange={(value) => setCusVal(value)} className='mb-4' placeholder="ادخل الكود الخاص بك.." type="text" />
                                                </div>
                                            </div>
                                            <Divider />
                                            <div onClick={() => setTypeLogIn('admin')} className='mt-3 mb-3 text-sm hover:text-primary cursor-pointer flex items-center justify-end'>لتسجيل دخول مسؤل<FiArrowRight className='ml-1' /></div>
                                            <CardFooter>
                                                <Button onClick={handelSignInCustomer} className="w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">تسجيل دخول</Button>
                                            </CardFooter>
                                        </>
                                }
                            </Card>
                        </div>
                    </div>
            }
        </>







    )
}

//<div className="text-center mt-1/2 mb-1/2">Login Page</div>