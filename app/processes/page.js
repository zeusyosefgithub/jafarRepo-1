'use client';
import { GrUserWorker } from "react-icons/gr";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { BsPersonFillAdd } from "react-icons/bs";
import AddInvoice from "../Componenets/addInvoice";
import { useRef, useState } from "react";
import { RiSteering2Line } from "react-icons/ri";
import AddCustomer from "../Componenets/addCustomer";
import AddConcretePump from "../Componenets/addConcretePump";
import AddDriver from "../Componenets/addDriver";
import { TbTruckDelivery } from "react-icons/tb";
import AddTruck from "../Componenets/addTruck";
import { GiConcreteBag } from "react-icons/gi";
import AddKindConcrete from "../Componenets/addKindConcrete";
import AddKindRocks from "../Componenets/addKindRocks";
import rep6 from "../../images/rep6.png";
import Image from "next/image";
import { Listbox, ListboxItem } from "@nextui-org/react";



export default function Processes() {
    const [process, setProcess] = useState(1)

    const getProcess = () => {
        if (process == 1) {
            return <AddInvoice />
        }
        else if (process == 2) {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">(משאבה) اضافة مضخة خرسانة</div>
                <AddConcretePump />
            </div>
        }
        else if (process == 3) {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">اضافة خلاطه</div>
                <AddTruck />
            </div>
        }
        else if (process == 5) {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">اضافة سائق</div>
                <AddDriver />
            </div>
        }
        else if (process == 6) {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">اضافة نوع البطون</div>
                <AddKindConcrete />
            </div>
        }
        else if (process == 7) {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">اضافة نوع الصرار</div>
                <AddKindRocks />
            </div>
        }
        else {
            return <div>
                <div className="text-4xl flex justify-center mb-10 pb-3">اضافة زبون</div>
                <AddCustomer />
            </div>
        }
    }

    return (
        <div dir="rtl">
            <div className="flex">
                <div className="w-fit">
                    <div className="top-40 sticky w-auto">
                        <div className="p-12">
                            <Listbox
                                className=""
                                aria-label="Actions"
                                onAction={(key) => {setProcess(key)}}
                            >
                                <ListboxItem className={`shadow-xl m-3`} key={1}><div className="m-3 text-xl flex items-center"><FaFileInvoiceDollar className="text-2xl ml-3" />انشاء فاتورة</div></ListboxItem>
                                <ListboxItem className={`shadow-xl m-3`} key={2}><div className="m-3 text-xl flex items-center"><TbTruckDelivery className="text-2xl ml-3" />اضافة مضخة خرسانة</div></ListboxItem>
                                <ListboxItem className={`shadow-xl m-3`} key={5}><div className="m-3 text-xl flex items-center"><RiSteering2Line className="text-2xl ml-3" />اضافة سائق</div></ListboxItem>
                                <ListboxItem className={`shadow-xl m-3`} key={3}><div className="m-3 text-xl flex items-center"><FaTruck className="text-2xl ml-3" />اضافة خلاطه</div></ListboxItem>
                                <ListboxItem className={`shadow-xl m-3`} key={4}><div className="m-3 text-xl flex items-center"><BsPersonFillAdd className="text-2xl ml-3" />اضافة زبون</div></ListboxItem>
                                <ListboxItem className="hidden" key={6}><div className="m-3 text-xl flex items-center"><GiConcreteBag className="text-2xl ml-3" />اضافة نوع البطون</div></ListboxItem>
                                <ListboxItem className="hidden" key={7}><div className="m-3 text-xl flex items-center"><GiConcreteBag className="text-2xl ml-3" />اضافة نوع الصرار</div></ListboxItem>

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
                        <div className="mt-20 w-1/2" dir="ltr">
                            {
                                getProcess()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}