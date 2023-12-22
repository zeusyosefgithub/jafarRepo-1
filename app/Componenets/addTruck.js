import { firestore } from "../FireBase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRef } from "react";
import { useEffect,useState } from "react";

export default function AddTruck() {

    const [showElement, setShowElement] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowElement(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const truckIdRef = useRef();
    const truckDriverRef = useRef();
    const truckDiscRef = useRef();

    const collec = collection(firestore, "trucks");

    const resetAll = () => {
        truckIdRef.current.value = "";
        truckDriverRef.current.value = "";
        truckDiscRef.current.value = "";
    }

    const handelAddPrint = async(e) => {
        e.preventDefault();

        let newData = {
            truck_id: truckIdRef.current.value,
            truck_driver: truckDriverRef.current.value,
            truck_disc: truckDiscRef.current.value
        };

        try{
            await addDoc(collec,newData);
        }
        catch(e){
            console.log(e);
        }
        resetAll();
        setShowElement(true);
    }


    return (
        <div className="rounded-3xl bg-[#f5f5f5] border-2 border-[#334155] p-10">
            
            <form className="max-w- mx-auto" onSubmit={handelAddPrint}>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <input ref={truckIdRef} dir="rtl" type="number" name="truckId" id="truckId" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="رقم الشاحنة" required />
                    <label dir="rtl" htmlFor="truckId" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full"/>
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <input ref={truckDriverRef} dir="rtl" type="text" name="truckDriver" id="truckDriver" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="سائق الشحانة" required />
                    <label dir="rtl" htmlFor="truckDriver" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-12 peer-focus:text-2xl text-right w-full"/>
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <input ref={truckDiscRef} dir="rtl" type="text" name="truckDisc" id="truckDisc" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="ملاحظات اخرى (غير اجباري)"/>
                    <label dir="rtl" htmlFor="truckDisc" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-12 peer-focus:text-2xl text-right w-full"/>
                </div>

                <div>
                    {
                        showElement ? 
                        <p className="text-ءم text-green-500 text-right">لقد تم اضافة الشاحنة بنجاح!</p>
                        :
                        null
                    }
                </div>

                <div className="flex justify-around w-full mt-20 p-3 items-center">
                    <button type="submit" className="text-white bg-[#334155] hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">اضافة</button>
                </div>
            </form>

        </div>
    )
}