import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useRef, useState, useEffect } from "react";
import { Input, Spinner } from "@nextui-org/react";

export default function AddConcretePump() {

    const [loading,setLoading] = useState(false);

    const [showElement, setShowElement] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowElement(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const PreventMultipleClick = useRef();

    const collec = collection(firestore, "concert pumps");
    const [errorPumpId, setErrorPumpId] = useState("");
    const [pumpId,setPumpId] = useState('');
    const [pumpDNam,setPumpDNam] = useState('');
    const [pumpDisc,setPumpDisc] = useState('');

    const handelAddPrint = async () => {
        setLoading(true);
        setErrorPumpId("");
        if (!pumpId || pumpId.length > 8) {
            setErrorPumpId("!رقم المضخة اكثر من 8 ارقام او لا يوجد لديه قيمة");
        }
        setErrorPumpId("");
        PreventMultipleClick.current.disabled = true;
        let newData = {
            pump_id: pumpId,
            pump_d_name: pumpDNam,
            pump_disc: pumpDisc
        };
        try {
            await addDoc(collec, newData);
        }
        catch (e) {
            console.log(e);
        }
        setPumpId('');
        setPumpDNam('');
        setPumpDisc('');
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
                    <Input errorMessage={errorPumpId} type="number" variant="bordered" value={pumpId} onValueChange={(value) => {setPumpId(value)}} label="رقم المضخة"/>
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <Input type="text" variant="bordered" value={pumpDNam} onValueChange={(value) => {setPumpDNam(value)}} label="اسم سائق المضخة (غير اجباري)"/>
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <Input type="text" variant="bordered" value={pumpDisc} onValueChange={(value) => {setPumpDisc(value)}} label="ملاحظات اخرى (غير اجباري)"/>
                </div>

                {
                    showElement ?
                        <div className="text-ءم text-green-500 text-right">لقد تم اضافة المضخة بنجاح!</div>
                        :
                        null
                }

                <div className="flex justify-around w-full mt-20 p-3 items-center">
                    <button ref={PreventMultipleClick} onClick={handelAddPrint} className="text-white bg-[#334155] hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">اضافة</button>
                </div>
            </div>

        </div>
    )
}