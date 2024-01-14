'use client';
import { useRef } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";

export default function Updates() {

    const updatePropsRef = useRef();

    const collec = collection(firestore, "reports");

    const addReport = async() => {
        const report = {
            repo : updatePropsRef.current.value
        }
        try{
            await addDoc(collection(firestore, "reports"), report)
        }
        catch(e){
            console.log(e);
        }
        updatePropsRef.current.value = "";
    }

    return (
        <div className="flex justify-center">
            <div className="w-1/2 bg-gray-300 border-r-8 rounded border-r-[#334155] mt-20 pr-20 p-10">
                <div className="text-2xl flex justify-center mb-11">
                    التحديثات الاخيرة للبرنامج
                </div>
                <div dir="rtl" className="bg-white w-full rounded p-8">
                    <div className="text-xl">بناء خاصية الحذف لطلبيات الفاتورة ...</div>
                    <div className="text-xl">انشاء تصنيف وطباعة للفواتير الفلتر والترتيب قيد التطوير...</div>
                </div>
                <div className="mt-20">
                    <div dir="rtl" className="text-xl mb-5">
                        اذا كان هنالك اي مشكلة واجهتها في البرنامج او تريد اضافة شيئ معين الرجاء كتابت ماهي المشكلة او الاضافة بالضبط
                    </div>
                    <div className="relative z-0 w-full mb-10 bg-white p-5 rounded">
                        <input ref={updatePropsRef} dir="rtl" type="text" name="updateProps" id="updateProps" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="اكتب هنا" required />
                        <label dir="rtl" htmlFor="updateProps" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                    </div>
                    <div className="flex justify-center">
                        <button onClick={addReport} className="px-4 ml-2 py-2 text-black border-2 border-black bg-white hover:text-white hover:bg-black text-2xl font-medium rounded-md">أرسال</button>
                    </div>
                </div>
            </div>
        </div>
    )
}