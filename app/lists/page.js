'use client';
import { useState } from "react";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSteering2Line } from "react-icons/ri";
import { FaTruck } from "react-icons/fa";
import { BsPersonFillAdd } from "react-icons/bs";
import AllLists from "../Componenets/allLists";
import rep6 from "../../images/rep6.png";
import Image from "next/image";
import { Listbox, ListboxItem } from "@nextui-org/react";

export default function Lists() {
    const [list, setList] = useState(1);
    const getList = () => {
        if (list == 1) {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">قائمة الفواتير</div>
                <AllLists wichList={"invoices"} />
            </div>
        }
        else if (list == 2) {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">قائمة مضخات الخرسانة</div>
                <AllLists wichList={"concert pumps"} />
            </div>
        }
        else if (list == 3) {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">قائمة السائقين</div>
                <AllLists wichList={"drivers"} />
            </div>
        }
        else if (list == 4) {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">قائمة الخلاطات</div>
                <AllLists wichList={"trucks"} />
            </div>
        }
        else if (list == 6) {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">قائمة انواع البطون</div>
                <AllLists wichList={"kinds concrete"} />
            </div>
        }
        else if (list == 7) {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">قائمة انواع الصرار</div>
                <AllLists wichList={"kinds rocks"} />
            </div>
        }
        else if (list == 8) {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">قائمة الطلبيات</div>
                <AllLists wichList={"shipping"} />
            </div>
        }
        else {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">قائمة الزبائن</div>
                <AllLists wichList={"customers"} />
            </div>
        }
    }

    return (



        <div dir="rtl">
            <div className="flex">
                <div className="w-fit">
                    <div className="top-40 sticky w-auto">
                        <div className="pr-12 pl-12 pb-12">
                            <Listbox
                                className=""
                                aria-label="Actions"
                                onAction={(key) => { setList(key) }}
                            >
                                <ListboxItem className={`shadow-xl m-2`} key={1}><div className="m-2 text-xl flex items-center"><FaFileInvoiceDollar className="text-2xl ml-3" />قائمة الفواتير</div></ListboxItem>
                                <ListboxItem className={`shadow-xl m-2`} key={8}><div className="m-2 text-xl flex items-center"><BsPersonFillAdd className="text-2xl ml-3" />قائمة الطلبيات</div></ListboxItem>
                                <ListboxItem className={`shadow-xl m-2`} key={2}><div className="m-2 text-xl flex items-center"><TbTruckDelivery className="text-2xl ml-3" />قائمة مضخات الخرسانة</div></ListboxItem>
                                <ListboxItem className={`shadow-xl m-2`} key={3}><div className="m-2 text-xl flex items-center"><RiSteering2Line className="text-2xl ml-3" />قائمة السائقين</div></ListboxItem>
                                <ListboxItem className={`shadow-xl m-2`} key={4}><div className="m-2 text-xl flex items-center"><FaTruck className="text-2xl ml-3" />قائمة الخلاطات</div></ListboxItem>
                                <ListboxItem className={`shadow-xl m-2`} key={5}><div className="m-2 text-xl flex items-center"><BsPersonFillAdd className="text-2xl ml-3" />قائمة الزبائن</div></ListboxItem>
                                <ListboxItem className={`shadow-xl m-2`} key={6}><div className="m-2 text-xl flex items-center"><BsPersonFillAdd className="text-2xl ml-3" />قائمة انواع البطون</div></ListboxItem>
                                <ListboxItem className={`shadow-xl m-2`} key={7}><div className="m-2 text-xl flex items-center"><BsPersonFillAdd className="text-2xl ml-3" />قائمة انواع الصرار</div></ListboxItem>

                            </Listbox>
                            <Image
                                src={rep6}
                                width={500}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex justify-center">
                        <div className="w-full ml-20 mr-10" dir="ltr">
                            {
                                getList()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}