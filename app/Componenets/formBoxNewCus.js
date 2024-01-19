'use client';
import { useEffect, useRef, useState } from "react";
import GetTrucks from "./getDocs";
import {Button, Input} from "@nextui-org/react";


export default function FormBoxNewCus(props) {

    const customers = GetTrucks("customers");
    const searchCustomer = useRef();
    const [listCus, setListCus] = useState(customers);
    let count = 1;

    const getLineCus = (customers, index) => {
        console.log(props)
        return <tr onClick={() => { props.getNewCus(customers[index]?.customer_id, customers[index]); props.showDisableNewCus(false) }} className="border-b-2 border-black text-lg margining_table">
            <th className="text-lg">{customers[index]?.customer_street}</th>
            <th className="text-lg">{customers[index]?.customer_city}</th>
            <th className="text-lg">{customers[index]?.customer_id}</th>
            <th className="text-lg">{customers[index]?.customer_name}</th>
            <th className="text-lg">{index + 1}</th>
        </tr>
    }

    const getDefaultCus = () => {
        
        let listCus = [];
        for (let index = 0; index < customers?.length; index++) {
            listCus.push(getLineCus(customers,index));
        }
        return listCus;
    }

    const GetSearchVal = () => {
        setListCus([]);
        for (let index = 0; index < customers?.length; index++) {
            var StringName = customers[index]?.customer_name.toString();
            var StringInput = searchCustomer.current?.value.toString();
            StringName.startsWith(StringInput) && setListCus(listCus => [...listCus,getLineCus(customers,index)]);
        }
    }

    return (
        <div className="w-full md:w-1/2 mx-auto fixed z-10 top-32 right-0 left-0 border-2 border-[#334155] rounded-xl">
            <div className="flex flex-col p-5 rounded-lg shadow bg-white">
                <div className="flex flex-col items-center text-center">

                    <h2 className="mt-2 font-semibold text-black text-xl">قائمة الزبائن</h2>
                    <div className="mt-2 text-sm text-black leading-relaxed w-full text-right text-xl">اختر زبون من القائمة لديك</div>
                </div>


                <div dir="rtl" className="m-7 flex">
                    <div className="w-1/3 flex items-center">
                        <label dir="rtl" for="searchCus" className="text-base ml-5">الاسم : </label>
                        <input ref={searchCustomer} onChange={GetSearchVal} dir="rtl" type="text" name="searchCus" id="searchCus" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" />
                    </div>
                    {
                        !listCus?.length && searchCustomer.current?.value && <div className="">
                            <Button onClick={() => {props.showDisableNewCus(false);props.newCustomer()}}>اضافة زبون جديد</Button>
                        </div>
                    }
                </div>



                <div className="m-1 pr-5 pl-5 pb-5 bg-white rounded-xl overflow-scroll h-72">
                    <table className="w-full text-center">
                        <tbody>
                            <tr className="border-4 border-[#334155] sticky top-0 z-10 bg-[#334155] text-white">
                                <th><div className="text-xl">الشارع</div></th>
                                <th><div className="text-xl">العنوان</div></th>
                                <th><div className="text-xl">رقم الزبون</div></th>
                                <th><div className="text-xl">اسم الزبون</div></th>
                            </tr>
                            {
                                searchCustomer.current?.value 
                                ? 
                                listCus
                                :
                                getDefaultCus()
                            }
                            {
                                !listCus?.length && searchCustomer.current?.value && <tr>
                                    <th colSpan={4} className="p-20 text-lg">لا يوجد زبائن مطابقة لبحثك يمكنك الاضافة بالضفط على الاضافة فوق</th>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center mt-3">
                    <button onClick={() => props.showDisableNewCus(false)} className="flex-1 px-4 py-2 bg-[#334155] hover:bg-yellow-600 text-white text-2xl font-medium rounded-md">
                        الغاء
                    </button>
                </div>
            </div>
        </div>
    )
}