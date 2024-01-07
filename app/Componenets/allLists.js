'use client';
import { list } from "postcss";
import GetTrucks from "./getDocs";
import { useEffect, useState } from "react";
import EditBoard from "./editBoard";
import SearchInvoice from "./searchInvoice";
import { FaTrash } from "react-icons/fa";
import { deleteDoc, doc, updateDoc ,getDoc} from "firebase/firestore";
import { firestore } from "../FireBase/firebase";

export default function AllLists(props) {

    const theList = GetTrucks("invoices").sort(compareByAgeTwo);
    const theList1 = GetTrucks("concert pumps");
    const theList2 = GetTrucks("drivers");
    const theList3 = GetTrucks("trucks");
    const theList4 = GetTrucks("customers");
    const theList5 = GetTrucks("kinds rocks");
    const theList6 = GetTrucks("kinds concrete");
    const theList7 = GetTrucks("shipping").sort(compareByAge);
    let count = 1;

    const [showInvoEdit, setShowInvoEdit] = useState(false);
    const [invData, setInvData] = useState({});

    const [isSearch, setSearch] = useState(false);

    var date = new Date();
    let month = date.getMonth() + 1;

    function compareByAgeTwo(a, b) {
        return b.invoices_id - a.invoices_id;
    }

    function compareByAge(a, b) {
        return b.invoice_id - a.invoice_id;
    }

    const deleteCus = async (id) => {
        try {
            await deleteDoc(doc(firestore, "customers", id));
        }
        catch (e) {
            console.log(e);
        }
    }

    const deleteKinCon = async (id) => {
        try {
            await deleteDoc(doc(firestore, "kinds concrete", id));
        }
        catch (e) {
            console.log(e);
        }
    }

    const deleteKinRuck = async (id) => {
        try {
            await deleteDoc(doc(firestore, "kinds rocks", id));
        }
        catch (e) {
            console.log(e);
        }
    }

    const deleteTruck = async (id) => {
        try {
            await deleteDoc(doc(firestore, "trucks", id));
        }
        catch (e) {
            console.log(e);
        }
    }

    const deleteDriver = async (id) => {
        try {
            await deleteDoc(doc(firestore, "drivers", id));
        }
        catch (e) {
            console.log(e);
        }
    }

    const deletePump = async (id) => {
        try {
            await deleteDoc(doc(firestore, "concert pumps", id));
        }
        catch (e) {
            console.log(e);
        }
    }

    const statusinvoice = (invo) => {
        if((invo.invoices_quantity - invo.provide) == 0){
            return <th className="text-base text-[#dc2626]">مغلقة</th>
        }
        else{
            return <th className="text-base text-green-600">قيد العمل</th>
        }
    }

    const getInvoices = () => {
        let listinvo = [];
        let currentDate = theList[0]?.invoices_data;
        listinvo.push(
            <tr>
                <th colSpan={10}>
                    <div className="text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                        <div>التاريخ : {currentDate}</div>
                    </div>
                </th>
            </tr>
        )
        for (let index = 0; index < theList.length; index++) {
            if(theList[index]?.invoices_data == currentDate){
                listinvo.push(
                    <tr onClick={() => { setShowInvoEdit(true); setInvData(theList[index]) }} className="styling_lines_lists bordering_list1">
                        <th className="text-base">{theList[index]?.invoices_concretd_grade}</th>
                        <th className="text-base">{theList[index]?.invoices_kind_egree_of_Exposure}</th>
                        <th className="text-base">{theList[index]?.invoices_kind_material}</th>
                        <th className="text-base">{theList[index]?.invoices_kind_type_of_concrete}</th>
                        <th className="text-base">{theList[index]?.invoices_pump}</th>
                        <th className="text-base">{theList[index]?.invoices_customer_name}</th>
                        <th className="text-base">{theList[index]?.invoices_data}</th>
                        <th className="text-base">{theList[index]?.invoices_quantity}</th>
                        <th className="text-base">{theList[index]?.invoices_id}</th>
                        {statusinvoice(theList[index])}
                    </tr>
                )
            }
            else{
                currentDate = theList[index]?.invoices_data;
                listinvo.push(
                <tr>
                    <th colSpan={10}>
                        <div className="text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                            <div>التاريخ : {currentDate}</div>
                        </div>
                    </th>
                </tr>
                )
                listinvo.push(
                    <tr onClick={() => { setShowInvoEdit(true); setInvData(theList[index]) }} className="styling_lines_lists bordering_list1">
                        <th className="text-base">{theList[index]?.invoices_concretd_grade}</th>
                        <th className="text-base">{theList[index]?.invoices_kind_egree_of_Exposure}</th>
                        <th className="text-base">{theList[index]?.invoices_kind_material}</th>
                        <th className="text-base">{theList[index]?.invoices_kind_type_of_concrete}</th>
                        <th className="text-base">{theList[index]?.invoices_pump}</th>
                        <th className="text-base">{theList[index]?.invoices_customer_name}</th>
                        <th className="text-base">{theList[index]?.invoices_data}</th>
                        <th className="text-base">{theList[index]?.invoices_quantity}</th>
                        <th className="text-base">{theList[index]?.invoices_id}</th>
                        {statusinvoice(theList[index])}
                    </tr>
                )
            }
            
        }
        return listinvo;
    }

    return (
        <div className="rounded-3xl bg-[#f5f5f5] border-2 border-[#334155] p-10">
            {
                props.wichList == "invoices" ?
                    <div>
                        <div className="text-end text-2xl mb-7">جميع الفواتير التي تم ادخالها</div>
                        <div>
                            <div className="flex justify-around w-full mb-7 mt-10 p-3 items-center">
                                <div className="flex items-center rounded-xl p-2">
                                    <label class="switch">
                                        <input onChange={(e) => setSearch(e.target.checked)} checked={isSearch} className="toggle_check" type="checkbox" />
                                        <span class="slider round"></span>
                                    </label>
                                    <div className="text-xl ml-4">بحث حسب تفاصيل</div>
                                </div>
                            </div>
                        </div>
                        {
                            !isSearch ?
                                <div className="w-full overflow-auto hight_for_table_list">
                                    <table className="w-full">
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
                                                getInvoices()
                                            }
                                            {
                                                showInvoEdit ? <EditBoard showInv={() => setShowInvoEdit(false)} data={invData} /> : null
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div>
                                    <SearchInvoice />
                                </div>
                        }


                    </div>
                    :
                    props.wichList == "concert pumps" ?
                        <div>
                            <div className="text-end text-2xl mb-7">جميع المضخات التي تم ادخالها</div>
                            <div className="w-full overflow-auto hight_for_table_list">
                                <table className="w-full">
                                    <tbody>
                                        <tr className="sticky top-0 z-10 bg-[#334155] text-white">
                                            <th className="text-xl">ملاحظات</th>
                                            <th className="text-xl">سائق المضخة</th>
                                            <th className="text-xl">رقم المضخة</th>
                                        </tr>
                                        {
                                            theList1.map(list => {
                                                return <tr>
                                                    <th className="text-base">{list.pump_disc}</th>
                                                    <th className="text-base">{list.pump_d_name}</th>
                                                    <th className="text-base">{list.pump_id}</th>
                                                    <th className="text-base"><div className="flex justify-around items-center">{count++}<div></div><FaTrash onClick={() => deletePump(list.id)} className="hover:text-[#dc2626] cursor-pointer"/></div></th>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        props.wichList == "drivers" ?
                            <div>
                                <div className="text-end text-2xl mb-7">جميع السائقين الذين تم ادخالهم</div>
                                <div className="w-full overflow-auto hight_for_table_list">
                                    <table className="w-full">
                                        <tbody>
                                            <tr className="sticky top-0 z-10 bg-[#334155] text-white">
                                                <th className="text-xl">ملاحظات</th>
                                                <th className="text-xl">اسم السائق</th>
                                                <th className="text-xl">رقم السائق</th>
                                            </tr>
                                            {
                                                theList2.map(list => {
                                                    return <tr className="pointer_line">
                                                        <th className="text-base">{list.driver_disc}</th>
                                                        <th className="text-base">{list.driver_name}</th>
                                                        <th className="text-base">{list.driver_id}</th>
                                                        <th className="text-base"><div className="flex justify-around items-center">{count++}<FaTrash onClick={() => deleteDriver(list.id)} className="hover:text-[#dc2626] cursor-pointer"/></div></th>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            :
                            props.wichList == "trucks" ?
                                <div>
                                    <div className="text-end text-2xl mb-7">جميع الخلاطات التي تم ادخالها</div>
                                    <div className="w-full overflow-auto hight_for_table_list">
                                        <table className="w-full">
                                            <tbody>
                                                <tr className="sticky top-0 z-10 bg-[#334155] text-white">
                                                    <th className="text-xl">ملاحظات</th>
                                                    <th className="text-xl">اسم سائق الخلاطه</th>
                                                    <th className="text-xl">رقم الخلاطه</th>
                                                </tr>
                                                {
                                                    theList3.map(list => {
                                                        return <tr className="pointer_line">
                                                            <th className="text-base">{list.truck_disc}</th>
                                                            <th className="text-base">{list.truck_driver}</th>
                                                            <th className="text-base">{list.truck_id}</th>
                                                            <th className="text-base"><div className="flex justify-around items-center">{count++}<FaTrash onClick={() => deleteTruck(list.id)} className="hover:text-[#dc2626] cursor-pointer"/></div></th>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                :
                                props.wichList == "kinds rocks" ?
                                    <div >
                                        <div className="text-end text-2xl mb-7">جميع انواع الصرار التي تم ادخالها</div>
                                        <div className="flex justify-center">
                                            <div className="w-1/3 overflow-auto hight_for_table_list ">
                                                <table className="w-full">
                                                    <tbody>
                                                        {
                                                            theList5.map(list => {
                                                                return <tr className="pointer_line">
                                                                    <th className="text-base"><div className="flex justify-around items-center">{list.kinds_rocks_name}<FaTrash onClick={() => deleteKinRuck(list.id)} className="hover:text-[#dc2626] cursor-pointer"/></div></th>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    props.wichList == "kinds concrete" ?
                                        <div>
                                            <div className="text-end text-2xl mb-7">جميع انواع البطون التي تم ادخالها</div>
                                            <div className="flex justify-center">
                                                <div className="w-1/3 overflow-auto hight_for_table_list">
                                                    <table className="w-full" dir="">
                                                        <tbody>
                                                            {
                                                                theList6.map(list => {
                                                                    return <tr className="pointer_line">
                                                                        <th className="text-base"><div className="flex justify-around items-center">{list.kinds_concrete_name}<FaTrash onClick={() => deleteKinCon(list.id)} className="hover:text-[#dc2626] cursor-pointer"/></div></th>
                                                                    </tr>
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        props.wichList == "shipping" ?
                                            <div>
                                                <div className="text-end text-2xl mb-7">جميع الطلبيات التي تم ادخالها</div>                                               
                                                {
                                                    <div className="w-full overflow-auto hight_for_table_list">
                                                        <table className="w-full">
                                                            <tbody>
                                                                <tr className="sticky top-0 z-10 bg-[#334155] text-white">
                                                                    <th className="text-xl">اسم السائق</th>
                                                                    <th className="text-xl">الكمية المرسلة</th>
                                                                    <th className="text-xl">تاريخ الطلب</th>
                                                                    <th className="text-xl">رقم الخلاطه</th>
                                                                    <th className="text-xl">رقم فاتورة الطلب</th>
                                                                </tr>
                                                                {
                                                                    theList7.map(list => {
                                                                        return <tr className="pointer_line">
                                                                            <th className="text-base">{list.driver_name}</th>
                                                                            <th className="text-base">{list.current_quantity}</th>
                                                                            <th className="text-base">{list.shipping_date}</th>
                                                                            <th className="text-base">{list.truck_number}</th>
                                                                            <th className="text-base">{list.invoice_id}</th>
                                                                        </tr>
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <div>
                                                <div className="text-end text-2xl mb-7">جميع الزبائن الذين تمت اضافتهم</div>
                                                <div className="w-full overflow-auto hight_for_table_list">
                                                    <table className="w-full">
                                                        <tbody>
                                                            <tr className="sticky top-0 z-10 bg-[#334155] text-white">
                                                                <th className="text-xl">العنوان</th>
                                                                <th className="text-xl">الشارع</th>
                                                                <th className="text-xl">اسم الزبون</th>
                                                                <th className="text-xl">رقم الزبون</th>
                                                            </tr>
                                                            {
                                                                theList4.map(list => {
                                                                    return <tr className="pointer_line">
                                                                        <th className="text-base">{list.customer_city}</th>
                                                                        <th className="text-base">{list.customer_street}</th>
                                                                        <th className="text-base">{list.customer_name}</th>
                                                                        <th className="text-base">{list.customer_id}</th>
                                                                        <th className="text-base"><div className="flex justify-around items-center">{count++}<FaTrash onClick={() => deleteCus(list.id)} className="hover:text-[#dc2626] cursor-pointer"/></div></th>
                                                                    </tr>
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
            }
        </div>
    )
}