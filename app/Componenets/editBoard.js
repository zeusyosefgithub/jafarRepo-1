'use client';
import { deleteDoc, doc, updateDoc ,getDoc} from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./loadingSpin";
import { FaEdit } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./toPrint";
import GetDocum from "./getDocum";


export default function EditBoard(props) {

    const componentRef = useRef();

    const [type,setType] = useState();
    const [chooise,setChooise] = useState("رقم الزبون");
    const [choVal,setChoVal] = useState(props.data.invoices_customer_id);
    const inputRef = useRef();

    const [invoValueProp,setInvoValueProp] = useState({...props.data})
    const docInvo = GetDocum(props.data.id);


    const [loading, setLoading] = useState(false);


    const deleteInvo = async () => {
        setLoading(true);
        try {
            await deleteDoc(doc(firestore, "invoices", props.data.id));
        }
        catch (e) {
            console.log(e);
        }
        props.showInv();
        setLoading(false);
    }

    useEffect(() => {
        setInvoValueProp(props.data)
    },[props.data,choVal])

    const editInvo = async () => {
        const newData = {
            invoices_id: invoValueProp.invoices_id,
            invoices_customer_id: chooise == "رقم الزبون" ? inputRef.current.value : invoValueProp.invoices_customer_id,
            invoices_customer_name: chooise == "اسم الزبون" ? inputRef.current.value : invoValueProp.invoices_customer_name,
            invoices_customer_street: chooise == "الشارع" ? inputRef.current.value : invoValueProp.invoices_customer_street,
            invoices_customer_city: chooise == "العنوان" ? inputRef.current.value : invoValueProp.invoices_customer_city,
            invoices_quantity: chooise == "الكمية" ? inputRef.current.value : invoValueProp.invoices_quantity,
            invoices_concretd_grade: chooise == "درجة الثقة" ? inputRef.current.value : invoValueProp.invoices_concretd_grade,
            invoices_kind_material: chooise == "نوع المادة" ? inputRef.current.value : invoValueProp.invoices_kind_material,
            invoices_kind_type_of_concrete: chooise == "نوع الخرسانة" ? inputRef.current.value : invoValueProp.invoices_kind_type_of_concrete,
            invoices_kind_egree_of_Exposure: chooise == "درجة التعرض" ? inputRef.current.value : invoValueProp.invoices_kind_egree_of_Exposure,
            invoices_truck: chooise == "الشاحنة" ? inputRef.current.value : invoValueProp.invoices_truck,
            invoices_driver: chooise == "السائق" ? inputRef.current.value : invoValueProp.invoices_driver,
            invoices_pump: chooise == "المضخة" ? inputRef.current.value : invoValueProp.invoices_pump
        }
        const invId = doc(firestore, "invoices", props.data.id)
        setLoading(true);
        try {
            await updateDoc(invId,newData);
        }
        catch (e) {
            console.log(e);
        }   
        setLoading(false);
        //props.showInv();
    }

    const handleAddPrint = async() => {
        const newData = {
            invoices_id: invoValueProp.invoices_id,
            invoices_customer_id: invoValueProp.invoices_customer_id,
            invoices_customer_name: invoValueProp.invoices_customer_name,
            invoices_customer_street: invoValueProp.invoices_customer_street,
            invoices_customer_city: invoValueProp.invoices_customer_city,
            invoices_quantity: invoValueProp.invoices_quantity,
            invoices_concretd_grade: invoValueProp.invoices_concretd_grade,
            invoices_kind_material: invoValueProp.invoices_kind_material,
            invoices_kind_type_of_concrete: invoValueProp.invoices_kind_type_of_concrete,
            invoices_kind_egree_of_Exposure: invoValueProp.invoices_kind_egree_of_Exposure,
            invoices_truck: invoValueProp.invoices_truck,
            invoices_driver: invoValueProp.invoices_driver,
            invoices_pump: invoValueProp.invoices_pump,
            invoices_stil: invoValueProp.invoices_stil > 7 ? invoValueProp.invoices_stil -= 8 : invoValueProp.invoices_stil > 0 ? invoValueProp.invoices_stil - invoValueProp.invoices_stil : invoValueProp.invoices_stil,
            invoices_taked: invoValueProp.invoices_quantity - invoValueProp.invoices_stil
        }
        const invId = doc(firestore, "invoices", props.data.id)
        setLoading(true);
        try {
            await updateDoc(invId,newData);
        }
        catch (e) {
            console.log(e);
        }   
        setLoading(false);
        handlePrint();
    }
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    /// zea = motbke > 8 ? 8 : motbke
    /// quan = 24
    /// tzwed = motbke > 8 ? tzwed + 8 : tzwed + motbke
    /// motbke = quan - tzwed 

    return (
        <>
            {loading && <LoadingSpinner />}
            <div className="w-full md:w-1/2 mx-auto fixed z-10 top-28 right-0 left-0 border-2 border-[#334155] rounded-xl">
                <div className="flex flex-col p-5 rounded-lg shadow bg-[#f5f5f5]">
                    <div className="flex flex-col items-center text-center">
                        <h2 className="mt-2 font-semibold text-black text-xl">قائمة الشاحنات</h2>
                        <p className="mt-2 text-sm text-black leading-relaxed w-full text-right text-xl">اختر شاحنة من القائمة لديك</p>
                    </div>
                    <div className="m-1 p-5 bg-white rounded-xl overflow-scroll highting_edit_Board">
                        <table className="w-full text-center">
                            <tbody>
                                <tr className="border-2 border-[#334155]">
                                    <th><p className="text-xl">السائق</p></th>
                                    <th><p className="text-xl">المضخة</p></th>
                                    <th><p className="text-xl">الشاحنة</p></th>
                                    <th><p className="text-xl">العنوان</p></th>
                                    <th><p className="text-xl">الشارع</p></th>
                                    <th><p className="text-xl">اسم الزبون</p></th>
                                    <th><p className="text-xl">رقم الزبون</p></th>
                                </tr>
                                <tr className="">
                                    <th className="lins_edit_board" onClick={() => {setChooise("السائق"); setChoVal(invoValueProp.invoices_driver);setType("text")}}><p className="text-lg pt-2 pb-2">{docInvo.invoices_driver}</p><FaEdit className="m-auto text-xl"/></th>
                                    <th className="lins_edit_board" onClick={() => {setChooise("المضخة"); setChoVal(invoValueProp.invoices_pump);setType("number")}}><p className="text-lg pt-2 pb-2">{docInvo.invoices_pump}</p><FaEdit className="m-auto text-xl"/></th>
                                    <th className="lins_edit_board" onClick={() => {setChooise("الشاحنة"); setChoVal(invoValueProp.invoices_truck);setType("number")}}><p className="text-lg pt-2 pb-2">{docInvo.invoices_truck}</p><FaEdit className="m-auto text-xl"/></th>
                                    <th className="lins_edit_board" onClick={() => {setChooise("العنوان"); setChoVal(invoValueProp.invoices_customer_city);setType("text")}}><p className="text-lg pt-2 pb-2">{docInvo.invoices_customer_city}</p><FaEdit className="m-auto text-xl"/></th>
                                    <th className="lins_edit_board" onClick={() => {setChooise("الشارع"); setChoVal(invoValueProp.invoices_customer_street);setType("text")}}><p className="text-lg pt-2 pb-2">{docInvo.invoices_customer_street}</p><FaEdit className="m-auto text-xl"/></th>
                                    <th className="lins_edit_board" onClick={() => {setChooise("اسم الزبون"); setChoVal(invoValueProp.invoices_customer_name);setType("text")}}><p className="text-lg pt-2 pb-2">{docInvo.invoices_customer_name}</p><FaEdit className="m-auto text-xl"/></th>
                                    <th className="lins_edit_board" onClick={() => {setChooise("رقم الزبون"); setChoVal(invoValueProp.invoices_customer_id);setType("number")}}><p className="text-lg pt-2 pb-2">{docInvo.invoices_customer_id}</p><FaEdit className="m-auto text-xl"/></th>
                                </tr>
                                <tr className="border-2 border-[#334155]">
                                    <th><p className="text-xl">تم التزويد</p></th>
                                    <th><p className="text-xl">درجة الثقة</p></th>
                                    <th><p className="text-xl">درجة التعرض</p></th>
                                    <th><p className="text-xl">نوع الخرسانة</p></th>
                                    <th><p className="text-xl">نوع المادة</p></th>
                                    <th><p className="text-xl">المادة</p></th>
                                    <th><p className="text-xl">الكمية</p></th>
                                </tr>
                                <tr>
                                    <th className="lins_edit_board" onClick={() => { setChooise("تم التزويد"); setChoVal(invoValueProp.invoices_kind_supplier_number); setType("number") }}><p className="text-lg pt-2 pb-2">{docInvo.invoices_kind_supplier_number}</p><FaEdit className="m-auto text-xl" /></th>
                                    <th className="lins_edit_board" onClick={() => { setChooise("درجة الثقة"); setChoVal(invoValueProp.invoices_concretd_grade); setType("number") }}><p className="text-lg pt-2 pb-2">{docInvo.invoices_concretd_grade}</p><FaEdit className="m-auto text-xl" /></th>
                                    <th className="lins_edit_board" onClick={() => { setChooise("درجة التعرض"); setChoVal(invoValueProp.invoices_kind_egree_of_Exposure); setType("number") }}><p className="text-lg pt-2 pb-2">{docInvo.invoices_kind_egree_of_Exposure}</p><FaEdit className="m-auto text-xl" /></th>
                                    <th className="lins_edit_board" onClick={() => { setChooise("نوع الخرسانة"); setChoVal(invoValueProp.invoices_kind_type_of_concrete); setType("text") }}><p className="text-lg pt-2 pb-2">{docInvo.invoices_kind_type_of_concrete}</p><FaEdit className="m-auto text-xl" /></th>
                                    <th className="lins_edit_board" onClick={() => { setChooise("نوع المادة"); setChoVal(invoValueProp.invoices_kind_material); setType("text") }}><p className="text-lg pt-2 pb-2">{docInvo.invoices_kind_material}</p><FaEdit className="m-auto text-xl" /></th>
                                    <th className="lins_edit_board" onClick={() => { setChooise("المادة"); setChoVal(invoValueProp.invoices_material); setType("text") }}><p className="text-lg pt-2 pb-2">{docInvo.invoices_material}</p><FaEdit className="m-auto text-xl" /></th>
                                    <th className="lins_edit_board" onClick={() => { setChooise("الكمية"); setChoVal(invoValueProp.invoices_quantity); setType("number") }}><p className="text-lg pt-2 pb-2">{docInvo.invoices_quantity}</p><FaEdit className="m-auto text-xl" /></th>
                                </tr>
                            </tbody>
                        </table>
                        <div className="bg-[#334155] h-1 mt-10 mb-10"></div>
                        <div>
                            <p dir="rtl" className="mb-2 text-xl">تم اختيار تعديل : {chooise}</p>
                            <div className="flex justify-between items-center">
                                <div className="m-auto mr-20">
                                    <button onClick={editInvo} className="px-4 ml-2 py-2 text-black border-2 border-black bg-white hover:text-white hover:bg-black text-2xl font-medium rounded-md">
                                        تعديل
                                    </button>
                                </div>
                                <div className="w-full">
                                    <input onChange={(e) => setChoVal(e.target.value)} value={choVal} ref={inputRef} dir="rtl" type={type} className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder={chooise} required />
                                </div>

                            </div>
                        </div>
                        <div className="bg-[#334155] h-1 mt-10 mb-10"></div>
                        <div className="w-9/12 m-auto">
                            <ComponentToPrint inewInv={props.data} languge={false} ref={componentRef} />
                        </div>
                        <div className="bg-[#334155] h-1 mt-10 mb-10"></div>
                        <div className="flex justify-center mt-5 mb-5">
                            <button onClick={handleAddPrint} className="px-4 ml-2 py-2 text-black border-2 border-black bg-white hover:text-white hover:bg-black text-2xl font-medium rounded-md">
                                {props.setButtonName ? props.setButtonName : "طباعة"}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center mt-3">
                        <button onClick={deleteInvo} className="flex-1 px-4 mr-2 py-2 bg-[#334155] hover:bg-[#b91c1c] text-white text-2xl font-medium rounded-md">
                            حذف الفتورة
                        </button>
                        <button onClick={() => props.showInv()} className="flex-1 px-4 ml-2 py-2 bg-[#334155] hover:bg-yellow-600 text-white text-2xl font-medium rounded-md">
                            خروج
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}