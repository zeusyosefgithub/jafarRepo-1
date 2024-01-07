'use client';
import { GrUserWorker } from "react-icons/gr";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { BsPersonFillAdd } from "react-icons/bs";
import AddInvoice from "../Componenets/addInvoice";
import { useState } from "react";
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



export default function Processes (){
    const [process,setProcess] = useState(1)

    const getProcess = () => {
        if(process == 1){
            return <AddInvoice/>
        }
        else if(process == 2){
            return <div>
                <div className="text-4xl flex justify-center border-b-2 border-black mb-10 pb-3">(משאבה) اضافة مضخة خرسانة</div>
                <AddConcretePump/>
            </div>
        }
        else if(process == 3){
            return <div>
                <div className="text-4xl flex justify-center border-b-2 border-black mb-10 pb-3">اضافة خلاطه</div>
                <AddTruck/>
            </div>
        }
        else if(process == 5){
            return <div>
                <div className="text-4xl flex justify-center border-b-2 border-black mb-10 pb-3">اضافة سائق</div>
                <AddDriver/>
            </div>
        }
        else if(process == 6){
            return <div>
                <div className="text-4xl flex justify-center border-b-2 border-black mb-10 pb-3">اضافة نوع البطون</div>
                <AddKindConcrete/>
            </div>
        }
        else if(process == 7){
            return <div>
                <div className="text-4xl flex justify-center border-b-2 border-black mb-10 pb-3">اضافة نوع الصرار</div>
                <AddKindRocks/>
            </div>
        }
        else{
            return <div>
                <div className="text-4xl flex justify-center border-b-2 border-black mb-10 pb-3">اضافة زبون</div>
                <AddCustomer />
            </div>
        }
    }

    return (
        <div>
            <div className="flex justify-around mb-20 test-fontt">
                <div className="items-center w-2/4 ">
                    <div className="w-full taxt-center">
                        {
                            getProcess()
                        }
                    </div>
                </div>
                <div className="w-1/4 bg-[#f5f5f5] rounded-3xl border-2 border-[#334155]">
                    <div className="flex flex-col m-auto">
                        <button onClick={() => setProcess(1)} className="focus:border-black m-5 flex justify-between border-b-4 border-black-0 hoverButoon"><FaFileInvoiceDollar className="text-3xl mt-auto mb-auto" /><div className="m-2 text-2xl">انشاء فاتورة</div></button>
                        <button onClick={() => setProcess(2)} className="focus:border-black m-5 flex justify-between border-b-4 border-black-0 hoverButoon"><TbTruckDelivery className="text-3xl mt-auto mb-auto" /><div className="m-2 text-2xl">اضافة مضخة خرسانة</div></button>
                        <button onClick={() => setProcess(5)} className="focus:border-black m-5 flex justify-between border-b-4 border-black-0 hoverButoon"><RiSteering2Line className="text-3xl mt-auto mb-auto" /><div className="m-2 text-2xl">اضافة سائق</div></button>
                        <button onClick={() => setProcess(3)} className="focus:border-black m-5 flex justify-between border-b-4 border-black-0 hoverButoon"><FaTruck className="text-3xl mt-auto mb-auto" /><div className="m-2 text-2xl">اضافة خلاطه</div></button>
                        <button onClick={() => setProcess(4)} className="focus:border-black m-5 flex justify-between border-b-4 border-black-0 hoverButoon"><BsPersonFillAdd className="text-3xl mt-auto mb-auto" /><div className="m-2 text-2xl">اضافة زبون</div></button>
                        <button onClick={() => setProcess(6)} className="focus:border-black m-5 flex justify-between border-b-4 border-black-0 hoverButoon"><GiConcreteBag className="text-3xl mt-auto mb-auto" /><div className="m-2 text-2xl">اضافة نوع البطون</div></button>
                        <button onClick={() => setProcess(7)} className="focus:border-black m-5 flex justify-between border-b-4 border-black-0 hoverButoon"><GiConcreteBag className="text-3xl mt-auto mb-auto" /><div className="m-2 text-2xl">اضافة نوع الصرار</div></button>

                    </div>
                    <div className="flex justify-center ">
                        <Image
                            className="opacity-30"
                            src={rep6}
                            width={500}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}