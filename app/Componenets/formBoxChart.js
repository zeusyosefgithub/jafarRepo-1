'use client';
import { useState } from "react";
import GetTrucks from "./getDocs";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@nextui-org/button";

export default function FormBoxChart(props) {
    
    const [kindReport,setKindReport] = useState('');

    return (
        <div className="w-full md:w-9/12 mx-auto fixed z-10 top-32 right-0 left-0 border-2 border-[#334155] rounded-xl">
            <div className="flex flex-col p-5 rounded-lg shadow bg-[#f5f5f5]">
                <div className="flex flex-col items-center text-center">
                    <h2 className="mt-2 font-semibold text-black text-xl">اضافة تقرير جديد</h2>
                </div>
                <div className="m-1 pr-5 pl-5 pb-5 bg-white rounded-xl overflow-auto form_Box_Charts_Reports">
                    <div className="flex">
                        <div className="w-1/3">
12
                        </div>
                        <div className="flex w-full">
                            <div className="w-full">
                                <div dir="rtl" className="">
                                    <div className="flex items-end">
                                        <label dir="rtl" for="numInvo1" className="text-base ml-5">رقم التقرير : </label>
                                        <input dir="rtl" type="number" name="numInvo1" id="numInvo1" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                    </div>
                                    <div className="flex items-end mb-7">
                                        <label dir="rtl" for="numInvo1" className="text-base ml-5">اسم التقرير : </label>
                                        <input dir="rtl" type="number" name="numInvo1" id="numInvo1" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                    </div>
                                    <div className="flex items-end mb-5">
                                        <div className="ml-4">نوع التقرير : </div>
                                        <Dropdown dir="rtl" className="test-fontt">
                                            <DropdownTrigger>
                                                <Button size="sm">{kindReport}<IoIosArrowDown className="text-xl"/></Button>
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => setKindReport("رسم بياني / اعمدة")}>رسم بياني / اعمدة</DropdownItem>
                                                <DropdownItem onClick={() => setKindReport("دائرة / حلقة")}>دائرة / حلقة</DropdownItem>
                                                <DropdownItem onClick={() => setKindReport("جدول")}>جدول</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                    {
                                        kindReport === "رسم بياني / اعمدة" && <div className="flex items-end">
                                            <div className="ml-4">نوع ال{kindReport} : </div>
                                            <Dropdown dir="rtl" className="test-fontt">
                                            <DropdownTrigger>
                                                <Button size="sm">{kindReport}<IoIosArrowDown className="text-xl" /></Button>
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => setKindReport("رسم بياني / اعمدة")}>رسم بياني / اعمدة</DropdownItem>
                                                <DropdownItem onClick={() => setKindReport("دائرة / حلقة")}>دائرة / حلقة</DropdownItem>
                                                <DropdownItem onClick={() => setKindReport("جدول")}>جدول</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        </div>
                                    }
                                    {
                                        kindReport === "دائرة / حلقة" && <div className="flex items-end">
                                            <div className="ml-4">نوع ال{kindReport} : </div>
                                            <Dropdown dir="rtl" className="test-fontt">
                                            <DropdownTrigger>
                                                <Button size="sm">{kindReport}<IoIosArrowDown className="text-xl" /></Button>
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => setKindReport("رسم بياني / اعمدة")}>رسم بياني / اعمدة</DropdownItem>
                                                <DropdownItem onClick={() => setKindReport("دائرة / حلقة")}>دائرة / حلقة</DropdownItem>
                                                <DropdownItem onClick={() => setKindReport("جدول")}>جدول</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        </div>
                                    }
                                    {
                                        kindReport === "جدول" && <div className="flex items-end">
                                            <div className="ml-4">نوع ال{kindReport} : </div>
                                            <Dropdown dir="rtl" className="test-fontt">
                                            <DropdownTrigger>
                                                <Button size="sm">{kindReport}<IoIosArrowDown className="text-xl" /></Button>
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => setKindReport("رسم بياني / اعمدة")}>رسم بياني / اعمدة</DropdownItem>
                                                <DropdownItem onClick={() => setKindReport("دائرة / حلقة")}>دائرة / حلقة</DropdownItem>
                                                <DropdownItem onClick={() => setKindReport("جدول")}>جدول</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        </div>
                                    }
                                </div>
                                <div>
                                    213
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center mt-3">
                    <button onClick={() => props.disable()} className="flex-1 px-4 py-2 bg-[#334155] hover:bg-yellow-600 text-white text-2xl font-medium rounded-md">
                        الغاء
                    </button>
                </div>
            </div>
        </div>
    )
}