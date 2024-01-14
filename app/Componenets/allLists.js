'use client';
import { list } from "postcss";
import GetTrucks from "./getDocs";
import { useEffect, useRef, useState } from "react";
import EditBoard from "./editBoard";
import SearchInvoice from "./searchInvoice";
import { FaTrash } from "react-icons/fa";
import { deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import SortLists from "./sortLists";
import { ComponentToPrintInvoList } from "./toPrintListInvo";
import { useReactToPrint } from "react-to-print";

export default function AllLists(props) {

    const list1 = [
        {
            month: "يناير"
        },
        {
            month: "فبراير"
        },
        {
            month: "مارس"
        },
        {
            month: "ابريل"
        },
        {
            month: "مايو"
        },
        {
            month: "يونيو"
        },
        {
            month: "يوليو"
        },
        {
            month: "اغسطس"
        },
        {
            month: "سبتمبر"
        },
        {
            month: "اكتوبر"
        },
        {
            month: "نوفمبر"
        },
        {
            month: "ديسمبر"
        }
    ]
    const list = [
        {
            month: "الاحد"
        },
        {
            month: "الاثنين"
        },
        {
            month: "الثلاثاء"
        },
        {
            month: "الاربعاء"
        },
        {
            month: "الخميس"
        },
        {
            month: "الجمعة"
        },
        {
            month: "السبت"
        }
    ]

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

    const [kindSort, setKindSort] = useState('day');
    const [fromDate,setFromDate] = useState();
    const [ToDate,setToDate] = useState();

    const componentRef = useRef();

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
        if ((invo.invoices_quantity - invo.provide) == 0) {
            return <th className="text-base text-[#dc2626]">مغلقة</th>
        }
        else {
            return <th className="text-base text-green-600">قيد العمل</th>
        }
    }

    function getDayInArbic(str) {
        var conStr = str?.toString();
        var splitString = conStr?.split("");
        var array1 = [];
        var array2 = [];
        var array3 = [];
        let count = 0;
        for (let index = 0; index < splitString?.length; index++) {
            if (splitString[index] === "/" && count == 0) {
                count++;
            }
            else if (count == 0) {
                array1.push(splitString[index]);
            }
            else if (splitString[index] === "/" && count == 1) {
                count++;
            }
            else if (count == 1) {
                array2.push(splitString[index]);
            }
            else if (splitString[index] !== "/") {
                array3.push(splitString[index])
            }
        }
        array3.push("-");
        for (let index = 0; index < array2?.length; index++) {
            array3.push(array2[index]);
        }
        array3.push("-");
        for (let index = 0; index < array1?.length; index++) {
            array3.push(array1[index]);
        }
        let lastStr = "";
        for (let index = 0; index < array3?.length; index++) {
            lastStr += array3[index];
        }
        const d = new Date(lastStr);
        return list[d.getDay()]?.month;
    }

    function getMonthInArbic(date) {
        var conStr = date?.toString();
        var splitString = conStr?.split("");
        var array1 = [];
        var array2 = [];
        let count = 0;
        for (let index = 0; index < splitString?.length; index++) {
            if (splitString[index] === "/" && count == 0) {
                count++;
            }
            else if (count == 0) {
                array1.push(splitString[index]);
            }
            else if (splitString[index] === "/" && count == 1) {
                count++;
            }
            else if (count == 1) {
                array2.push(splitString[index]);
            }
        }
        let lastStr = "";
        for (let index = 0; index < array2?.length; index++) {
            lastStr += array2[index];
        }
        return list1[parseFloat(lastStr)]?.month;
    }

    const setkindSortIn = (wich,value1,value2) => {
        setKindSort(wich);
        setFromDate(value1);
        setToDate(value2);
    }

    const getJustMonth = (date) => {
        var conStr = date?.toString();
        var splitString = conStr?.split("");
        var array1 = [];
        var array2 = [];
        let count = 0;
        for (let index = 0; index < splitString?.length; index++) {
            if (splitString[index] === "/" && count == 0) {
                count++;
            }
            else if (count == 0) {
                array1.push(splitString[index]);
            }
            else{
                array2.push(splitString[index]);
            }
        }
        let lastStr = "";
        for (let index = 0; index < array2?.length; index++) {
            lastStr += array2[index];
        }
        return lastStr;
    }
    const getJustMonthInArbic = (date) => {
        var conStr = date?.toString();
        var splitString = conStr?.split("");
        var array2 = [];
        let count = 0;
        for (let index = 0; index < splitString?.length; index++) {
            if (splitString[index] === "/" && count == 0) {
                count++;
            }
            else if(count == 0){
                array2.push(splitString[index]);
            }
        }
        console.log(array2)
        let lastStr = "";
        for (let index = 0; index < array2?.length; index++) {
            lastStr += array2[index];
        }
        return list1[parseFloat(lastStr)]?.month
    }
    const getJustYear = (date) => {
        var conStr = date?.toString();
        var splitString = conStr?.split("");
        var array1 = [];
        var array2 = [];
        var array3 = [];
        let count = 0;
        for (let index = 0; index < splitString?.length; index++) {
            if (splitString[index] === "/" && count == 0) {
                count++;
            }
            else if (count == 0) {
                array1.push(splitString[index]);
            }
            else if (splitString[index] === "/" && count == 1) {
                count++;
            }
            else if (count == 1) {
                array2.push(splitString[index]);
            }
            else if (splitString[index] !== "/") {
                array3.push(splitString[index])
            }
        }
        console.log(array3)
        let lastStr = "";
        for (let index = 0; index < array3?.length; index++) {
            lastStr += array3[index];
        }
        return lastStr;
    }

    const getTheTruDateFromInputs = (fromDate) => {
        var fromdate = fromDate?.toString();
        var splitString = fromdate?.replaceAll('-', '/')?.split("");
        var array1 = [];
        var array2 = [];
        var array3 = [];
        let count = 0;
        for (let index = 0; index < splitString?.length; index++) {
            if (splitString[index] === "/" && count == 0) {
                count++;
            }
            else if (count == 0) {
                array1.push(splitString[index]);
            }
            else if (splitString[index] === "/" && count == 1) {
                count++;
            }
            else if (count == 1) {
                array2.push(splitString[index]);
            }
            else if (splitString[index] !== "/") {
                array3.push(splitString[index])
            }
        }
        array3[0] == 0 && array3 == array3?.shift();
        array3?.push('/');
        let count2 = 0;
        for (let index = 0; index < array2?.length; index++) {
            if (!(count2 == 0 && array2[index] == 0)) {
                array3?.push(array2[index]);
                count2++;
            }
        }
        array3.push('/');
        for (let index = 0; index < array1?.length; index++) {
            array3?.push(array1[index]);

        }
        let newstr = '';
        for (let index = 0; index < array3?.length; index++) {
            newstr += array3[index];
        }
        return newstr
    }

    const getTheInvoRowList = (theList, index) => {
        return <tr onClick={() => { setShowInvoEdit(true); setInvData(theList[index]) }} className="styling_lines_lists bordering_list1">
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
    }

    const getInvoices = () => {
        let listinvo = [];

        if (kindSort == 'day') {
            let currentDate = theList[0]?.invoices_data;
            listinvo.push(
                <tr>
                    <th colSpan={10}>
                        <div className="p-3 rounded text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                            <div>التاريخ : {currentDate}</div>
                            <div>الشهر : {getMonthInArbic(currentDate)}</div>
                            <div>اليوم : {getDayInArbic(currentDate)}</div>
                        </div>
                    </th>
                </tr>
            )
            for (let index = 0; index < theList.length; index++) {
                if (theList[index]?.invoices_data == currentDate) {
                    listinvo.push(
                        getTheInvoRowList(theList,index)
                    )
                }
                else {
                    currentDate = theList[index]?.invoices_data;
                    listinvo.push(
                        <tr>
                            <th colSpan={10}>
                                <div className="p-3 rounded text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                                    <div>التاريخ : {currentDate}</div>
                                    <div>الشهر : {getMonthInArbic(currentDate)}</div>
                                    <div>اليوم : {getDayInArbic(currentDate)}</div>
                                </div>
                            </th>
                        </tr>
                    )
                    listinvo.push(
                        getTheInvoRowList(theList,index)
                    )
                }

            }
        }
        else if (kindSort == 'month') {

            let currentDate = getJustMonth(theList[0]?.invoices_data);
            listinvo.push(
                <tr>
                    <th colSpan={10}>
                        <div className="p-3 rounded text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                            <div>التاريخ : {currentDate}</div>
                            <div>الشهر : {getJustMonthInArbic(currentDate)}</div>
                        </div>
                    </th>
                </tr>
            )
            for (let index = 0; index < theList.length; index++) {
                if (getJustMonth(theList[index]?.invoices_data) == currentDate) {
                    listinvo.push(
                        getTheInvoRowList(theList,index)
                    )
                }
                else {
                    currentDate = getJustMonth(theList[index]?.invoices_data);
                    listinvo.push(
                        <tr>
                            <th colSpan={10}>
                                <div className="p-3 rounded text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                                    <div>التاريخ : {currentDate}</div>
                                    <div>الشهر : {getJustMonthInArbic(currentDate)}</div>
                                </div>
                            </th>
                        </tr>
                    )
                    listinvo.push(
                        getTheInvoRowList(theList,index)
                    )
                }

            }

        }
        else if (kindSort == 'year') {
            let currentDate = getJustYear(theList[0]?.invoices_data);
            listinvo.push(
                <tr>
                    <th colSpan={10}>
                        <div className="p-3 rounded text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                            <div>السنة : {currentDate}</div>
                        </div>
                    </th>
                </tr>
            )
            for (let index = 0; index < theList.length; index++) {
                if (getJustYear(theList[index]?.invoices_data) == currentDate) {
                    listinvo.push(
                        getTheInvoRowList(theList,index)
                    )
                }
                else {
                    currentDate = getJustYear(theList[index]?.invoices_data);
                    listinvo.push(
                        <tr>
                            <th colSpan={10}>
                                <div className="p-3 rounded text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                                    <div>السنة : {currentDate}</div>
                                </div>
                            </th>
                        </tr>
                    )
                    listinvo.push(
                        getTheInvoRowList(theList,index)
                    )
                }

            }
        }
        else if (kindSort == 'nothing') {
            let currentDate = theList[0]?.invoices_data;
            for (let index = 0; index < theList.length; index++) {
                if (theList[index]?.invoices_data == currentDate) {
                    listinvo.push(
                        getTheInvoRowList(theList,index)
                    )
                }
                else {
                    listinvo.push(
                        getTheInvoRowList(theList,index)
                    )
                }

            }
        }
        else {
            let startDate = getTheTruDateFromInputs(fromDate);
            let endDate = getTheTruDateFromInputs(ToDate);
            let count = 0;
            for (let index = 0; index < theList.length; index++) {
                if (theList[index]?.invoices_data == endDate && count == 0) {
                    listinvo.push(
                        getTheInvoRowList(theList,index)
                    )
                    count++;
                }
                else if(theList[index]?.invoices_data == startDate){
                    listinvo.push(
                        getTheInvoRowList(theList,index)
                    )
                    count++;
                }
                else if(count == 1){
                    listinvo.push(
                        getTheInvoRowList(theList,index)
                    )
                }
            }
        }
        return listinvo;
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="rounded-3xl bg-[#f5f5f5] border-2 border-[#334155] p-10">
            {
                props.wichList == "invoices" ?
                    <div>
                        <div className="text-end text-2xl mb-7">جميع الفواتير التي تم ادخالها</div>
                        {/* <div>
                            <div className="flex justify-around w-full mb-7 mt-10 p-3 items-center">
                                <div className="flex items-center rounded-xl p-2">
                                    <label class="switch">
                                        <input onChange={(e) => setSearch(e.target.checked)} checked={isSearch} className="toggle_check" type="checkbox" />
                                        <span class="slider round"></span>
                                    </label>
                                    <div className="text-xl ml-4">بحث حسب تفاصيل</div>
                                </div>
                            </div>
                        </div> */}
                        <div>
                            <SortLists handlePrint={handlePrint} setkindSortIn={setkindSortIn} />
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
                                    <div className="hide_invioc">
                                        <ComponentToPrintInvoList invo={getInvoices()} ref={componentRef} />
                                    </div>
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
                                                    <th className="text-base"><div className="flex justify-around items-center">{count++}<div></div><FaTrash onClick={() => deletePump(list.id)} className="hover:text-[#dc2626] cursor-pointer" /></div></th>
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
                                                        <th className="text-base"><div className="flex justify-around items-center">{count++}<FaTrash onClick={() => deleteDriver(list.id)} className="hover:text-[#dc2626] cursor-pointer" /></div></th>
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
                                                            <th className="text-base"><div className="flex justify-around items-center">{count++}<FaTrash onClick={() => deleteTruck(list.id)} className="hover:text-[#dc2626] cursor-pointer" /></div></th>
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
                                                                    <th className="text-base"><div className="flex justify-around items-center">{list.kinds_rocks_name}<FaTrash onClick={() => deleteKinRuck(list.id)} className="hover:text-[#dc2626] cursor-pointer" /></div></th>
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
                                                                        <th className="text-base"><div className="flex justify-around items-center">{list.kinds_concrete_name}<FaTrash onClick={() => deleteKinCon(list.id)} className="hover:text-[#dc2626] cursor-pointer" /></div></th>
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
                                                                        <th className="text-base"><div className="flex justify-around items-center">{count++}<FaTrash onClick={() => deleteCus(list.id)} className="hover:text-[#dc2626] cursor-pointer" /></div></th>
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