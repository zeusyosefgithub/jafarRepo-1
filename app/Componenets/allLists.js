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
import { Input, useDisclosure } from "@nextui-org/react";
import ModalEditCustomer from "./ModalEditCustomer";
import { FaSearch } from "react-icons/fa";


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

    const theListRev = GetTrucks("invoices").sort(compareByAgeReverse);
    const theList = GetTrucks("invoices").sort(compareByAgeTwo).sort(sortDateInvoice);
    
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

    const [modalEditCus,setModlaEditCus] = useState(false);
    const [customerEdit,setCustomerEdit] = useState(null);

    var date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.getDate();
    let ReacurrentDate = `${day}/${month}/${year}`;

    function compareByAgeTwo(a, b) {
        return b.invoices_id - a.invoices_id;
    }

   

    function compareByAge(a, b) {
        return b.invoice_id - a.invoice_id;
    }

    function compareByAgeReverse(a, b) {
        return a.invoices_id - b.invoices_id;
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

    const statusinvoice = (invo,stayed) => {
        if ((invo.invoices_quantity - invo.provide) == 0) {
            return <th className="text-base text-[#dc2626]">مغلقة</th>
        }
        else {
            return <th><div className="flex justify-around items-center"><div className="text-sm">الباقي : {stayed}</div><div className="text-base text-green-600">قيد العمل</div></div></th>
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
    const wichDateSearched = (date) => {
        var conStr = date?.toString();
        var splitString = conStr?.split("");
        let count = 0;
        for (let index = 0; index < splitString?.length; index++) {
            if(splitString[index] === '/'){
                count++;
            }
        }
        return count;
    }

    const getTheInvoRowList = (theList, index,day,countDays) => {
        if(day === 'day' && ReacurrentDate === theList[index]?.invoices_data){
            return <tr className="styling_lines_lists bordering_list2 cursor-pointer" onClick={() => {setInvData(theList[index]);setShowInvoEdit(true)}}>
            <th className="text-base">{theList[index]?.invoices_concretd_grade}</th>
            <th className="text-base">{theList[index]?.invoices_kind_egree_of_Exposure}</th>
            <th className="text-base">{theList[index]?.invoices_kind_material}</th>
            <th className="text-base">{theList[index]?.invoices_kind_type_of_concrete}</th>
            <th className="text-base">{theList[index]?.invoices_pump}</th>
            <th className="text-base">{theList[index]?.invoices_customer_name}</th>
            <th className="text-base">{theList[index]?.invoices_data}</th>
            <th className="text-base">{theList[index]?.invoices_quantity}</th>
            <th className="text-base"><div className="flex justify-around"><div>{theList[index]?.invoices_id} : الفاتورة</div><div>{countDays - index}</div></div></th>
            {statusinvoice(theList[index],theList[index]?.invoices_quantity - theList[index]?.provide)}
           
        </tr>
        //<EditBoard countDays={countDays} day={day} index={index} tr status={statusinvoice(theList[index],theList[index]?.invoices_quantity - theList[index]?.provide)} data={theList[index]} />
        }
        return <tr className="styling_lines_lists bordering_list2 cursor-pointer" onClick={() => {setInvData(theList[index]);setShowInvoEdit(true)}}>
            <th className="text-base">{theList[index]?.invoices_concretd_grade}</th>
            <th className="text-base">{theList[index]?.invoices_kind_egree_of_Exposure}</th>
            <th className="text-base">{theList[index]?.invoices_kind_material}</th>
            <th className="text-base">{theList[index]?.invoices_kind_type_of_concrete}</th>
            <th className="text-base">{theList[index]?.invoices_pump}</th>
            <th className="text-base">{theList[index]?.invoices_customer_name}</th>
            <th className="text-base">{theList[index]?.invoices_data}</th>
            <th className="text-base">{theList[index]?.invoices_quantity}</th>
            <th className="text-base">{theList[index]?.invoices_id}</th>
            {statusinvoice(theList[index],theList[index]?.invoices_quantity - theList[index]?.provide)}
            
        </tr>
    }


    function getAllPropDate(date){
        let day = "";
        let month = "";
        let year = "";

        let count1 = 0;
        let count2 = 0;
        let count3 = 0;

        for (let index = 0; index < date.length; index++) {
            if(date[index] == "/"){
                count1++;
            }
            else if(count1 == 0){
                day += date[index];
            }
        }
        for (let index = 0; index < date.length; index++) {
            if(date[index] == "/"){
                count2++;
            }
            else if(count2 == 1){
                month += date[index];
            }
        }
        for (let index = 0; index < date.length; index++) {
            if(date[index] == "/"){
                count3++;
            }
            else if(count3 == 2){
                year += date[index];
            }
        }
        return {day : parseFloat(day),month : parseFloat(month),year : parseFloat(year)}
    }

    function sortDateInvoice(a,b) {
        let bb = `${getAllPropDate(b.invoices_data)?.year}-${getAllPropDate(b.invoices_data)?.month}-${getAllPropDate(b.invoices_data)?.day}`;
        let aa = `${getAllPropDate(a.invoices_data)?.year}-${getAllPropDate(a.invoices_data)?.month}-${getAllPropDate(a.invoices_data)?.day}`;
        return new Date(bb) - new Date(aa);
    }

    const getInvoices = () => {
        const sortedList = theList;
        let listinvo = [];
        if(valSearchInvoice3 === 'sort'){
            if(valSearchInvoice2 === 'invoice'){
                if(valSearchInvoice === 'biggestSmall'){
                    for (let index = 0; index < theList?.length; index++) {
                        listinvo.push(getTheInvoRowList(theList,index));
                    }
                }
                else{
                    for (let index = 0; index < theListRev?.length; index++) {
                        listinvo.push(getTheInvoRowList(theListRev,index));
                    }
                }
            }
            else if(valSearchInvoice2 === 'date'){
                if(valSearchInvoice === 'biggestSmall'){
                    setValSearchInvoice3(null);
                    setValSearchInvoice('nothing');
                }
                else{
                    for (let index = sortedList?.length - 1; index > 0; index--) {
                        listinvo.push(getTheInvoRowList(sortedList,index));
                    }
                }
            }
            else{
                if(valSearchInvoice === 'biggestSmall'){
                    let newInvoList = [];
                    let arbic = "أبجحخدذرزسشصضطظعغفقكلمنهوي"
                    let hebrow = "אבגדהוזחטיכלמנסעפצקרשת"
                    for (let index = 0; index < arbic.length; index++) {
                        for (let index1 = 0; index1 < theList?.length; index1++) {
                            let p1 = toString(theList[index1]?.invoices_customer_name);
                            let p2 = toString(arbic[index]);
                            if(!checkIfCurrentInList(newInvoList,theList[index1])){
                                p1.startsWith(p2) && listinvo.push(getTheInvoRowList(theList,index1)) && newInvoList.push(theList[index1]);
                            }
                            if(index == 0){
                                console.log(listinvo);
                            }

                        }
                    }
                    for (let index = 0; index < hebrow.length; index++) {
                        for (let index1 = 0; index1 < theList?.length; index1++) {
                            let p1 = toString(theList[index1]?.invoices_customer_name);
                            let p2 = toString(hebrow[index]);
                            if(!checkIfCurrentInList(newInvoList,theList[index1])){
                                p1.startsWith(p2) && listinvo.push(getTheInvoRowList(theList,index1)) && newInvoList.push(theList[index1]);
                            }
                        }
                    }
                }
                else{
                }
            }
        }
        else if (valSearchInvoice2 === 'AcoToDay') {
            for (let index = 0; index < sortedList?.length; index++) {
                if (sortedList[index]?.invoices_data === valSearchInvoice) {
                    listinvo.push(getTheInvoRowList(sortedList, index));
                }
            }
        }
        else if (valSearchInvoice2 === 'AcoToMonth') {
            for (let index = 0; index < sortedList?.length; index++) {
                if (getJustMonth(sortedList[index]?.invoices_data) === valSearchInvoice) {
                    listinvo.push(getTheInvoRowList(sortedList, index));
                }
            }
        }
        else if (valSearchInvoice2 === 'AcoToYear') {
            for (let index = 0; index < sortedList?.length; index++) {
                if (getJustYear(sortedList[index]?.invoices_data) === valSearchInvoice) {
                    listinvo.push(getTheInvoRowList(sortedList, index));
                }
            }
        }
        else if (valSearchInvoice && valSearchInvoice2 && valSearchInvoice3 === 'fortodate') {
            for (let index = 0; index < sortedList?.length; index++) {
                if (getAllPropDate(valSearchInvoice).day <= getAllPropDate(sortedList[index]?.invoices_data).day &&
                getAllPropDate(valSearchInvoice2).day >= getAllPropDate(sortedList[index]?.invoices_data).day &&
                getAllPropDate(valSearchInvoice).month <= getAllPropDate(sortedList[index]?.invoices_data).month &&
                getAllPropDate(valSearchInvoice2).month >= getAllPropDate(sortedList[index]?.invoices_data).month &&
                getAllPropDate(valSearchInvoice).year <= getAllPropDate(sortedList[index]?.invoices_data).year &&
                getAllPropDate(valSearchInvoice2).year >= getAllPropDate(sortedList[index]?.invoices_data).year) {
                    listinvo.push(getTheInvoRowList(sortedList, index));
                }
            }
            
        }
        else if(valSearchInvoice2 === 'name'){
            for (let index = 0; index < sortedList?.length; index++) {
                var StringName = sortedList[index]?.invoices_customer_name.toString();
                var StringInput = valSearchInvoice?.toString();
                StringName.startsWith(StringInput) && listinvo.push(getTheInvoRowList(sortedList,index));
            }
        }
        else if(valSearchInvoice && valSearchInvoice2 === null && valSearchInvoice3 === 'fortoinvoice'){
            for (let index = 0; index < sortedList?.length; index++) {
                if(sortedList[index]?.invoices_id == valSearchInvoice){
                    listinvo.push(getTheInvoRowList(sortedList,index));
                }    
            }
        }
        else if(valSearchInvoice && valSearchInvoice2 && valSearchInvoice3 === 'fortoinvoice'){
            for (let index = 0; index < sortedList?.length; index++) {
                if(sortedList[index]?.invoices_id >= valSearchInvoice && sortedList[index]?.invoices_id <= valSearchInvoice2){
                    listinvo.push(getTheInvoRowList(sortedList,index));
                }    
            }
        }
        else if (valSearchInvoice === 'nothing') {
            let currentDate = sortedList[0]?.invoices_data;
            for (let index = 0; index < sortedList.length; index++) {
                if (sortedList[index]?.invoices_data == currentDate) {
                    listinvo.push(
                        getTheInvoRowList(sortedList, index)
                    )
                }
                else {
                    listinvo.push(
                        getTheInvoRowList(sortedList, index)
                    )
                }

            }
        }
        else{
            if (valSearchInvoice == 'day') {
                let count = 0;
                for (let index = 0; index < sortedList?.length; index++) {
                    if(sortedList[index]?.invoices_data == ReacurrentDate){
                        count++;
                    }          
                }
                let currentDate = sortedList[0]?.invoices_data;
                listinvo.push(
                    <tr>
                        <th colSpan={11}>
                            <div className="p-3 rounded text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                                <div>التاريخ : {currentDate}</div>
                                <div>الشهر : {getMonthInArbic(currentDate)}</div>
                                <div>اليوم : {getDayInArbic(currentDate)}</div>
                            </div>
                        </th>
                    </tr>
                )
                for (let index = 0; index < sortedList.length; index++) {
                    if (sortedList[index]?.invoices_data == currentDate) {
                        listinvo.push(
                            getTheInvoRowList(sortedList,index,'day',count)
                            )
                        }
                        else {
                            currentDate = sortedList[index]?.invoices_data;
                            listinvo.push(
                                <tr>
                                <th colSpan={11}>
                                    <div className="p-3 rounded text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                                        <div>التاريخ : {currentDate}</div>
                                        <div>الشهر : {getMonthInArbic(currentDate)}</div>
                                        <div>اليوم : {getDayInArbic(currentDate)}</div>
                                    </div>
                                </th>
                            </tr>
                        )
                        listinvo.push(
                            getTheInvoRowList(sortedList,index,'day',count)
                            )
                        }
                        
                    }
            }
            else if (valSearchInvoice == 'month') {
                    
                    let currentDate = getJustMonth(sortedList[0]?.invoices_data);
                    listinvo.push(
                        <tr>
                        <th colSpan={11}>
                            <div className="p-3 rounded text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                                <div>التاريخ : {currentDate}</div>
                                <div>الشهر : {getJustMonthInArbic(currentDate)}</div>
                            </div>
                        </th>
                    </tr>
                )
                for (let index = 0; index < sortedList.length; index++) {
                    if (getJustMonth(sortedList[index]?.invoices_data) == currentDate) {
                        listinvo.push(
                            getTheInvoRowList(sortedList,index)
                            )
                        }
                        else {
                            currentDate = getJustMonth(sortedList[index]?.invoices_data);
                            listinvo.push(
                            <tr>
                                <th colSpan={11}>
                                    <div className="p-3 rounded text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                                        <div>التاريخ : {currentDate}</div>
                                        <div>الشهر : {getJustMonthInArbic(currentDate)}</div>
                                    </div>
                                </th>
                            </tr>
                        )
                        listinvo.push(
                            getTheInvoRowList(sortedList,index)
                        )
                    }
    
                }
    
            }
            else if (valSearchInvoice == 'year') {
                let currentDate = getJustYear(sortedList[0]?.invoices_data);
                listinvo.push(
                    <tr>
                        <th colSpan={11}>
                            <div className="p-3 rounded text-2xl flex justify-around m-4 bg-gray-300 border-r-4 border-[#334155]">
                                <div>السنة : {currentDate}</div>
                            </div>
                        </th>
                    </tr>
                )
                for (let index = 0; index < sortedList.length; index++) {
                    if (getJustYear(sortedList[index]?.invoices_data) == currentDate) {
                        listinvo.push(
                            getTheInvoRowList(sortedList,index)
                        )
                    }
                    else {
                        currentDate = getJustYear(sortedList[index]?.invoices_data);
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
                            getTheInvoRowList(sortedList,index)
                        )
                    }
    
                }
            }
            else {
                let startDate = getTheTruDateFromInputs(fromDate);
                let endDate = getTheTruDateFromInputs(ToDate);
                let count = 0;
                for (let index = 0; index < sortedList.length; index++) {
                    if (sortedList[index]?.invoices_data == endDate && count == 0) {
                        listinvo.push(
                            getTheInvoRowList(sortedList,index)
                        )
                        count++;
                    }
                    else if(sortedList[index]?.invoices_data == startDate){
                        listinvo.push(
                            getTheInvoRowList(sortedList,index)
                        )
                        count++;
                    }
                    else if(count == 1){
                        listinvo.push(
                            getTheInvoRowList(sortedList,index)
                        )
                    }
                }
            }
        }
        return listinvo;
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [valSearchInvoice,setValSearchInvoice] = useState('day');
    const [valSearchInvoice2,setValSearchInvoice2] = useState(null);
    const [valSearchInvoice3,setValSearchInvoice3] = useState(null);





    const checkIfCurrentInList = (list,invo) => {
        for (let index = 0; index < list?.length; index++) {
            if(list[index]?.invoices_id == invo?.invoices_id){
                return true;
            }
        }
        return false;
    }

    const searchCustomer = useRef();
    const [listCus, setListCus] = useState(theList4);

    const getLineCus = (customers, index) => {
        return <tr onClick={() => { setModlaEditCus(true); setCustomerEdit(customers[index]) }} className="cursor-pointer hover:bg-[#334155] hover:text-white">
            <th className="text-base">{customers[index].customer_city}</th>
            <th className="text-base">{customers[index].customer_street}</th>
            <th className="text-base">{customers[index].customer_name}</th>
            <th className="text-base">{customers[index].customer_id}</th>
            <th className="text-base"><div className="flex justify-around items-center">{count++}</div></th>
        </tr>
    }

    const getDefaultCus = () => {
        let listCus = [];
        for (let index = 0; index < theList4?.length; index++) {
            listCus.push(getLineCus(theList4, index));
        }
        return listCus;
    }

    const checkIfEqualCus = (list, cus2) => {
        for (let index = 0; index < list.length; index++) {
            if (list[index].customer_city === cus2.customer_city &&
                list[index].customer_id === cus2.customer_id &&
                list[index].customer_name === cus2.customer_name &&
                list[index].customer_street === cus2.customer_street) {
                return true;
            }
        }
        return false;
    }

    const GetSearchVal = () => {
        let getAll = [];
        setListCus([]);
        for (let index = 0; index < theList4?.length; index++) {
            var StringName = theList4[index]?.customer_name.toString();
            var StringInput = searchCustomer.current?.value.toString();
            if (StringName.startsWith(StringInput)) {
                setListCus(listCus => [...listCus, getLineCus(theList4, index)]);
                getAll.push(theList4[index]);
            }
        }
        for (let index = 0; index < theList4?.length; index++) {
            var StringName = theList4[index]?.customer_name.toString();
            var StringInput = searchCustomer.current?.value.toString();
            if (!getAll.length || !checkIfEqualCus(getAll, theList4[index])) {
                if (StringName.includes(StringInput)) {
                    setListCus(listCus => [...listCus, getLineCus(theList4, index)]);
                    getAll.push(theList4[index]);
                }
            }
        }
    }

    return (
        <div className="rounded-3xl bg-gray-100 p-10 w-full shadow-2xl">
            {
                showInvoEdit && <EditBoard data={invData} showInvoEdit={showInvoEdit} disable={() => setShowInvoEdit(false)}/>
            }
            {modalEditCus && <ModalEditCustomer deleteCus={(cus) => deleteCus(cus)} customer={customerEdit} show={modalEditCus} disable={() => setModlaEditCus(false)}/>}
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
                            <SortLists handlePrint={handlePrint} searchInvoice={(val1,val2,val3) => {setValSearchInvoice(val1);setValSearchInvoice2(val2);setValSearchInvoice3(val3)}} setkindSortIn={setkindSortIn} />
                        </div>
                        //23
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
                                                                    <th className="text-base"><div className="flex justify-around items-center">{list.kinds_rocks_name}</div></th>
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
                                                                        <th className="text-base"><div className="flex justify-around items-center">{list.kinds_concrete_name}</div></th>
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
                                                <div dir="rtl" className="m-8">
                                                    <Input ref={searchCustomer} onChange={GetSearchVal} className="bg-white w-fit rounded-xl pl-4" color="primary" variant="underlined" labelPlacement="outside-left" label={<FaSearch/>}/>
                                                </div>
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
                                                                searchCustomer.current?.value
                                                                    ?
                                                                    listCus
                                                                    :
                                                                    getDefaultCus()
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
            }
        </div>
    )
}