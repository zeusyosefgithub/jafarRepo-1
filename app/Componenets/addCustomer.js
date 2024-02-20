import { addDoc,collection} from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useState,useEffect,useRef} from "react";
import GetTrucks from "./getDocs";
import { Input, Spinner } from "@nextui-org/react";

export default function AddCustomer() {


    const [loading,setLoading] = useState(false);

    const [showElement, setShowElement] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowElement(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const collec = collection(firestore, "customers");
    const AllCustomers = GetTrucks('customers');

    const [customerId,setCustomerId] = useState('');
    const [customerName,setCustomerName] = useState('');
    const [customerCity,setCustomerCity] = useState('');
    const [customerStreet,setCustomerStreet] = useState('');

    const [errorEqual,setErrorEqual] = useState('');
    const [errorCusName,setErrorCusName] = useState("");
    const [errorCusCity,setErrorCusCity] = useState("");
    const [errorCusId,setErrorCusId] = useState("");
    const [errorCusStreet,setErrorCusStreet] = useState("");
    const PreventMultipleClick = useRef();

    const checkIfIsEqualCustomer = (phone, name) => {
        for (let index = 0; index < AllCustomers?.length; index++) {
            if (phone == AllCustomers[index]?.customer_id || name == AllCustomers[index]?.customer_name) {
                return true;
            }
        }
        return false;
    }

    const handelAddPrint = async() => {
        setLoading(true);
        setErrorCusId("");
        setErrorCusName("");
        setErrorCusCity("");
        setErrorCusStreet("");
        setErrorEqual('');
        if(!customerName || customerName.length > 25){
            return setErrorCusName("اسم الزبون اكثر من 25 حرف او ليس لديه قيمة!");
        }
        if(!customerId || customerId.length > 10){
            return setErrorCusId("رقم الزبون اكثر من 10 ارقام او ليس لديه قيمة!");
        }
        if(!customerCity || customerCity.length > 10){
            return setErrorCusCity("اسم البلد اكثر من 10 حرف او ليس لديه قيمة!");
        }
        if(!customerStreet || customerStreet.length > 10){
            return setErrorCusStreet("اسم الشارع اكثر من 10 حرف او ليس لديه قيمة!");
        }
        if(checkIfIsEqualCustomer(customerId,customerName)){
            setErrorEqual('الزبون موجود بالفعل قم بتغيير البيانات!');
        }
        setErrorCusId("");
        setErrorCusName("");
        setErrorCusCity("");
        setErrorCusStreet("");
        setErrorEqual('');
        PreventMultipleClick.current.disabled = true;
        let newData = {
            customer_id: customerId,
            customer_name: customerName,
            customer_city: customerCity,
            customer_street: customerStreet
        };
        try{
            await addDoc(collec,newData);
        }
        catch(e){
            console.log(e);
        }
        setCustomerId('');
        setCustomerName('');
        setCustomerCity('');
        setCustomerStreet('');
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
                    <Input errorMessage={errorCusName} value={customerName} onValueChange={(value) => {setCustomerName(value)}} type="text" variant="bordered" label="اسم الزبون" />
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <Input errorMessage={errorCusId} value={customerId} onValueChange={(value) => {setCustomerId(value)}} type="number" variant="bordered" label="رقم الزبون" />
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <Input errorMessage={errorCusCity} value={customerCity} onValueChange={(value) => {setCustomerCity(value)}} type="text" variant="bordered" label="البلد" />
                </div>
                <div className="relative z-0 w-full mt-10 mb-10 group">
                    <Input errorMessage={errorCusStreet} value={customerStreet} onValueChange={(value) => {setCustomerStreet(value)}} type="text" variant="bordered" label="الشارع (غير اجباري)" />
                </div>

                <div>
                    {
                        showElement ? 
                        <div className="text-ءم text-green-500 text-right">لقد تم اضافة الزبون بنجاح!</div>
                        :
                        null
                    }
                    {
                        errorEqual && <div dir="rtl" className="text-[#dc2626] text-base">{errorEqual}</div>
                    }
                </div>

                <div className="flex justify-around w-full mt-20 p-3 items-center">
                    <button ref={PreventMultipleClick} onClick={handelAddPrint} className="text-white bg-[#334155] hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">اضافة</button>
                </div>
            </div>

        </div>
    )
}