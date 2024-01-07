import { useEffect, useRef, useState } from "react"
import GetTrucks from "./getDocs";
import EditBoard from "./editBoard";



export default function SearchInvoice(props) {

    const degreeOfExposureRef = useRef();
    const AllInvo = GetTrucks("invoices");
    const [showInvoEdit, setShowInvoEdit] = useState(false);
    const [invData, setInvData] = useState({});
    const [get, setGet] = useState([]);

    const [resRadio, setResRadio] = useState("رقم الفتورة");

    function checkSearchValue() {
        let SearchOutPut = [];
        if (degreeOfExposureRef.current?.value) {
            if (resRadio === "رقم الفتورة") {
                for (let index = 0; index < AllInvo.length; index++) {
                    if (degreeOfExposureRef.current?.value == AllInvo[index]?.invoices_id) {
                        SearchOutPut.push(
                            <tr onClick={() => { setShowInvoEdit(true); setInvData(AllInvo[index]) }} className="styling_lines_lists bordering_list1">
                                <th className="text-base">{AllInvo[index]?.invoices_concretd_grade}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_egree_of_Exposure}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_material}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_type_of_concrete}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_pump}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_customer_name}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_data}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_quantity}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_id}</th>
                                {statusinvoice(AllInvo[index])}
                            </tr>
                        )
                    }
                }
            }
            else if (resRadio === "اجمالي الطلب") {
                for (let index = 0; index < AllInvo.length; index++) {
                    if (degreeOfExposureRef.current?.value == AllInvo[index]?.invoices_quantity) {
                        SearchOutPut.push(
                            <tr onClick={() => { setShowInvoEdit(true); setInvData(AllInvo[index]) }} className="styling_lines_lists bordering_list1">
                                <th className="text-base">{AllInvo[index]?.invoices_concretd_grade}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_egree_of_Exposure}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_material}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_type_of_concrete}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_pump}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_customer_name}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_data}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_quantity}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_id}</th>
                                {statusinvoice(AllInvo[index])}
                            </tr>
                        )
                    }
                }
            }
            else if (resRadio === "تاريخ الفاتورة") {
                for (let index = 0; index < AllInvo.length; index++) {
                    if (degreeOfExposureRef.current?.value == AllInvo[index]?.invoices_data) {
                        SearchOutPut.push(
                            <tr onClick={() => { setShowInvoEdit(true); setInvData(AllInvo[index]) }} className="styling_lines_lists bordering_list1">
                                <th className="text-base">{AllInvo[index]?.invoices_concretd_grade}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_egree_of_Exposure}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_material}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_type_of_concrete}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_pump}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_customer_name}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_data}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_quantity}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_id}</th>
                                {statusinvoice(AllInvo[index])}
                            </tr>
                        )
                    }
                }
            }
            else if (resRadio === "الاسم") {
                for (let index = 0; index < AllInvo.length; index++) {
                    if (degreeOfExposureRef.current?.value == AllInvo[index]?.invoices_customer_name) {
                        SearchOutPut.push(
                            <tr onClick={() => { setShowInvoEdit(true); setInvData(AllInvo[index]) }} className="styling_lines_lists bordering_list1">
                                <th className="text-base">{AllInvo[index]?.invoices_concretd_grade}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_egree_of_Exposure}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_material}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_type_of_concrete}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_pump}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_customer_name}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_data}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_quantity}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_id}</th>
                                {statusinvoice(AllInvo[index])}
                            </tr>
                        )
                    }
                }
            }
            else if (resRadio === "المضخة") {
                for (let index = 0; index < AllInvo.length; index++) {
                    if (degreeOfExposureRef.current?.value == AllInvo[index]?.invoices_pump) {
                        SearchOutPut.push(
                            <tr onClick={() => { setShowInvoEdit(true); setInvData(AllInvo[index]) }} className="styling_lines_lists bordering_list1">
                                <th className="text-base">{AllInvo[index]?.invoices_concretd_grade}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_egree_of_Exposure}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_material}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_type_of_concrete}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_pump}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_customer_name}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_data}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_quantity}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_id}</th>
                                {statusinvoice(AllInvo[index])}
                            </tr>
                        )
                    }
                }
            }
            else if (resRadio === "نوع الصرار") {
                for (let index = 0; index < AllInvo.length; index++) {
                    if (degreeOfExposureRef.current?.value == AllInvo[index]?.invoices_kind_material) {
                        SearchOutPut.push(
                            <tr onClick={() => { setShowInvoEdit(true); setInvData(AllInvo[index]) }} className="styling_lines_lists bordering_list1">
                                <th className="text-base">{AllInvo[index]?.invoices_concretd_grade}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_egree_of_Exposure}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_material}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_type_of_concrete}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_pump}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_customer_name}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_data}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_quantity}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_id}</th>
                                {statusinvoice(AllInvo[index])}
                            </tr>
                        )
                    }
                }
            }
            else if (resRadio === "نوع البطون") {
                for (let index = 0; index < AllInvo.length; index++) {
                    if (degreeOfExposureRef.current?.value == AllInvo[index]?.invoices_kind_type_of_concrete) {
                        SearchOutPut.push(
                            <tr onClick={() => { setShowInvoEdit(true); setInvData(AllInvo[index]) }} className="styling_lines_lists bordering_list1">
                                <th className="text-base">{AllInvo[index]?.invoices_concretd_grade}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_egree_of_Exposure}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_material}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_type_of_concrete}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_pump}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_customer_name}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_data}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_quantity}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_id}</th>
                                {statusinvoice(AllInvo[index])}
                            </tr>
                        )
                    }
                }
            }
            else if (resRadio === "ضغط البطون") {
                for (let index = 0; index < AllInvo.length; index++) {
                    if (degreeOfExposureRef.current?.value == AllInvo[index]?.invoices_kind_egree_of_Exposure) {
                        SearchOutPut.push(
                            <tr onClick={() => { setShowInvoEdit(true); setInvData(AllInvo[index]) }} className="styling_lines_lists bordering_list1">
                                <th className="text-base">{AllInvo[index]?.invoices_concretd_grade}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_egree_of_Exposure}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_material}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_type_of_concrete}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_pump}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_customer_name}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_data}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_quantity}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_id}</th>
                                {statusinvoice(AllInvo[index])}
                            </tr>
                        )
                    }
                }
            }
            else {
                for (let index = 0; index < AllInvo.length; index++) {
                    if (degreeOfExposureRef.current?.value == AllInvo[index]?.invoices_concretd_grade) {
                        SearchOutPut.push(
                            <tr onClick={() => { setShowInvoEdit(true); setInvData(AllInvo[index]) }} className="styling_lines_lists bordering_list1">
                                <th className="text-base">{AllInvo[index]?.invoices_concretd_grade}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_egree_of_Exposure}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_material}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_kind_type_of_concrete}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_pump}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_customer_name}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_data}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_quantity}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_id}</th>
                                <th className="text-base">{AllInvo[index]?.invoices_id}</th>
                                {statusinvoice(AllInvo[index])}
                            </tr>
                        )
                    }
                }
            }
            setGet(SearchOutPut);
        }
        else {
            setGet(null);
        }
    }

    const statusinvoice = (invo) => {
        if((invo.invoices_quantity - invo.provide) == 0){
            return <th className="text-xl text-[#dc2626]">مغلقة</th>
        }
        else{
            return <th className="text-xl text-green-600">قيد العمل</th>
        }
    }

    return (
        <div className="m-10">
            <div>
                <div className="border-r-4 border-[#334155] bg-gray-300 p-8 mb-5">
                    <div dir="rtl" className="mb-8">
                        <label className="container w-64">رقم الفتورة
                            <input onChange={(e) => setResRadio(e.target.value)} value={"رقم الفتورة"} type="radio" defaultChecked name="radio" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container w-64">اجمالي الطلب
                            <input onChange={(e) => setResRadio(e.target.value)} value={"اجمالي الطلب"} type="radio" name="radio" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container w-64">تاريخ الفاتورة
                            <input onChange={(e) => setResRadio(e.target.value)} value={"تاريخ الفاتورة"} type="radio" name="radio" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container w-64">الاسم
                            <input onChange={(e) => setResRadio(e.target.value)} value={"الاسم"} type="radio" name="radio" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container w-64">المضخة
                            <input onChange={(e) => setResRadio(e.target.value)} value={"المضخة"} type="radio" name="radio" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container w-64">نوع البطون
                            <input onChange={(e) => setResRadio(e.target.value)} value={"نوع البطون"} type="radio" name="radio" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container w-64">نوع الصرار
                            <input onChange={(e) => setResRadio(e.target.value)} value={"نوع الصرار"} type="radio" name="radio" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container w-64">ضغط البطون
                            <input onChange={(e) => setResRadio(e.target.value)} value={"ضفط البطون"} type="radio" name="radio" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container w-64">مستوى الماء
                            <input onChange={(e) => setResRadio(e.target.value)} value={"مستوى الماء"} type="radio" name="radio" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="" dir="rtl">
                        {
                            resRadio === "رقم الفتورة" ?
                                <>
                                    <label htmlFor="search" className="text-xl">بحث حسب : {resRadio}</label>
                                    <input className="bg-white rounded-xl mt-2 block w-1/3 py-2.5 px-0 text-xl text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" onChange={checkSearchValue} type="text" ref={degreeOfExposureRef} id="search" name="search" />
                                </>
                                :
                                resRadio === "اجمالي الطلب" ?
                                    <>
                                        <label htmlFor="search" className="text-xl">بحث حسب : {resRadio}</label>
                                        <input className="bg-white rounded-xl mt-2 block w-1/3 py-2.5 px-0 text-xl text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" onChange={checkSearchValue} type="text" ref={degreeOfExposureRef} id="search" name="search" />
                                    </>
                                    :
                                    resRadio === "تاريخ الفاتورة" ?
                                        <>
                                            <label htmlFor="search" className="text-xl">بحث حسب : {resRadio}</label>
                                            <input className="bg-white rounded-xl mt-2 block w-1/3 py-2.5 px-0 text-xl text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" onChange={checkSearchValue} type="text" ref={degreeOfExposureRef} id="search" name="search" />
                                        </>
                                        :
                                        resRadio === "الاسم" ?
                                            <>
                                                <label htmlFor="search" className="text-xl">بحث حسب : {resRadio}</label>
                                                <input className="bg-white rounded-xl mt-2 block w-1/3 py-2.5 px-0 text-xl text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" onChange={checkSearchValue} type="text" ref={degreeOfExposureRef} id="search" name="search" />
                                            </>
                                            :
                                            resRadio === "المضخة" ?
                                                <>
                                                    <label htmlFor="search" className="text-xl">بحث حسب : {resRadio}</label>
                                                    <input className="bg-white rounded-xl mt-2 block w-1/3 py-2.5 px-0 text-xl text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" onChange={checkSearchValue} type="text" ref={degreeOfExposureRef} id="search" name="search" />
                                                </>
                                                :
                                                resRadio === "نوع الصرار" ?
                                                    <>
                                                        <label htmlFor="search" className="text-xl">بحث حسب : {resRadio}</label>
                                                        <input className="bg-white rounded-xl mt-2 block w-1/3 py-2.5 px-0 text-xl text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" onChange={checkSearchValue} type="text" ref={degreeOfExposureRef} id="search" name="search" />
                                                    </>
                                                    :
                                                    resRadio === "نوع البطون" ?
                                                        <>
                                                            <label htmlFor="search" className="text-xl">بحث حسب : {resRadio}</label>
                                                            <input className="bg-white rounded-xl mt-2 block w-1/3 py-2.5 px-0 text-xl text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" onChange={checkSearchValue} type="text" ref={degreeOfExposureRef} id="search" name="search" />
                                                        </>
                                                        :
                                                        resRadio === "درجة الضغط" ?
                                                            <>
                                                                <label htmlFor="search" className="text-xl">بحث حسب : {resRadio}</label>
                                                                <input className="bg-white rounded-xl mt-2 block w-1/3 py-2.5 px-0 text-xl text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" onChange={checkSearchValue} type="text" ref={degreeOfExposureRef} id="search" name="search" />
                                                            </>
                                                            :
                                                            <>
                                                                <label htmlFor="search" className="text-xl">بحث حسب : {resRadio}</label>
                                                                <input className="bg-white rounded-xl mt-2 block w-1/3 py-2.5 px-0 text-xl text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" onChange={checkSearchValue} type="text" ref={degreeOfExposureRef} id="search" name="search" />
                                                            </>
                        }

                    </div>
                </div>
                <div className="w-auto overflow-auto hight_for_table_list">
                    <table className="w-full ">
                        <tbody className="">

                            <tr className="sticky top-0 z-10 bg-[#334155] text-white">
                                <th className="text-xl">مستوى الماء</th>
                                <th className="text-xl">ضغط البطون</th>
                                <th className="text-xl">نوع الصرار</th>
                                <th className="text-xl">نوع البطون</th>
                                <th className="text-xl">المضخة</th>
                                <th className="text-xl">الاسم</th>
                                <th className="text-xl">تاريخ الفاتورة</th>
                                <th className="text-xl">اجمالي الطلب</th>
                                <th className="text-xl">رقم الفتورة</th>
                                <th className="text-xl">حالة الفاتورة</th>
                            </tr>

                            {
                                get
                            }

                            {
                                showInvoEdit ? <EditBoard showInv={() => setShowInvoEdit(false)} data={invData} /> : null
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}