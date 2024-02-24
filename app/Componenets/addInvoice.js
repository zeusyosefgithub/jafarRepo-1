'use client';
import { useEffect, useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import FormBoxConcertPump from "./formBoxConcertPump";
import FormBoxNewCus from "./formBoxNewCus";
import GetTrucks from "./getDocs";
import { Button } from "@nextui-org/button";
import { IoMdArrowForward } from "react-icons/io";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Spinner } from "@nextui-org/react";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";



export default function AddInvoice() {

    const [loading, setLoading] = useState(false);

    const [invData, setInvData] = useState();
    const theList5 = GetTrucks("kinds rocks").sort(compareByAge);
    const theList6 = GetTrucks("kinds concrete").sort(compareByAge);
    const [isNewCus, setIsNewCus] = useState(true);
    const [errorCusId, setErrorCusId] = useState("");
    const [errorSameNameCus, setErrorSameNameCus] = useState("");
    const [errorCusName, setErrorCusName] = useState("");
    const [errorCusStreet, setErrorCusStreet] = useState("");
    const [errorCusCity, setErrorCusCity] = useState("");
    const [errorCusQuant, setErrorCusQuant] = useState("");
    const [errorCusConGrade, setErrorCusConGrade] = useState("");
    const [errorCusDegExp, setErrorCusDegExp] = useState("");
    const [errorPump, setErrorPump] = useState("");
    const [errorNewCus, setErrorNewCus] = useState("");
    const [errorKindCon, setErrorKindCon] = useState("");
    const collec = collection(firestore, "invoices");
    const AllCustomers = GetTrucks("customers");


    const [customerId,setCustomerId] = useState('');
    const [customerName,setCustomerName] = useState('');
    const [customerStreet,setCustomerStreet] = useState('');
    const [customerCity,setCustomerCity] = useState('');

    const [concretdGrade,setConcretdGrade] = useState('');
    const [degreeOfExposure,setDegreeOfExposure] = useState('');
    const [quantity,setQuantity] = useState('');


    const [disableByTypeCon, setDisableByTypeCon] = useState(false);
    const [disableJustPump, setDisableJustPump] = useState(false);
    const [isAutoDate, setIsAutoDate] = useState(false);
    const [autoDateVal, setAutoDateVal] = useState('');
    const [errorManuelDate, setErrorManuelDate] = useState('');


    const PreventMultipleClickAddInfo = useRef(null);
    const [isWithPump, setIsWithPump] = useState(false);

    const [showDrop1,setShowDrop1] = useState(false);
    const [showDrop2,setShowDrop2] = useState(false);

    const [pump, setPump] = useState();
    const getPump = (truck_id) => {
        setPump(truck_id);
    }

    const [newCus, setNewCus] = useState();
    const [customer, setCustomer] = useState({});
    const getNewCus = (truck_id, cus) => {
        setNewCus(truck_id);
        setCustomer(cus);
    }

    const AllInvoices = GetTrucks("invoices").sort(compareByAge);
    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let time = date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
    });
    let currentdate = `${day}/${month}/${year}`;
    let currenttime = `${time}/${day}/${month}/${year}`;


    const currectInvoiceId = () => {
        let maxValue = 0;
        for (let index = 0; index < AllInvoices.length; index++) {
            maxValue = Math.max(maxValue, AllInvoices[index]?.invoices_id)
        }
        return maxValue + 1;
    }

    const checkIfIsEqualCustomer = (phone, name) => {
        for (let index = 0; index < AllCustomers?.length; index++) {
            if (phone == AllCustomers[index]?.customer_id || name == AllCustomers[index]?.customer_name) {
                return true;
            }
        }
        return false;
    }
    const handelAddInfo = async () => { 

        let counterInvoices = currectInvoiceId();
        let regex = /(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3(0|1))\/\d{4}$/;
        let newData = {};
        if (isAutoDate) {
            setErrorManuelDate("");
            if (!regex.test(autoDateVal)) {
                return setErrorManuelDate('التاريخ الذي تم ادخالة غير صحيح !')
            }
            setErrorManuelDate("");
        }

        if (isNewCus) {
            setErrorNewCus("");
            if (!newCus) {
                return setErrorNewCus("!لم يتم اختيار اي زبون");
            }
            setErrorNewCus("");
            newData = {
                invoices_id: counterInvoices,
                invoices_customer_id: customer.customer_id,
                invoices_customer_name: customer.customer_name,
                invoices_customer_street: customer.customer_street,
                invoices_customer_city: customer.customer_city,
                invoices_quantity: quantity,
                invoices_concretd_grade: concretdGrade,
                invoices_kind_material: disableByTypeCon ? '---' : dropValue1.kinds_rocks_name,
                invoices_kind_type_of_concrete: dropValue2.kinds_concrete_name,
                invoices_kind_egree_of_Exposure: degreeOfExposure,
                invoices_pump: disableJustPump ? '---' : pump,
                provide: 0,
                stayed: quantity - 0,
                invoices_data: isAutoDate ? autoDateVal.replace(/\b0/g, '') : currentdate
            };
        }
        else {
            setErrorSameNameCus("");
            setErrorCusId("");
            setErrorCusName("");
            setErrorCusStreet("");
            setErrorCusCity("");
            if (checkIfIsEqualCustomer(customerId, customerName)) {
                return setErrorSameNameCus("الزبون الذي تم ادخالة موجود بالفعل !");
            }
            if (!customerId || customerId.length > 10) {
                return setErrorCusId("!رقم الزبون اكثر من 10 ارقام او ليس لديه قيمة");
            }
            if (!customerName || customerName.length > 25) {
                return setErrorCusName("!اسم الزبون اكثر من 16 حرف او ليس لديه قيمة");
            }
            if (!customerStreet || customerStreet.length > 10) {
                return setErrorCusStreet("!اسم الشارع اكثر من 10 حرف او ليس لديه قيمة");
            }
            if (!customerCity || customerCity.length > 10) {
                return setErrorCusCity("!اسم البلد اكثر من 10 حرف او ليس لديه قيمة");
            }
            setErrorSameNameCus("");
            setErrorCusId("");
            setErrorCusName("");
            setErrorCusStreet("");
            setErrorCusCity("");
            newData = {
                invoices_id: counterInvoices,
                invoices_customer_id: customerId,
                invoices_customer_name: customerName,
                invoices_customer_street: customerStreet,
                invoices_customer_city: customerCity,
                invoices_quantity: quantity,
                invoices_concretd_grade: concretdGrade,
                invoices_kind_material: disableByTypeCon ? '---' : dropValue1.kinds_rocks_name,
                invoices_kind_type_of_concrete: dropValue2.kinds_concrete_name,
                invoices_kind_egree_of_Exposure: degreeOfExposure,
                invoices_pump: disableJustPump ? '---' : pump,
                provide: 0,
                stayed: quantity - 0,
                invoices_data: isAutoDate ? autoDateVal.replace(/\b0/g, '') : currentdate
            };
        }

        setErrorCusQuant("");
        setErrorCusConGrade("");
        setErrorCusDegExp("");
        setErrorPump("");
        setErrorKindCon("");
        if (!quantity) {
            return setErrorCusQuant("!لم يتم ادخال للطلب الاجمالي قيمة");
        }
        if (!concretdGrade) {
            return setErrorCusConGrade("!لم يتم ادخال لمستوى الماء قيمة");
        }
        if (!degreeOfExposure) {
            return setErrorCusDegExp("!لم يتم ادخال ضغط البطون قيمة");
        }
        if (!pump && !disableByTypeCon && !disableJustPump) {
            return setErrorPump("!لم يتم اختيار اي مضخة خرسانة");
        }
        if (!dropValue1 && !disableByTypeCon) {
            return setErrorKindCon("!لم يتم اخيار نوع البطون او الصرار");
        }
        if (!dropValue2) {
            return setErrorKindCon("!لم يتم اخيار نوع البطون او الصرار");
        }
        setErrorCusQuant("");
        setErrorCusConGrade("");
        setErrorCusDegExp("");
        setErrorPump("");
        setErrorKindCon("");
        PreventMultipleClickAddInfo.current.disabled = true;
        setInvData(newData);
        setLoading(true);
        let NewcustomersList = {
            customer_id: customerId,
            customer_name: customerName,
            customer_street: customerStreet,
            customer_city: customerCity
        }
        try {
            await addDoc(collec, newData);
            !newCus && await addDoc(collection(firestore, "customers"), NewcustomersList)
        }
        catch (e) {
            console.log(e);
        }
        setConcretdGrade('');
        setDegreeOfExposure('');
        setQuantity('');
        setPump(null);
        setAutoDateVal('');
        setIsAutoDate(false);
        setNewCus(null);
        setCustomer(null);
        setIsNewCus(true);
        setDropValue1(null);
        setDropValue2(null);
        setDisableByTypeCon(false);
        setLoading(false);
        PreventMultipleClickAddInfo.current.disabled = false;
    }
    function compareByAge(a, b) {
        return b.invoices_id - a.invoices_id;
    }

    const [dropValue1, setDropValue1] = useState(null);
    const [dropValue2, setDropValue2] = useState(null);


    const checkToDisable = (val) => {
        if (val === 'طينة' || val === 'اسمنتيت' || val === 'هربتسا') {
            setDisableByTypeCon(true);
            setPump(null);
            setDisableJustPump(true);
            setDropValue1(null);
            setIsWithPump(false);
        }
        else {
            setDisableByTypeCon(false);
            if (isWithPump && dropValue2) {
                setDisableJustPump(false);
                setIsWithPump(false);
            }
            else if (!isWithPump && dropValue2) {
                setDisableJustPump(true);
                setIsWithPump(true);
            }
        }
    }

    const quantityRef = useRef();
    const dgreeExpRef = useRef();
    const ConcertGradeRef = useRef();
    const KindConncertRef = useRef();
    const kindRockRef = useRef();
    const AddRemoveAddCon = useRef();
    const Pump = useRef();

    const checkIfEnterQuantity = (value) => {
        if (value.keyCode === 13 || value.keyCode === 37) {
            dgreeExpRef.current.focus();
        }
    }
    const checkIfEnterDgree = (value) => {
        if (value.keyCode === 13 || value.keyCode === 37) {
            ConcertGradeRef.current.focus();
        }
        if(value.keyCode === 39){
            quantityRef.current.focus();
        }
    }
    const checkIfEnterGrade = (value) => {
        if (value.keyCode === 13 || value.keyCode === 37) {
            KindConncertRef.current.click();
        }
        if(value.keyCode === 39){
            dgreeExpRef.current.focus();
        }
    }
    const checkIfEnterDrop1 = (value,list) => {
        if (value.keyCode === 13) {
            setDropValue2(list); checkToDisable(list.kinds_concrete_name);
        }
        
    }
    const vcheckIfEnterDrop11 = (v) => {
        if(v.keyCode === 37){
            kindRockRef.current.focus();
        }
        if(v.keyCode === 39){
            ConcertGradeRef.current.focus();
        }
        if(v.keyCode === 40){
            PreventMultipleClickAddInfo.current.focus();
        }
    }
    const checkIfEnterDrop2 = (value,list) => {
        if (value.keyCode === 13) {
            setDropValue1(list);
        }
        
    }
    const vcheckIfEnterDrop22 = (v) => {
        if(v.keyCode === 37){
            Pump.current.focus();
        }
        if(v.keyCode === 39){
            KindConncertRef.current.focus();
        }
        if(v.keyCode === 40){
            PreventMultipleClickAddInfo.current.focus();
        }
    }
    const checkIfEnterPump = (v) => {
        if(v.keyCode === 38){
            
        }
        if (v.keyCode === 13) {
            Pump.current.click();
        }
        if(v.keyCode === 39){
            kindRockRef.current.focus();
        }
        if(v.keyCode === 40){
            PreventMultipleClickAddInfo.current.focus();
        }
    }
    const checkIfEnterSubmit = (v) => {
        if(v.keyCode === 38){
            if(disableJustPump){
                KindConncertRef.current.focus();
            }
            else{
                Pump.current.focus();
            }
        }

    }
    

    return (
        <div className="rounded-3xl bg-gray-100 p-10 w-full shadow-2xl">
            {
                showDrop1 && <FormBoxConcertPump showPump={showDrop1} disable={() => setShowDrop1(false)} getPump={getPump} />
            }
            {
                showDrop2 && <FormBoxNewCus showCustomer={showDrop2} disable={() => setShowDrop2(false)} newCustomer={() => setIsNewCus(false)} getNewCus={getNewCus} />
            }
            {
                loading && <Spinner className="fixed left-1/2 top-1/2 z-50" size="lg" />
            }
            {/* {
                showPump ? <FormBoxConcertPump getPump={getPump} showDisableCon={handelShowDisablePump} /> :
                    showNewCus ? <FormBoxNewCus newCustomer={() => setIsNewCus(false)} getNewCus={getNewCus} showDisableNewCus={handelShowDisableNewCus} />
                        : null
            } */}
            <div className="">
                <div>
                    <div>
                        <div dir="rtl">
                            {
                                isAutoDate ?
                                    <Button onClick={() => setIsAutoDate(false)}>تاريخ يدوي</Button> :
                                    <Button autoFocus onClick={() => setIsAutoDate(true)}>تاريخ تلقائي</Button>
                            }
                            {
                                isAutoDate &&
                                <div className="flex items-center">
                                    <Input value={autoDateVal} onValueChange={(val) => { setAutoDateVal(val) }} color="primary" size="lg" className="w-1/4 m-5 z-0" label="تاريخ يدوي" />
                                    <div>تنبيه !! : التاريخ يجب ان يكون بدون اصفار في بداية الارقام مثال ({currentdate})</div>
                                </div>
                            }
                            {
                                errorManuelDate && <div dir="rtl" className="text-[#dc2626] text-base">{errorManuelDate}</div>
                            }
                        </div>
                        <div className="flex justify-end text-3xl mb-6 border-r-4 border-[#334155] bg-gray-300 p-3 mt-3 rounded-lg">المشتري</div>
                        {
                            !isNewCus && <div className="mb-5 flex justify-end">
                                <Button size="lg" onClick={() => setIsNewCus(true)} className="text-base">الرجوع للاختيار<IoMdArrowForward className="text-xl" /></Button>

                            </div>
                        }
                        {
                            isNewCus ?
                                newCus
                                    ?
                                    <div className="flex justify-around w-full">
                                        <div className="text-center mr-2 flex items-center border-r-4 border-[#334155] bg-gray-200 p-2">
                                            <div>
                                                {
                                                    customer.customer_name
                                                }
                                                &nbsp;
                                            </div>
                                            <div>
                                                : لقد تم اختيار
                                            </div>
                                        </div>
                                        <div className="w-1/6">
                                            <Button color="danger" variant="bordered" size="lg" onClick={() => setNewCus(null)}>
                                                <div className="">ازالة</div>
                                            </Button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className="flex justify-center mb-7">
                                        <Button autoFocus dir="rtl" size="lg" onClick={() => setShowDrop2(true)}>اختر زبون<AiOutlinePlus/></Button>
                                            
                                        </div>
                                        {
                                            errorNewCus && <div dir="rtl" className="text-[#dc2626] text-base">{errorNewCus}</div>
                                        }
                                    </div>
                                :
                                <div>
                                    <div dir="rtl" className="grid md:grid-cols-2 md:gap-6">
                                        <Input errorMessage={errorCusId} value={customerId} onValueChange={(value) => setCustomerId(value)} variant="bordered" className="m-3" type="number" label="رقم المشتري" />
                                        <Input errorMessage={errorCusName} value={customerName} onValueChange={(value) => setCustomerName(value)} variant="bordered" className="m-3" type="text" label="اسم المشتري الكامل" />
                                    </div>
                                    <div dir="rtl" className="grid md:grid-cols-2 md:gap-6 border-b-gray">
                                        <Input errorMessage={errorCusStreet} value={customerStreet} onValueChange={(value) => setCustomerStreet(value)} variant="bordered" className="m-3" type="text" label="الشارع" />
                                        <Input errorMessage={errorCusCity} value={customerCity} onValueChange={(value) => setCustomerCity(value)} variant="bordered" className="m-3" type="text" label="البلد" />
                                    </div>
                                    {
                                        errorSameNameCus && <div dir="rtl" className="text-[#dc2626] text-base">{errorSameNameCus}</div>
                                    }
                                </div>
                        }
                        <div className="flex justify-end text-3xl mt-10 border-r-4 border-[#334155] bg-gray-300 p-3 mb-3 rounded-lg">الطلب</div>
                        <div className="grid md:grid-cols-3 md:gap-6 mb-8 mt-10">
                            <div dir="rtl">
                                <Input ref={ConcertGradeRef} onKeyDown={(e) => checkIfEnterGrade(e)} errorMessage={errorCusConGrade} value={concretdGrade} onValueChange={(value) => setConcretdGrade(value)} variant="bordered" type="number" label="مستوى الماء :" />
                            </div>
                            <div dir="rtl">
                                <Input ref={dgreeExpRef} onKeyDown={(e) => checkIfEnterDgree(e)} errorMessage={errorCusDegExp} value={degreeOfExposure} onValueChange={(value) => setDegreeOfExposure(value)} variant="bordered" type="number" label="ضغط البطون :" />
                            </div>
                            <div dir="rtl">
                                <Input ref={quantityRef} onKeyDown={(e) => checkIfEnterQuantity(e)} errorMessage={errorCusQuant} value={quantity} onValueChange={(value) => {setQuantity(value)}} variant="bordered" type="text" label="الطلب الاجمالي :" />
                            </div>
                        </div>
                        <div dir="rtl" className="flex w-full justify-around items-center mt-10 mb-10">


                            <Dropdown dir="rtl"  className="test-fontt">
                                <DropdownTrigger onKeyDown={(e) => vcheckIfEnterDrop11(e)}>
                                    <Button                      
                                        ref={KindConncertRef}
                                        size="lg"
                                        className="z-0 capitalize"
                                        aria-label="Single selection example"
                                    >
                                        نوع البطون : {dropValue2?.arbic}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu 
                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                >
                                    {
                                        theList6.map(list => {
                                            return <DropdownItem autoFocus onKeyDown={(e) => checkIfEnterDrop1(e,list)} onClick={() => { setDropValue2(list); checkToDisable(list.kinds_concrete_name); }} key={list.arbic}>{list.arbic}</DropdownItem>
                                        })
                                    }
                                </DropdownMenu>
                            </Dropdown>

                            <Dropdown dir="rtl" className="test-fontt">
                                <DropdownTrigger onKeyDown={(e) => vcheckIfEnterDrop22(e)}>
                                    <Button
                                        ref={kindRockRef}
                                        isDisabled={disableByTypeCon}
                                        size="lg"
                                        className="z-0 capitalize"
                                    >
                                        نوع الصرار : {dropValue1?.arbic}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                >
                                    {
                                        theList5.map(list => {
                                            return <DropdownItem autoFocus onKeyDown={(e) => checkIfEnterDrop2(e,list)} onClick={() => { setDropValue1(list) }} key={list.arbic}>{list.arbic}</DropdownItem>
                                        })
                                    }
                                </DropdownMenu>
                            </Dropdown>


                            <div>
                                <div className="">
                                    {
                                        pump ?
                                            <div className="flex justify-around">
                                                <div className="text-center mr-2 flex items-center border-r-4 border-[#334155] bg-gray-200 p-2">
                                                    <div>
                                                        {
                                                            pump
                                                        }
                                                        &nbsp;
                                                    </div>
                                                    <div>
                                                        : لقد تم اختيار
                                                    </div>
                                                </div>
                                                <div className="w-1/6">
                                                    <Button color="danger" variant="bordered" size="lg" onClick={() => setPump(null)}>
                                                        <div>ازالة</div>
                                                    </Button>
                                                </div>
                                            </div>
                                            :
                                            <div className="items-center">
                                                <div className="flex justify-center">
                                                    {
                                                        isWithPump && dropValue2 ?
                                                            <CiCirclePlus onClick={() => { setIsWithPump(false); checkToDisable(dropValue2.kinds_concrete_name); }} className="text-[#84cc16] text-4xl rounded-none cursor-pointer" />
                                                            :
                                                            !isWithPump && dropValue2 ?
                                                                <CiCircleMinus onClick={() => { setIsWithPump(true); checkToDisable(dropValue2.kinds_concrete_name); }} className="text-[#ef4444] text-4xl rounded-none cursor-pointer" />
                                                                :
                                                                null
                                                    }
                                                </div>
                                                <div className="flex justify-center">
                                                    <Button isDisabled={disableJustPump} ref={Pump} onKeyDown={(e) => checkIfEnterPump(e)} size="lg" onClick={() => setShowDrop1(true)}>اختر مضخة<AiOutlinePlus/></Button>                                                  
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            errorPump && <div dir="rtl" className="text-[#dc2626] text-base">{errorPump}</div>
                        }
                        {
                            errorKindCon && <div dir="rtl" className="text-[#dc2626] text-base">{errorKindCon}</div>
                        }
                        <div className="flex justify-center mb-5 mt-8">
                            <button onKeyDown={(e) => checkIfEnterSubmit(e)} ref={PreventMultipleClickAddInfo} onClick={handelAddInfo} className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">ادخال</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}