import { addDoc,collection } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useRef } from "react";

export default function AddConcretePump() {

    const collec = collection(firestore, "concert pumps");

    const pumpIdRef = useRef();
    const pumpDNameRef = useRef();
    const pumpDiscRef = useRef();

    const handelAddPrint = async(e) => {
        e.preventDefault();
        let newData = {
            pump_id: pumpIdRef.current.value,
            pump_d_name: pumpDNameRef.current.value,
            pump_disc: pumpDiscRef.current.value
        };
        try{
            await addDoc(collec,newData);
        }
        catch(e){
            console.log(e);
        }
        resetAll();
    }

    const resetAll = () => {
        pumpIdRef.current.value = "";
        pumpDNameRef.current.value = "";
        pumpDiscRef.current.value = "";
    }


    return (
        <div className="rounded-3xl bg-[#f5f5f5] border-2 border-[#334155] p-10">
            
            <form className="max-w- mx-auto" onSubmit={handelAddPrint}>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <input ref={pumpIdRef} dir="rtl" type="number" name="pumpId" id="pumpId" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="رقم المضخة" required />
                    <label dir="rtl" htmlFor="pumpId" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full"/>
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <input ref={pumpDNameRef} dir="rtl" type="text" name="pumpDName" id="pumpDName" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="اسم سائق المضخة (غير اجباري)"/>
                    <label dir="rtl" htmlFor="pumpDName" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-12 peer-focus:text-2xl text-right w-full"/>
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <input ref={pumpDiscRef} dir="rtl" type="text" name="pumpDisc" id="pumpDisc" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="ملاحظات اخرى (غير اجباري)"/>
                    <label dir="rtl" htmlFor="pumpDisc" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-12 peer-focus:text-2xl text-right w-full"/>
                </div>

                <div className="flex justify-around w-full mt-20 p-3 items-center">
                    <button type="submit" className="text-white bg-[#334155] hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">اضافة</button>
                </div>
            </form>

        </div>
    )
}