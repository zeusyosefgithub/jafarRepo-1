'use client';

import React, { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { IoIosArrowDown } from "react-icons/io";



export default function SortLists(props) {

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
                        <NewDropdown searchInvoice={(val1, val2,val3) => props.searchInvoice(val1, val2,val3)} setKindSortIn={setKindSortIn} KindDrop={"تصنيف"} />
                    </div>
                    <div className="ml-3">
                        <NewDropdown searchInvoice={(val1, val2,val3) => props.searchInvoice(val1, val2,val3)} KindDrop={"ترتيب"} />
                    </div>
                    <div className="ml-3">
                        <NewDropdown searchInvoice={(val1, val2,val3) => props.searchInvoice(val1, val2,val3)} KindDrop={"فلتر"} />
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

    const [typeSearchInvoice, setTypeSearchInvoice] = useState('one');
    const valueSearchInvoice = useRef(null);
    const valueSearchInvoice2 = useRef(null);

    const valueSearchName = useRef(null);

    const AcoToDay = useRef(null);
    const AcoToMonth = useRef(null);
    const AcoToYear = useRef(null);
    const AcoToFromDate = useRef(null);
    const AcoToToDate = useRef(null);

    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let currentdate = `${day}/${month}/${year}`;

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
                            <DropdownItem><Button className="w-full" onClick={() => props.searchInvoice('nothing')}>بدون</Button></DropdownItem>
                            <DropdownItem><Button className="w-full" onClick={() => props.searchInvoice('day')}>حسب اليوم</Button></DropdownItem>
                            <DropdownItem><Button className="w-full" onClick={() => props.searchInvoice('month')}>حسب الشهر</Button></DropdownItem>
                            <DropdownItem><Button className="w-full" onClick={() => props.searchInvoice('year')}>حسب السنة</Button></DropdownItem>
                        </DropdownMenu>

                        :
                        props.KindDrop === 'ترتيب' ?
                            <DropdownMenu variant="faded" aria-label="Static Actions">

                                <DropdownItem>
                                    <Dropdown className="test-fontt">
                                        <DropdownTrigger>
                                            <Button className="w-full">رقم الفاتورة</Button>
                                        </DropdownTrigger>
                                        <DropdownMenu>
                                            <DropdownItem>
                                                <Button onClick={() => props.searchInvoice("biggestSmall","invoice","sort")} className="w-full">من الاكبر الى الاصغر</Button>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Button onClick={() => props.searchInvoice("SmallBiggest","invoice","sort")} className="w-full">من الاصغر الى الاكبر</Button>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </DropdownItem>

                                <DropdownItem>
                                    <Dropdown className="test-fontt">
                                        <DropdownTrigger>
                                            <Button className="w-full">التاريخ</Button>
                                        </DropdownTrigger>
                                        <DropdownMenu>
                                            <DropdownItem>
                                                <Button onClick={() => props.searchInvoice("biggestSmall","date","sort")} className="w-full">من الاكبر الى الاصغر</Button>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Button onClick={() => props.searchInvoice("SmallBiggest","date","sort")} className="w-full">من الاصغر الى الاكبر</Button>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </DropdownItem>




                                

            
                                <DropdownItem>
                                    <Dropdown className="test-fontt">
                                        <DropdownTrigger>
                                            <Button className="w-full">الاسم</Button>
                                        </DropdownTrigger>
                                        <DropdownMenu>
                                            <DropdownItem>
                                                <Button onClick={() => props.searchInvoice("biggestSmall", "name", "sort")} className="w-full">من أ الى ي</Button>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Button onClick={() => props.searchInvoice("SmallBiggest", "name", "sort")} className="w-full">من ي الى أ</Button>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </DropdownItem>



                                
                            </DropdownMenu>
                            :
                            <DropdownMenu variant="faded" aria-label="Static Actions">




                                <DropdownItem>
                                    <Button onClick={() => props.searchInvoice("nothing", null)} className="w-full">بدون</Button>
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
                                                        <div className="flex mb-4">
                                                            <Button onClick={() => setTypeSearchInvoice('one')} className="ml-4">فاتورة واحدة</Button>
                                                            <Button onClick={() => setTypeSearchInvoice('many')}>اكثر من فاتورة</Button>
                                                        </div>
                                                        {
                                                            typeSearchInvoice == 'one' ?
                                                                <div className="flex items-end">
                                                                    <label dir="rtl" for="numInvo" className="text-base ml-5">رقم محدد : </label>
                                                                    <input ref={valueSearchInvoice} onChange={() => props.searchInvoice(valueSearchInvoice.current.value, null,"fortoinvoice")} dir="rtl" type="number" name="numInvo" id="numInvo" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                                                </div>
                                                                :
                                                                <div className="flex" dir="rtl">
                                                                    <div className="flex items-end">
                                                                        <label dir="rtl" for="numInvo1" className="text-base ml-5">من : </label>
                                                                        <input ref={valueSearchInvoice} onChange={() => props.searchInvoice(valueSearchInvoice.current.value, valueSearchInvoice2.current.value,"fortoinvoice")} dir="rtl" type="number" name="numInvo1" id="numInvo1" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                                                    </div>
                                                                    <div className="flex items-end">
                                                                        <label dir="rtl" for="numInvoTo" className="text-base ml-5">الى : </label>
                                                                        <input ref={valueSearchInvoice2} onChange={() => props.searchInvoice(valueSearchInvoice.current.value, valueSearchInvoice2.current.value,"fortoinvoice")} dir="rtl" type="number" name="numInvoTo" id="numInvoTo" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                                                    </div>
                                                                </div>
                                                        }
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
                                                            <label dir="rtl" for="AcoToDay" className="text-base ml-5">حسب اليوم : </label>
                                                            <input ref={AcoToDay} onChange={() => props.searchInvoice(AcoToDay.current.value,"AcoToDay")}  dir="rtl" type="text" name="AcoToDay" id="AcoToDay" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder={currentdate} required />
                                                        </div>
                                                        <div className="flex items-end">
                                                            <label dir="rtl" for="AcoToMonth" className="text-base ml-5">حسب الشهر : </label>
                                                            <input ref={AcoToMonth} onChange={() => props.searchInvoice(AcoToMonth.current.value,"AcoToMonth")} dir="rtl" type="text" name="AcoToMonth" id="AcoToMonth" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder={`${month}/${year}`} required />
                                                        </div>
                                                        <div className="flex items-end">
                                                            <label dir="rtl" for="AcoToYear" className="text-base ml-5">حسب السنة : </label>
                                                            <input ref={AcoToYear} onChange={() => props.searchInvoice(AcoToYear.current.value,"AcoToYear")} dir="rtl" type="text" name="AcoToYear" id="AcoToYear" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder={year} required />
                                                        </div>
                                                        <div className="flex" dir="rtl">
                                                            <div className="flex items-end">
                                                                <label dir="rtl" for="FromDate" className="text-base ml-5">من : </label>
                                                                <input ref={AcoToFromDate} onChange={() => props.searchInvoice(AcoToFromDate.current.value,AcoToToDate.current.value,"fortodate")} dir="rtl" type="text" name="FromDate" id="FromDate" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"  placeholder="1/1/2024" required />
                                                            </div>
                                                            <div className="flex items-end">
                                                                <label dir="rtl" for="ToDate" className="text-base ml-5">الى : </label>
                                                                <input ref={AcoToToDate} onChange={() => props.searchInvoice(AcoToFromDate.current.value,AcoToToDate.current.value,"fortodate")} dir="rtl" type="text" name="ToDate" id="ToDate" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"  placeholder="31/12/2024" required />
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
                                                            <input ref={valueSearchName} onChange={() => props.searchInvoice(valueSearchName.current.value,"name")} dir="rtl" type="text" name="FromDate" id="FromDate" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
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