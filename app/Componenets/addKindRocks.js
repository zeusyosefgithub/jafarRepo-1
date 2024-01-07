import { useRef,useState,useEffect } from "react"
import { firestore } from "../FireBase/firebase";
import { collection,addDoc } from "firebase/firestore";
import GetTrucks from "./getDocs";

export default function AddKindRocks() {

    const [showElement, setShowElement] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowElement(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const kindsRocksNameRef = useRef();
    const [errorKindName, setErrorKindName] = useState("");
    const AllIKindsCon = GetTrucks("kinds rocks");


    const handelAddPrint = async () => {
        setErrorKindName("");
        if (!kindsRocksNameRef.current.value) {
            setErrorKindName("!لا يوجد قيمة لاسم النوع");
        }
        setErrorKindName("");
        let AllIKind = AllIKindsCon.length + 1;
        let newData = {
            kinds_rocks_id: AllIKind,
            kinds_rocks_name: kindsRocksNameRef.current.value
        }
        try {
            await addDoc(collection(firestore, "kinds rocks"), newData)
        }
        catch (e) {
            console.log(e)
        }
        kindsRocksNameRef.current.value = "";
        setShowElement(true);
    }
    return (
        <div className="rounded-3xl bg-[#f5f5f5] border-2 border-[#334155] p-10">
            <div className="relative z-0 w-full mt-10 mb-10 group">
                <input ref={kindsRocksNameRef} dir="rtl" type="text" name="kindsRocksName" id="kindsRocksName" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="نوع الصرار" required />
                <label dir="rtl" htmlFor="kindsRocksName" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
            </div>

            {
                showElement ?
                    <div className="text-ءم text-green-500 text-right">لقد تم النوع بنجاح!</div>
                    :
                    null
            }
            {
                errorKindName && <div dir="rtl" className="text-[#dc2626] text-base">{errorKindName}</div>
            }

            <div className="flex justify-around w-full mt-20 p-3 items-center">
                <button onClick={handelAddPrint} className="text-white bg-[#334155] hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">اضافة</button>
            </div>
        </div>
    )
}