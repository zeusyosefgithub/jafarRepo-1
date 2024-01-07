'use client';
import FormBox from "./formBox";
import FormBoxDriver from "./formBoxDriver";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./toPrint";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import FormBoxConcertPump from "./formBoxConcertPump";
import { MdEditDocument } from "react-icons/md";
import FormBoxNewCus from "./formBoxNewCus";
import GetTrucks from "./getDocs";
import { list } from "postcss";
import { MdKeyboardArrowDown } from "react-icons/md";
import EditBoard from "./editBoard";


export default function AddInvoice() {

    const theList5 = GetTrucks("kinds rocks").sort(compareByAge);
    const theList6 = GetTrucks("kinds concrete").sort(compareByAge);

    const [newShipp, setNewshipp] = useState(true);
    const [invData, setInvData] = useState({});
    const [invData2, setInvData2] = useState({});
    const [showTruck, setShowTruck] = useState(false);
    const [showDriver, setShowDriver] = useState(false);
    const [showPump, setShowPump] = useState(false);
    const [showNewCus, setShowNewCus] = useState(false);
    const [showInvoEdit,setShowInvoEdit] = useState(false);

    const [currentQuantity, setCurrentQuantity] = useState();
    const [shippingToPrint, setShippingToPrint] = useState({});

    const [isNewCus, setIsNewCus] = useState(true);
    const [isClickedInList, setIsClickedInList] = useState(false);

    const customerIdRef = useRef();
    const [errorCusId, setErrorCusId] = useState("");
    const customerNameRef = useRef();
    const [errorCusName, setErrorCusName] = useState("");
    const customerStreetRef = useRef();
    const [errorCusStreet, setErrorCusStreet] = useState("");
    const customerCityRef = useRef();
    const [errorCusCity, setErrorCusCity] = useState("");
    const quantityRef = useRef();
    const [errorCusQuant, setErrorCusQuant] = useState("");
    const concretdGradeRef = useRef();
    const [errorCusConGrade, setErrorCusConGrade] = useState("");
    const degreeOfExposureRef = useRef();
    const [errorCusDegExp, setErrorCusDegExp] = useState("");
    const [errorPump, setErrorPump] = useState("");
    const [errorNewCus, setErrorNewCus] = useState("");
    const [errorKindCon, setErrorKindCon] = useState("");
    const [eroorMessage, setErrorMessage] = useState("");

    const currentQuantityRef = useRef();


    const [idIn, setidIn] = useState();
    const [nameCus, setNameCus] = useState();
    const [stayed, setStayed] = useState();

    const collec = collection(firestore, "invoices");

    const Allinvoos = GetTrucks("invoices");
    const getAllShippings = GetTrucks("shipping");

    const [shwoHidePrint, setShowHidePrint] = useState(false);
    const [errorMessageDriverTruck, setErrorMessageDriverTruck] = useState("");

    const i = 0;
    const styleTabelLinsRefs = useRef([]);

    useEffect(() => {
        setInvData2(getLastinvoice());
    }, [getLastinvoice()])

    function handelShowDisable(isShow) {
        setShowTruck(isShow)
    }

    function handelShowDisableDriver(isShow) {
        setShowDriver(isShow)
    }

    function handelShowDisablePump(isShow) {
        setShowPump(isShow)
    }

    function handelShowDisableNewCus(isShow) {
        setShowNewCus(isShow)
    }

    const [truck, setTruck] = useState();
    const getTruck = (truck_id) => {
        setTruck(truck_id);
    }

    const [driver, setDriver] = useState();
    const getDriver = (truck_id) => {
        setDriver(truck_id);
    }

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

    const componentRef = useRef();

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


    const handelAddInfo = async () => {
        let counterInvoices = AllInvoices.length + 1;
        let newData = {};
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
                invoices_quantity: quantityRef.current.value,
                invoices_concretd_grade: concretdGradeRef.current.value,
                invoices_kind_material: dropValue1,
                invoices_kind_type_of_concrete: dropValue2,
                invoices_kind_egree_of_Exposure: degreeOfExposureRef.current.value,
                invoices_pump: pump,
                provide: 0,
                stayed: quantityRef.current.value - 0,
                invoices_data: currentdate
            };
        }
        else {
            setErrorCusId("");
            setErrorCusName("");
            setErrorCusStreet("");
            setErrorCusCity("");
            if (!customerIdRef.current.value || customerIdRef.current.value.length > 10) {
                return setErrorCusId("!رقم الزبون اكثر من 10 ارقام او ليس لديه قيمة");
            }
            if (!customerNameRef.current.value || customerNameRef.current.value.length > 16) {
                return setErrorCusName("!اسم الزبون اكثر من 16 حرف او ليس لديه قيمة");
            }
            if (!customerStreetRef.current.value || customerStreetRef.current.value.length > 10) {
                return setErrorCusStreet("!اسم الشارع اكثر من 10 حرف او ليس لديه قيمة");
            }
            if (!customerCityRef.current.value || customerCityRef.current.value.length > 10) {
                return setErrorCusCity("!اسم البلد اكثر من 10 حرف او ليس لديه قيمة");
            }
            setErrorCusId("");
            setErrorCusName("");
            setErrorCusStreet("");
            setErrorCusCity("");

            newData = {
                invoices_id: counterInvoices,
                invoices_customer_id: customerIdRef.current.value,
                invoices_customer_name: customerNameRef.current.value,
                invoices_customer_street: customerStreetRef.current.value,
                invoices_customer_city: customerCityRef.current.value,
                invoices_quantity: quantityRef.current.value,
                invoices_concretd_grade: concretdGradeRef.current.value,
                invoices_kind_material: dropValue1,
                invoices_kind_type_of_concrete: dropValue2,
                invoices_kind_egree_of_Exposure: degreeOfExposureRef.current.value,
                invoices_pump: pump,
                provide: 0,
                stayed: quantityRef.current.value - 0,
                invoices_data: currentdate
            };
        }
        setErrorCusQuant("");
        setErrorCusConGrade("");
        setErrorCusDegExp("");
        setErrorPump("");
        setErrorKindCon("");
        if (!quantityRef.current.value) {
            return setErrorCusQuant("!لم يتم ادخال للطلب الاجمالي قيمة");

        }
        if (!concretdGradeRef.current.value) {
            return setErrorCusConGrade("!لم يتم ادخال لمستوى الماء قيمة");

        }
        if (!degreeOfExposureRef.current.value) {
            return setErrorCusDegExp("!لم يتم ادخال ضغط البطون قيمة");
        }
        if (!pump) {
            return setErrorPump("!لم يتم اختيار اي مضخة خرسانة");
        }
        if (!dropValue1 || !dropValue2) {
            return setErrorKindCon("!لم يتم اخيار نوع البطون");
        }
        setErrorCusQuant("");
        setErrorCusConGrade("");
        setErrorCusDegExp("");
        setErrorPump("");
        setErrorKindCon("");

        setInvData(newData);
        let NewcustomersList = {
            customer_id: customerIdRef.current?.value,
            customer_name: customerNameRef.current?.value,
            customer_street: customerStreetRef.current?.value,
            customer_city: customerCityRef.current?.value
        }
        try {
            await addDoc(collec, newData);
            !newCus && await addDoc(collection(firestore, "customers"), NewcustomersList)
        }
        catch (e) {
            console.log(e);
        }
        setidIn(counterInvoices);
        newCus ? setNameCus(customer.customer_name) : setNameCus(customerNameRef.current?.value);
        setStayed(quantityRef.current.value - 0);
        setPump(null);
        setNewCus(null);
        setCustomer(null);
    }
    const handelAddShpping = async () => {
        let counterShipps = getAllShippings.length + 1;
        setErrorMessageDriverTruck("");
        if (!truck || !driver) {
            return setErrorMessageDriverTruck("!لم يتم اختيار خلاطه او سائق");
        }
        setErrorMessageDriverTruck("");
        if (isClickedInList && !(invData?.provide >= invData?.invoices_quantity)) {
            if (currentQuantityRef.current.value > (invData?.invoices_quantity - invData?.provide)) {
                return setErrorMessage("خطاء,الكمية المزودة اعلى من الطلب الاجمالي!")
            }
            let shippingData = {
                shipp_id: counterShipps,
                current_quantity: currentQuantityRef.current.value,
                driver_name: driver,
                invoice_id: invData?.invoices_id,
                shipping_date: currenttime,
                truck_number: truck
            };
            setCurrentQuantity(currentQuantityRef.current?.value);
            setShippingToPrint(shippingData);
            try {
                await addDoc(collection(firestore, "shipping"), shippingData);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            if (currentQuantityRef.current.value > (getLastinvoice()?.invoices_quantity - getLastinvoice()?.provide)) {
                return setErrorMessage("خطاء,الكمية المزودة اعلى من الطلب الاجمالي!")
            }
            let shippingData = {
                shipp_id: counterShipps,
                current_quantity: currentQuantityRef.current.value,
                driver_name: driver,
                invoice_id: getLastinvoice()?.invoices_id,
                shipping_date: currenttime,
                truck_number: truck
            };
            setCurrentQuantity(currentQuantityRef.current?.value);
            setShippingToPrint(shippingData);
            try {
                await addDoc(collection(firestore, "shipping"), shippingData);
            }
            catch (e) {
                console.log(e);
            }
            setIsClickedInList(false);
        }
        setShowHidePrint(true);
        setErrorMessage("");
    }
    function compareByAge(a, b) {
        return b.invoices_id - a.invoices_id;
    }

    function compareByInvo(a, b) {
        return a.invoices_id - b.invoices_id;
    }
    function getLastinvoice() {
        let listInvoices = Allinvoos;
        listInvoices.sort(compareByInvo);
        for (let index = listInvoices.length - 1; index >= 0; index--) {
            if ((listInvoices[index].invoices_quantity - listInvoices[index].provide) != 0) {
                return listInvoices[index];
            }
        }
    }
    function checkIfThereOpenedInvo() {
        let listInvoices = Allinvoos;
        if (!listInvoices.length) {
            return false;
        }
        for (let index = 0; index < listInvoices.length; index++) {
            if ((listInvoices[index]?.invoices_quantity - listInvoices[index]?.provide) > 0) {
                return true;
            }
        }
        return false;
    }
    const inDataRef = useRef();
    const handelAddPrint = async () => {

        let sumAllCurrentQuant1 = 0;
        let sumAllCurrentQuant2 = 0;
        let sumSameShippings1 = 1;
        let sumSameShippings2 = 1;
        if (isClickedInList) {
            for (let index = 0; index < getAllShippings.length; index++) {
                if (getAllShippings[index].invoice_id == invData.invoices_id) {
                    sumAllCurrentQuant2 += parseFloat(getAllShippings[index].current_quantity);
                    sumSameShippings1++;
                }
            }
            const newData = {
                id: invData.id,
                invoices_id: invData.invoices_id,
                invoices_customer_id: invData.invoices_customer_id,
                invoices_customer_name: invData.invoices_customer_name,
                invoices_customer_street: invData.invoices_customer_street,
                invoices_customer_city: invData.invoices_customer_city,
                invoices_quantity: invData.invoices_quantity,
                invoices_concretd_grade: invData.invoices_concretd_grade,
                invoices_kind_material: invData.invoices_kind_material,
                invoices_kind_type_of_concrete: invData.invoices_kind_type_of_concrete,
                invoices_kind_egree_of_Exposure: invData.invoices_kind_egree_of_Exposure,
                invoices_pump: invData.invoices_pump,
                provide: sumAllCurrentQuant2,
                stayed: invData.stayed,
                invoices_data: currentdate
            };
            setInvData(newData);
            try {
                await updateDoc(doc(firestore, "invoices", newData.id), newData);
            }
            catch (e) {
                console.log(e);
            }
            handlePrint();
        }
        else {
            for (let index = 0; index < getAllShippings.length; index++) {
                if (getAllShippings[index].invoice_id == getLastinvoice()?.invoices_id) {
                    sumAllCurrentQuant1 += parseFloat(getAllShippings[index].current_quantity);
                    sumSameShippings2++;
                }
            }
            const newData = {
                invoices_id: getLastinvoice()?.invoices_id,
                invoices_customer_id: getLastinvoice()?.invoices_customer_id,
                invoices_customer_name: getLastinvoice()?.invoices_customer_name,
                invoices_customer_street: getLastinvoice()?.invoices_customer_street,
                invoices_customer_city: getLastinvoice()?.invoices_customer_city,
                invoices_quantity: getLastinvoice()?.invoices_quantity,
                invoices_concretd_grade: getLastinvoice()?.invoices_concretd_grade,
                invoices_kind_material: getLastinvoice()?.invoices_kind_material,
                invoices_kind_type_of_concrete: getLastinvoice()?.invoices_kind_type_of_concrete,
                invoices_kind_egree_of_Exposure: getLastinvoice()?.invoices_kind_egree_of_Exposure,
                invoices_pump: getLastinvoice()?.invoices_pump,
                provide: sumAllCurrentQuant1,
                stayed: getLastinvoice()?.stayed,
                invoices_data: currentdate
            };
            setInvData(newData);
            console.log(inDataRef.current)
            try {
                await updateDoc(doc(firestore, "invoices", getLastinvoice()?.id), newData);
            }
            catch (e) {
                console.log(e);
            }
            handlePrint();
        }
        setDriver(false);
        setTruck(false);
        setShowHidePrint(false);
        setCurrentQuantity(currentQuantityRef.current?.value)
        currentQuantityRef.current && currentQuantityRef.current.value == "";


    }
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [languge, setLanguge] = useState(false);

    const getCurrentShippingNumber = (invo) => {
        let sumSameShippings = 1;
        let listshippings = getAllShippings;
        if (!isClickedInList && getLastinvoice() != undefined) {
            for (let index = 0; index < listshippings.length; index++) {
                if (listshippings[index].invoice_id == getLastinvoice()?.invoices_id) {
                    sumSameShippings++;
                }
            }
        }
        else {
            console.log(invo)
            for (let index = 0; index < listshippings.length; index++) {
                if (listshippings[index].invoice_id == invo.invoices_id) {
                    sumSameShippings++;
                }
            }
        }
        return sumSameShippings;
    }
    const setClickedData = (invo, i) => {
        for (let index = 0; index < styleTabelLinsRefs.current?.length; index++) {
            if (styleTabelLinsRefs.current[index] === "bordering_list") {
                styleTabelLinsRefs.current[index] = "";
            }
        }
        styleTabelLinsRefs.current[i] = "bordering_list";
        setInvData(invo);
        setidIn(invo.invoices_id);
        setNameCus(invo.invoices_customer_name);
        setStayed(invo.stayed);
        setIsClickedInList(true);
        quantityRef.current?.value == invo.invoices_quantity;
        setDropValue1(invo.invoices_kind_material);
        setDropValue2(invo.invoices_kind_type_of_concrete);
        concretdGradeRef.current?.value == invo.invoices_concretd_grade;
        degreeOfExposureRef.current?.value == invo.invoices_kind_egree_of_Exposure;
    }
    useEffect(() => {
        setDropValue1(getLastinvoice()?.invoices_kind_material);
        setDropValue2(getLastinvoice()?.invoices_kind_type_of_concrete);
        setidIn(getLastinvoice()?.invoices_id);
        setNameCus(getLastinvoice()?.invoices_customer_name);
        setStayed(getLastinvoice()?.invoices_quantity - getLastinvoice()?.provide);
    }, [getLastinvoice()])

    const [drop1, setDrop1] = useState(true);
    const [dropValue1, setDropValue1] = useState(getLastinvoice()?.invoices_kind_material);
    const [drop2, setDrop2] = useState(true);
    const [dropValue2, setDropValue2] = useState(getLastinvoice()?.invoices_kind_type_of_concrete);

    return (
        <div className="rounded-3xl bg-[#f5f5f5] border-2 border-[#334155] p-10">
            {
                showTruck ? <FormBox getTruck={getTruck} showDisable={handelShowDisable} /> :
                    showDriver ? <FormBoxDriver getDriver={getDriver} showDisableDriver={handelShowDisableDriver} /> :
                        showPump ? <FormBoxConcertPump getPump={getPump} showDisableCon={handelShowDisablePump} /> :
                            showNewCus ? <FormBoxNewCus getNewCus={getNewCus} showDisableNewCus={handelShowDisableNewCus} />
                                : null
            }
            <div className="max-w- mx-auto">
                <div>
                    {
                        newShipp ?
                            <div className="flex items-center justify-end rounded-xl p-2">
                                <label class="switch">
                                    <input onChange={(e) => setNewshipp(e.target.checked)} checked={newShipp} className="toggle_check" type="checkbox" />
                                    <span class="slider round"></span>
                                </label>
                                <div className="text-xl ml-4">الطلبات الحالية</div>
                            </div>
                            :
                            <div className="flex items-center justify-end rounded-xl p-2">
                                <label class="switch">
                                    <input onChange={(e) => setNewshipp(e.target.checked)} checked={newShipp} className="toggle_check" type="checkbox" />
                                    <span class="slider round"></span>
                                </label>
                                <div className="text-xl ml-4">طلب جديد</div>
                            </div>
                    }
                </div>
                <div>
                    {
                        !newShipp &&
                        <div>
                            <div className="flex justify-end text-3xl mb-6 border-r-4 border-[#334155] bg-gray-300 p-3 mt-3 rounded-lg">المشتري</div>
                            {
                                isNewCus ?
                                    <div className="flex items-center justify-center rounded-xl p-2 mb-4">
                                        <label class="switch">
                                            <input onChange={(e) => setIsNewCus(e.target.checked)} checked={isNewCus} className="toggle_check" type="checkbox" />
                                            <span class="slider round"></span>
                                        </label>
                                        <div className="text-xl ml-4"> مشتري تقليدي</div>
                                    </div>
                                    :
                                    <div className="flex items-center justify-center rounded-xl p-2 mb-4">
                                        <label class="switch">
                                            <input onChange={(e) => setIsNewCus(e.target.checked)} checked={isNewCus} className="toggle_check" type="checkbox" />
                                            <span class="slider round"></span>
                                        </label>
                                        <div className="text-xl ml-4"> مشتري جديد</div>
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
                                                        newCus
                                                    }
                                                    &nbsp;
                                                </div>
                                                <div>
                                                    : لقد تم اختيار
                                                </div>
                                            </div>
                                            <div className="w-1/6">
                                                <button onClick={() => setNewCus(null)} class="w-full bg-white border border-[#dc2626] hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                                    <div className="text-xl font-bold text-[#dc2626]">ازالة</div>
                                                </button>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className="flex justify-center mb-7">
                                                <button onClick={() => { setShowDriver(false); setShowTruck(false); setShowPump(false); setShowNewCus(true); }} class="w-1/4 bg-white border border-black hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                    <div className="text-xl font-bold">اختر زبون</div>
                                                </button>
                                            </div>
                                            {
                                                errorNewCus && <div dir="rtl" className="text-[#dc2626] text-base">{errorNewCus}</div>
                                            }
                                        </div>
                                    :
                                    <div>
                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 w-full  mb-10 group">
                                                <input ref={customerIdRef} dir="rtl" type="number" name="customerId" id="customerId" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="رقم المشتري" required />
                                                <label dir="rtl" htmlFor="customerId" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                                            </div>
                                            <div className="relative z-0 w-full  mb-10 group">
                                                <input ref={customerNameRef} dir="rtl" type="text" name="customerName" id="customerName" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="اسم المشتري الكامل" required />
                                                <label dir="rtl" htmlFor="customerName" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 md:gap-6 border-b-gray">
                                            <div className="relative z-0 w-full  mb-10 group">
                                                <input ref={customerStreetRef} dir="rtl" type="text" name="customerStreet" id="customerStreet" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="الشارع" required />
                                                <label dir="rtl" htmlFor="customerStreet" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                                            </div>
                                            <div className="relative z-0 w-full  mb-10 group">
                                                <input ref={customerCityRef} dir="rtl" type="text" name="customerCity" id="customerCity" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="البلد" required />
                                                <label dir="rtl" htmlFor="customerCity" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                                            </div>
                                        </div>
                                        {
                                            errorCusId && <div dir="rtl" className="text-[#dc2626] text-base">{errorCusId}</div>
                                        }
                                        {
                                            errorCusName && <div dir="rtl" className="text-[#dc2626] text-base">{errorCusName}</div>
                                        }
                                        {
                                            errorCusStreet && <div dir="rtl" className="text-[#dc2626] text-base">{errorCusStreet}</div>
                                        }
                                        {
                                            errorCusCity && <div dir="rtl" className="text-[#dc2626] text-base">{errorCusCity}</div>
                                        }
                                    </div>
                            }
                            <div className="flex justify-end text-3xl mt-10 border-r-4 border-[#334155] bg-gray-300 p-3 mb-3 rounded-lg">الطلب</div>
                            <div className="flex justify-around" dir="rtl">
                                <div className="flex text-xl border-r-4 border-[#334155] bg-gray-200 p-2">
                                    <div>الفاتورة : </div>
                                    <div>{idIn ? idIn : getLastinvoice()?.invoices_id}</div>
                                </div>
                                <div className="flex text-xl border-r-4 border-[#334155] bg-gray-200 p-2">
                                    <div>الاسم : </div>
                                    <div>{nameCus ? nameCus : getLastinvoice()?.invoices_customer_name}</div>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 md:gap-6 mb-8 mt-10">
                                <div dir="rtl">
                                    <label dir="rtl" for="concretdGrade" className="">مستوى الماء : </label>
                                    <input ref={concretdGradeRef} dir="rtl" defaultValue={getLastinvoice()?.invoices_concretd_grade} type="number" name="concretdGrade" id="concretdGrade" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                </div>
                                <div dir="rtl">
                                    <label dir="rtl" for="degreeOfExposure" className="">ضغط البطون : </label>
                                    <input ref={degreeOfExposureRef} dir="rtl" defaultValue={getLastinvoice()?.invoices_kind_egree_of_Exposure} type="number" name="degreeOfExposure" id="degreeOfExposure" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                </div>
                                <div dir="rtl">
                                    <label dir="rtl" for="quantity" className="">الطلب الاجمالي : </label>
                                    <input ref={quantityRef} dir="rtl" defaultValue={getLastinvoice()?.invoices_quantity} type="text" name="quantity" id="quantity" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                                </div>
                            </div>
                            <div className="flex w-full justify-around">
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
                                                        <button onClick={() => setPump(null)} class="w-full bg-white border border-[#dc2626] hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                                            <div className="text-xl font-bold text-[#dc2626]">ازالة</div>
                                                        </button>
                                                    </div>
                                                </div>
                                                :
                                                <div className="flex justify-center">
                                                    <button onClick={() => { setShowDriver(false); setShowTruck(false); setShowPump(true); setShowNewCus(false); }} class="bg-white border border-black hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                        <div className="font-bold">اختر مضخة</div>
                                                    </button>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div dir="rtl" class="dropdown">
                                        <button onClick={() => setDrop1(false)} class="w-full bg-white border border-black hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">نوع الصرار {dropValue1} <MdKeyboardArrowDown className="text-2xl" /></button>
                                        <div className={drop1 && "hidden"}>
                                            <div class="dropdown-content">
                                                <div className="p-5 bg-white rounded-xl">
                                                    {
                                                        theList5.map(list => {
                                                            return <div className="styling_dropdwon_invo" onClick={() => { setDrop1(true); setDropValue1(list.kinds_rocks_name) }}>{list.kinds_rocks_name}</div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div dir="rtl" class="dropdown">
                                        <button onClick={() => setDrop2(false)} class="w-full bg-white border border-black hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">نوع البطون {dropValue2} <MdKeyboardArrowDown className="text-2xl" /></button>
                                        <div className={drop2 && "hidden"}>
                                            <div class="dropdown-content">
                                                <div className="p-5 bg-white rounded-xl">
                                                    {
                                                        theList6.map(list => {
                                                            return <div className="styling_dropdwon_invo" onClick={() => { setDrop2(true); setDropValue2(list.kinds_concrete_name) }}>{list.kinds_concrete_name}</div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {
                                errorCusQuant && <div dir="rtl" className="text-[#dc2626] text-base">{errorCusQuant}</div>
                            }
                            {
                                errorCusConGrade && <div dir="rtl" className="text-[#dc2626] text-base">{errorCusConGrade}</div>
                            }
                            {
                                errorCusDegExp && <div dir="rtl" className="text-[#dc2626] text-base">{errorCusDegExp}</div>
                            }
                            {
                                errorPump && <div dir="rtl" className="text-[#dc2626] text-base">{errorPump}</div>
                            }
                            {
                                errorKindCon && <div dir="rtl" className="text-[#dc2626] text-base">{errorKindCon}</div>
                            }
                            <div className="flex justify-center mb-5 mt-8">
                                <button onClick={handelAddInfo} className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">ادخال</button>
                            </div>
                        </div>
                    }
                </div>
                {
                    checkIfThereOpenedInvo()
                }
                {
                    checkIfThereOpenedInvo() ?
                        <div>
                            {
                                shwoHidePrint ?
                                    <div>
                                        <div className="flex justify-end text-3xl mt-10 border-r-4 border-[#334155] bg-gray-300 p-3 rounded-lg">طباعة الفاتورة</div>
                                        <div className="flex justify-around w-full mb-7 mt-10 p-3 items-center">
                                            <div className="flex items-center rounded-xl p-2">
                                                <label class="switch">
                                                    <input onChange={(e) => setLanguge(e.target.checked)} checked={languge} className="toggle_check" type="checkbox" />
                                                    <span class="slider round"></span>
                                                </label>
                                                <div className="text-xl ml-4"> انشاء باللغة العربية</div>
                                            </div>
                                            <button onClick={handelAddPrint} className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">طباعة</button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        {
                                            getCurrentShippingNumber(invData) > 1 ? <div className="flex justify-end text-3xl mt-10 mb-7 border-r-4 border-[#334155] bg-gray-300 p-3 rounded-lg">اضافة الارسالية رقم : {getCurrentShippingNumber(invData)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;الفاتورة رقم {idIn ? idIn : getLastinvoice()?.invoices_id}</div>
                                                :
                                                <div className="p-3 flex justify-end text-3xl mt-10 mb-7 border-r-4 border-[#334155] bg-gray-300">اضافة الارسالية رقم : 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;الفاتورة رقم {idIn ? idIn : getLastinvoice()?.invoices_id}</div>
                                        }


                                        <div className="flex justify-around w-full mt-7">
                                            <div className="">
                                                {

                                                    driver ?
                                                        <div className="flex justify-around">
                                                            <div className="text-center mr-2 flex items-center border-r-4 border-[#334155] bg-gray-200 p-2">
                                                                <div>
                                                                    {
                                                                        driver
                                                                    }
                                                                    &nbsp;
                                                                </div>
                                                                <div>
                                                                    : لقد تم اختيار
                                                                </div>
                                                            </div>
                                                            <div className="w-1/3">
                                                                <button onClick={() => setDriver(null)} class="w-full bg-white border border-[#dc2626] hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                                                    <div className="text-xl font-bold text-[#dc2626]">ازالة</div>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="">
                                                            <button onClick={() => { setShowDriver(true); setShowTruck(false); setShowPump(false); setShowNewCus(false); }} class="w-full bg-white border border-black hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                </svg>
                                                                <div className="text-xl font-bold">اختر سائق</div>
                                                            </button>
                                                        </div>
                                                }

                                            </div>
                                            <div className="">
                                                {
                                                    truck ?
                                                        <div className="flex justify-around">
                                                            <div className="text-center mr-2 flex items-center border-r-4 border-[#334155] bg-gray-200 p-2">
                                                                <div>
                                                                    {truck}
                                                                    &nbsp;
                                                                </div>
                                                                <div>
                                                                    : لقد تم اختيار
                                                                </div>
                                                            </div>
                                                            <div className="w-1/3">
                                                                <button onClick={() => setTruck(null)} class="w-full bg-white hover:bg-gray-400 border border-[#dc2626] text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                                                    <div className="text-xl font-bold text-[#dc2626]">ازالة</div>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="">
                                                            <button onClick={() => { setShowTruck(true); setShowDriver(false); setShowPump(false); setShowNewCus(false); }} class="w-full bg-white hover:bg-gray-400 border border-black text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                </svg>
                                                                <div className="text-xl font-bold">اختر الخلاطه</div>
                                                            </button>
                                                        </div>
                                                }
                                            </div>
                                            <div className="z-0 flex">
                                                <div className="flex justify-center">
                                                    <input ref={currentQuantityRef} dir="rtl" type="number" name="urrentQuantity" id="urrentQuantity" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="الكمية الحالية" required />
                                                    <label dir="rtl" htmlFor="urrentQuantity" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                                                </div>
                                            </div>
                                        </div>


                                        {
                                            errorMessageDriverTruck && <div dir="rtl" className="mt-5 text-[#dc2626] text-base">{errorMessageDriverTruck}</div>
                                        }
                                        {
                                            eroorMessage && <div className="flex justify-end mt-5">
                                                <div className="text-[#dc2626]">{eroorMessage}</div>
                                            </div>
                                        }
                                        <div className="flex justify-center mt-8 mb-8" dir="rtl">
                                            <button onClick={handelAddShpping} className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">ادخال</button>
                                        </div>
                                    </div>
                            }
                        </div>
                        :
                        null
                }
                {
                    checkIfThereOpenedInvo() ?
                        <div>
                            {
                                !shwoHidePrint &&
                                <div>
                                    <div className="flex justify-end text-3xl mt-10 mb-7 border-r-4 border-[#334155] bg-gray-300 p-3 rounded-lg">الطلبيات المفتوحة</div>

                                    <div className="w-full overflow-auto max-h-96">
                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <th className="text-xl">المتبقي</th>
                                                    <th className="text-xl">اجمالي الطلب</th>
                                                    <th className="text-xl">اسم الزبون</th>
                                                    <th className="text-xl">رقم الفاتورة</th>
                                                    <th className="text-xl">تعديل الفاتورة</th>
                                                </tr>
                                                {
                                                    AllInvoices.map((invo, i) => {
                                                        return invo.invoices_quantity - invo.provide > 0 && <tr onClick={() => { setClickedData(invo, i) }} className={!isClickedInList && getLastinvoice()?.invoices_id === invo.invoices_id ? "bordering_list" : `cursor-pointer ${styleTabelLinsRefs.current[i]}`}>{/*bordering_list*/}
                                                            <th className="text-base">{invo.invoices_quantity - invo.provide}</th>
                                                            <th className="text-base">{invo.invoices_quantity}</th>
                                                            <th className="text-base">{invo.invoices_customer_name}</th>
                                                            <th className="text-base">{invo.invoices_id}</th>
                                                            <th className="hover:bg-[#ef4444] hover:text-white" onClick={() => setShowInvoEdit(true)}><MdEditDocument className="m-auto text-xl" /></th>
                                                        </tr>
                                                    })
                                                }
                                                {
                                                    showInvoEdit ? <EditBoard showInv={() => setShowInvoEdit(false)} data={invData} /> : null
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                        </div>
                        :
                        null
                }
                <div className="hide_invioc">
                    <ComponentToPrint inewInv={invData} shippingList={shippingToPrint} currentQuan={currentQuantity} languge={languge} ref={componentRef} />
                </div>
            </div>
        </div>
    )
}