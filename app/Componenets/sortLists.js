'use client';

import React, { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { IoIosArrowDown } from "react-icons/io";



export default function SortLists(props) {

    const [kindSortIn, setkindSortIn] = useState('day');

    const setKindSortIn = (wich, value1, value2) => {
        props.setkindSortIn(wich, value1, value2);
    }

    return (
        <div>
            <div className="flex mb-5 justify-center">
                <div className="flex bg-gray-300 rounded border-r-8 border-r-[#334155] items-center p-5">
                    <div>
                        <Button onClick={props.handlePrint} variant="bordered" className="p-5 text-xl text-white bg-black">طباعة</Button>
                    </div>
                    <div className="ml-3">
                        <NewDropdown setKindSortIn={setKindSortIn} KindDrop={"تصنيف"} />
                    </div>
                    <div className="ml-3">
                        <NewDropdown setKindSortIn={setKindSortIn} KindDrop={"ترتيب"} />
                    </div>
                    <div className="ml-3">
                        <NewDropdown setKindSortIn={setKindSortIn} KindDrop={"فلتر"} />
                    </div>
                </div>
                {/* <div>
                    <NewDropdown KindDrop={"search"}/>
                </div> */}

            </div>
        </div>
    )
}

export function NewDropdown(props) {

    //const FromDateRef = useRef();
    //const ToDateRef = useRef();

    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    const ref1 = useRef();
    const ref2 = useRef();


    return (
        <div className="">

            <Dropdown isDisabled={true} className="test-fontt" closeOnSelect={false} dir="rtl">
                <DropdownTrigger>
                    <Button variant="bordered" className="p-5 text-xl text-white bg-[#334155]">
                        <IoIosArrowDown className="text-2xl" />
                        {props.KindDrop}
                    </Button>
                </DropdownTrigger>
                {
                    props.KindDrop === "تصنيف"
                        ?

                        <DropdownMenu variant="faded" aria-label="Static Actions">
                            <DropdownItem onClick={() => props.setKindSortIn('nothing')} >بدون</DropdownItem>
                            <DropdownItem onClick={() => props.setKindSortIn('day')} >حسب اليوم</DropdownItem>
                            <DropdownItem onClick={() => props.setKindSortIn('month')}>حسب الشهر</DropdownItem>
                            <DropdownItem onClick={() => props.setKindSortIn('year')}>حسب السنة</DropdownItem>
                        </DropdownMenu>

                        :
                        props.KindDrop === 'ترتيب' ?
                            <DropdownMenu variant="faded" aria-label="Static Actions">
                                <DropdownItem>
                                    <Button className="w-full">رقم الفاتورة</Button>
                                </DropdownItem>
                                <DropdownItem>
                                    <Button className="w-full">تاريخ الفاتورة</Button>

                                </DropdownItem>
                                <DropdownItem>

                                    <Button className="w-full">الاسم</Button>
                                </DropdownItem>
                            </DropdownMenu>
                            :
                            <DropdownMenu variant="faded" aria-label="Static Actions">




                                <DropdownItem>
                                    <Button className="w-full">بدون</Button>
                                </DropdownItem>



                                <DropdownItem>
                                    <Dropdown closeOnSelect={false}>
                                        <DropdownTrigger>
                                            <Button className="w-full">رقم الفاتورة</Button>
                                        </DropdownTrigger>
                                        <DropdownMenu className="test-fontt" variant="light">
                                            <DropdownItem
                                                isReadOnly
                                                endContent={
                                                    <div dir="rtl">
                                                        <div className="flex items-end">
                                                            <label dir="rtl" for="FromDate" className="text-base ml-5">رقم محدد : </label>
                                                            <input dir="rtl" type="number" name="FromDate" id="FromDate" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                                        </div>
                                                        <div className="flex" dir="rtl">
                                                            <div className="flex items-end">
                                                                <label dir="rtl" for="FromDate" className="text-base ml-5">من : </label>
                                                                <input dir="rtl" type="number" name="FromDate" id="FromDate" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                                            </div>
                                                            <div className="flex items-end">
                                                                <label dir="rtl" for="FromDate" className="text-base ml-5">الى : </label>
                                                                <input dir="rtl" type="number" name="FromDate" id="FromDate" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            >

                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </DropdownItem>












                                <DropdownItem>
                                    <Dropdown closeOnSelect={false}>
                                        <DropdownTrigger>
                                            <Button className="w-full">تاريخ الفاتورة</Button>
                                        </DropdownTrigger>
                                        <DropdownMenu className="test-fontt" variant="light">
                                            <DropdownItem
                                                isReadOnly
                                                endContent={
                                                    <div dir="rtl">
                                                        <div className="flex items-end">
                                                            <label dir="rtl" for="FromDate" className="text-base ml-5">حسب اليوم : </label>
                                                            <input dir="rtl" type="text" name="FromDate" id="FromDate" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="_____/___/__" required />
                                                        </div>
                                                        <div className="flex items-end">
                                                            <label dir="rtl" for="FromDate" className="text-base ml-5">حسب الشهر : </label>
                                                            <input  dir="rtl" type="text" name="FromDate" id="FromDate" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                                        </div>
                                                        <div className="flex items-end">
                                                            <label dir="rtl" for="FromDate" className="text-base ml-5">حسب السنة : </label>
                                                            <input dir="rtl" type="text" name="FromDate" id="FromDate" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                                        </div>
                                                        <div className="flex" dir="rtl">
                                                            <div className="flex items-end">
                                                                <label dir="rtl" for="FromDate" className="text-base ml-5">من : </label>
                                                                <input dir="rtl" type="text" name="FromDate" id="FromDate" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                                            </div>
                                                            <div className="flex items-end">
                                                                <label dir="rtl" for="FromDate" className="text-base ml-5">الى : </label>
                                                                <input dir="rtl" type="text" name="FromDate" id="FromDate" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            >

                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </DropdownItem>









                                <DropdownItem>
                                    <Dropdown closeOnSelect={false}>
                                        <DropdownTrigger>
                                            <Button className="w-full">الاسم</Button>
                                        </DropdownTrigger>
                                        <DropdownMenu className="test-fontt" variant="light">
                                            <DropdownItem
                                                isReadOnly
                                                endContent={
                                                    <div dir="rtl">
                                                        <div className="flex items-end">
                                                            <label dir="rtl" for="FromDate" className="text-base ml-5">الاسم : </label>
                                                            <input  dir="rtl" type="text" name="FromDate" id="FromDate" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                                        </div>
                                                    </div>
                                                }
                                            >

                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </DropdownItem>









                            </DropdownMenu>
                }
            </Dropdown>
        </div>
    )
}