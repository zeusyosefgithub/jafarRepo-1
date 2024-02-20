import { addDoc,collection} from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useState,useEffect,useRef} from "react";
import { Input, Spinner } from "@nextui-org/react";

export default function AddDriver() {
    const [loading,setLoading] = useState(false);

    const [showElement, setShowElement] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowElement(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const collec = collection(firestore, "drivers");

    const PreventMultipleClick = useRef();

    const [errorDriverId,setErrorDriverId] = useState("");
    const [errorDriverName,setErrorDriverName] = useState("");
    const [errorArbic,setErrorArbic] = useState('');

    const [driverId,setDriverId] = useState('');
    const [driverName,setDriverName] = useState('');
    const [driverDisc,setDriverDisc] = useState('');
    const [driverNameArbic,setDriverNameArbic] = useState('');

    const handelAddPrint = async() => {
        setLoading(true);
        setErrorDriverId("");
        setErrorDriverName("");
        if(!driverName || driverName.length > 25){
            return setErrorDriverName("اسم السائق اكثر من 25 حرف او لا يوجد لديه قيمة!");

        }
        if(!driverId || driverId.length > 10){
            return setErrorDriverId("رقم السائق اكثر من 10 ارقام او لا يوجد لديه قيمة!");
            
        }
        if(!driverNameArbic || driverNameArbic.length > 25){
            return setErrorArbic("اسم السائق اكثر من 25 حرف او لا يوجد لديه قيمة!");

        }
        setErrorDriverId("");
        setErrorDriverName("");
        PreventMultipleClick.current.disabled = true;
        let newData = {
            driver_id: driverId,
            driver_name: driverName,
            driver_disc: driverDisc,
            arbic: driverNameArbic
        };
        try{
            await addDoc(collec,newData);
        }
        catch (e) {
            console.log(e);
        }
        setDriverId('');
        setDriverName('');
        setDriverDisc('');
        setDriverNameArbic('');
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
                    <Input errorMessage={errorDriverName} value={driverName} onValueChange={(value) => {setDriverName(value)}} type="text" variant="bordered" label="اسم السائق بالعبري" />
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <Input errorMessage={errorDriverId} value={driverId} onValueChange={(value) => {setDriverId(value)}} type="number" variant="bordered" label="رقم السائق" />
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <Input errorMessage={errorArbic} value={driverNameArbic} onValueChange={(value) => {setDriverNameArbic(value)}} type="text" variant="bordered" label="اسم السائق بالعربي" />
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <Input value={driverDisc} onValueChange={(value) => {setDriverDisc(value)}} type="text" variant="bordered" label="ملاحظات اخرى (غير اجباري)" />
                </div>

                <div>
                    {
                        showElement ?
                            <div className="text-ءم text-green-500 text-right">لقد تم اضافة السائق بنجاح!</div>
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