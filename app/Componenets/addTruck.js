import { Input, Spinner } from "@nextui-org/react";
import { firestore } from "../FireBase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRef } from "react";
import { useEffect,useState } from "react";

export default function AddTruck() {
    const [loading,setLoading] = useState(false);

    const [showElement, setShowElement] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowElement(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const PreventMultipleClick = useRef();

    const [errorTruckId,setErrorTruckId] = useState("");
    const [errorTruckDriver,setErrorTruckDriver] = useState("");

    const [truckId,setTruckId] = useState('');
    const [truckDriver,setTruckDriver] = useState('');
    const [truckDisc,setTruckDisc] = useState('');

    const collec = collection(firestore, "trucks");

    const handelAddPrint = async() => {
        setLoading(true);
        setErrorTruckId("");
        setErrorTruckDriver("");
        if(!truckId || truckId.length > 8){
            return setErrorTruckId("رقم الخلاطه اكثر من 8 ارقام او لا يوجد لديه قيمه!");
        }
        if(!truckDriver || truckDriver.length > 25){
            return setErrorTruckDriver("اسم سائق الخلاطه اكثر من 25 حرف او لا يوجد لديه قيمة!");
        }
        setErrorTruckId("");
        setErrorTruckDriver("");
        PreventMultipleClick.current.disabled = true;
        let newData = {
            truckId,
            truckDriver,
            truckDisc
        };

        try{
            await addDoc(collec,newData);
        }
        catch(e){
            console.log(e);
        }
        setTruckId('');
        setTruckDriver('');
        setTruckDisc('');
        setShowElement(true);
        setLoading(false);
    }


    return (
        <div dir="rtl" className="rounded-3xl bg-gray-100 p-10 w-full shadow-2xl">
            {
                loading && <Spinner className="fixed left-1/2 top-1/2 z-50" size="lg" />
            }
            
            <div className="max-w- mx-auto">
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <Input errorMessage={errorTruckId} value={truckId} onValueChange={(value) => {setTruckId(value)}} type="number" variant="bordered" label="رقم الخلاطه"/>
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <Input errorMessage={errorTruckDriver} value={truckDriver} onValueChange={(value) => {setTruckDriver(value)}} type="text" variant="bordered" label="سائق الخلاطه"/>
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <Input value={truckDisc} onValueChange={(value) => {setTruckDisc(value)}} type="text" variant="bordered" label="ملاحظات اخرى (غير اجباري)"/>
                </div>

                <div>
                    {
                        showElement ? 
                        <div className="text-ءم text-green-500 text-right">لقد تم اضافة الخلاطه بنجاح!</div>
                        :
                        null
                    }
                </div>

                <div className="flex justify-around w-full mt-20 p-3 items-center">
                    <button ref={PreventMultipleClick} onClick={handelAddPrint} className="text-white bg-[#334155] hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">اضافة</button>
                </div>
            </div>

        </div>
    )
}