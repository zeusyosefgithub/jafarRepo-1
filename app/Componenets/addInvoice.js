'use client';
import { useEffect, useRef, useState } from "react";
import { addDoc, collection} from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import FormBoxConcertPump from "./formBoxConcertPump";
import FormBoxNewCus from "./formBoxNewCus";
import GetTrucks from "./getDocs";
import { Button } from "@nextui-org/button";
import { IoMdArrowForward } from "react-icons/io";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input } from "@nextui-org/react";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";



export default function AddInvoice() {

    const [invData, setInvData] = useState();
    const theList5 = GetTrucks("kinds rocks").sort(compareByAge);
    const theList6 = GetTrucks("kinds concrete").sort(compareByAge);
    const [showPump, setShowPump] = useState(false);
    const [showNewCus, setShowNewCus] = useState(false);
    const [isNewCus, setIsNewCus] = useState(true);
    const customerIdRef = useRef();
    const [errorCusId, setErrorCusId] = useState("");
    const [errorSameNameCus, setErrorSameNameCus] = useState("");
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
    const collec = collection(firestore, "invoices");
    const AllCustomers = GetTrucks("customers");


    const [disableByTypeCon,setDisableByTypeCon] = useState(false);
    const [disableJustPump,setDisableJustPump] = useState(false);
    const [isAutoDate,setIsAutoDate] = useState(false);
    const [autoDateVal,setAutoDateVal] = useState('');

    const [isWithPump,setIsWithPump] = useState(false);

    function handelShowDisablePump(isShow) {
        setShowPump(isShow)
    }

    function handelShowDisableNewCus(isShow) {
        setShowNewCus(isShow)
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
                invoices_kind_material: disableByTypeCon ? '---' : dropValue1.kinds_rocks_name,
                invoices_kind_type_of_concrete: dropValue2.kinds_concrete_name,
                invoices_kind_egree_of_Exposure: degreeOfExposureRef.current.value,
                invoices_pump: disableJustPump ? '---' : pump,
                provide: 0,
                stayed: quantityRef.current.value - 0,
                invoices_data: isAutoDate ? autoDateVal : currentdate
            };
        }
        else {
            setErrorSameNameCus("");
            setErrorCusId("");
            setErrorCusName("");
            setErrorCusStreet("");
            setErrorCusCity("");
            if (checkIfIsEqualCustomer(customerIdRef.current?.value, customerNameRef.current?.value)) {
                return setErrorSameNameCus("الزبون الذي تم ادخالة موجود بالفعل !");
            }
            if (!customerIdRef.current.value || customerIdRef.current.value.length > 10) {
                return setErrorCusId("!رقم الزبون اكثر من 10 ارقام او ليس لديه قيمة");
            }
            if (!customerNameRef.current.value || customerNameRef.current.value.length > 25) {
                return setErrorCusName("!اسم الزبون اكثر من 16 حرف او ليس لديه قيمة");
            }
            if (!customerStreetRef.current.value || customerStreetRef.current.value.length > 10) {
                return setErrorCusStreet("!اسم الشارع اكثر من 10 حرف او ليس لديه قيمة");
            }
            if (!customerCityRef.current.value || customerCityRef.current.value.length > 10) {
                return setErrorCusCity("!اسم البلد اكثر من 10 حرف او ليس لديه قيمة");
            }
            setErrorSameNameCus("");
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
                invoices_kind_material: disableByTypeCon ? '---' : dropValue1.kinds_rocks_name,
                invoices_kind_type_of_concrete: dropValue2.kinds_concrete_name,
                invoices_kind_egree_of_Exposure: degreeOfExposureRef.current.value,
                invoices_pump: disableJustPump ? '---' : pump,
                provide: 0,
                stayed: quantityRef.current.value - 0,
                invoices_data: isAutoDate ? autoDateVal : currentdate
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
        setPump(null);
        setNewCus(null);
        setCustomer(null);
        setIsNewCus(true);
        setDropValue1(null);
        setDropValue2(null);
        setDisableByTypeCon(false);
        concretdGradeRef.current.value = "";
        degreeOfExposureRef.current.value = "";
        quantityRef.current.value = "";
    }
    function compareByAge(a, b) {
        return b.invoices_id - a.invoices_id;
    }

    const [dropValue1, setDropValue1] = useState(null);
    const [dropValue2, setDropValue2] = useState(null);


    const checkToDisable = (val) => {
        if(val === 'طينة' || val === 'اسمنتيت' || val === 'هربتسا'){
            setDisableByTypeCon(true);
            setPump(null);
            setDisableJustPump(true);
            setDropValue1(null);
            setIsWithPump(false);
        }
        else{
            setDisableByTypeCon(false);
            if(isWithPump && dropValue2){
                setDisableJustPump(false);
                setIsWithPump(false);
            }
            else if(!isWithPump && dropValue2){
                setDisableJustPump(true);
                setIsWithPump(true);
            }
        }
    }

    return (
        <div className="rounded-3xl bg-[#f5f5f5] border-2 border-[#334155] p-10">
            {
                showPump ? <FormBoxConcertPump getPump={getPump} showDisableCon={handelShowDisablePump} /> :
                    showNewCus ? <FormBoxNewCus newCustomer={() => setIsNewCus(false)} getNewCus={getNewCus} showDisableNewCus={handelShowDisableNewCus} />
                        : null
            }
            {
                console.log(AllInvoices)
            }
            <div className="max-w- mx-auto">
                <div>
                    <div>
                        <div dir="rtl">
                            {
                                isAutoDate ?
                                <Button onClick={() => setIsAutoDate(false)}>تاريخ يدوي</Button> :
                                <Button onClick={() => setIsAutoDate(true)}>تاريخ تلقائي</Button>
                            }
                            {
                                isAutoDate && 
                                <div className="flex items-center">
                                    <Input value={autoDateVal} onValueChange={(val) => {setAutoDateVal(val)}} color="primary" size="lg" className="w-1/4 m-5" label="تاريخ يدوي"/>
                                    <div>تنبيه !! : التاريخ يجب ان يكون بدون اصفار في بداية الارقام مثال ({currentdate})</div>
                                </div>
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
                                                    newCus
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
                                            <Button size="lg" onClick={() => {setShowPump(false); setShowNewCus(true); }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                                <div className="text-xl font-bold">اختر زبون</div>
                                            </Button>
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
                                        errorSameNameCus && <div dir="rtl" className="text-[#dc2626] text-base">{errorSameNameCus}</div>
                                    }
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
                        <div className="grid md:grid-cols-3 md:gap-6 mb-8 mt-10">
                            <div dir="rtl">
                                <label dir="rtl" for="concretdGrade" className="">مستوى الماء : </label>
                                <input ref={concretdGradeRef} dir="rtl" type="number" name="concretdGrade" id="concretdGrade" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                            </div>
                            <div dir="rtl">
                                <label dir="rtl" for="degreeOfExposure" className="">ضغط البطون : </label>
                                <input ref={degreeOfExposureRef} dir="rtl" type="number" name="degreeOfExposure" id="degreeOfExposure" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                            </div>
                            <div dir="rtl">
                                <label dir="rtl" for="quantity" className="">الطلب الاجمالي : </label>
                                <input ref={quantityRef} dir="rtl" type="text" name="quantity" id="quantity" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" required />
                            </div>
                        </div>
                        <div className="flex w-full justify-around items-center">
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
                                                        <CiCirclePlus onClick={() => {setIsWithPump(false);checkToDisable(dropValue2.kinds_concrete_name);}} className="text-[#84cc16] text-4xl rounded-none cursor-pointer" />
                                                        :
                                                        !isWithPump && dropValue2 ? 
                                                        <CiCircleMinus onClick={() => {setIsWithPump(true);checkToDisable(dropValue2.kinds_concrete_name);}} className="text-[#ef4444] text-4xl rounded-none cursor-pointer" />
                                                        : 
                                                        null
                                                    }
                                                </div>
                                                <div className="flex justify-center">
                                                    <Button isDisabled={disableJustPump} size="lg" onClick={() => { setShowPump(true); setShowNewCus(false); }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                        <div className="font-bold">اختر مضخة</div>
                                                    </Button>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                            <Dropdown dir="rtl" className="test-fontt">
                                <DropdownTrigger>
                                    <Button
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
                                            return <DropdownItem onClick={() => {setDropValue1(list) }} key={list.arbic}>{list.arbic}</DropdownItem>
                                        })
                                    }
                                </DropdownMenu>
                            </Dropdown>

                            <Dropdown dir="rtl" className="test-fontt">
                                <DropdownTrigger>
                                    <Button
                                        size="lg"
                                        className="z-0 capitalize"
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
                                            return <DropdownItem onClick={() => {setDropValue2(list);checkToDisable(list.kinds_concrete_name);}} key={list.arbic}>{list.arbic}</DropdownItem>
                                        })
                                    }
                                </DropdownMenu>
                            </Dropdown>
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
                </div>
            </div>
        </div>
    )
}