'use client';
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import GetTrucks from "./getDocs";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@nextui-org/button";
import { Checkbox, CheckboxGroup, Input, Radio, RadioGroup, Switch } from "@nextui-org/react";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import InvoiceNumber from "../MathComponents/InvoicesNumber";
import QuantityPrice from "../MathComponents/QuantityPrice";
import ShippingProps from "../MathComponents/ShippingProps";
import { Pie } from "react-chartjs-2";

import { Chart as chartJS } from 'chart.js/auto';
import Circle from "../MathComponents/Circle";

export default function FormBoxReport(props) {

    const endMaterials = ['بطون 400','طينة مبلولة','طينة ناشفة','دحوس','بطون 300','اسمنتيت','هربتسا'];

    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let currentdate = `${day}/${month}/${year}`;

    const [kindReport, setKindReport] = useState('');
    const [kindReportKind, setKindReportKind] = useState("");
    const [mathTime, setMathTime] = useState('');
    const [kindMathTime, setKindMathTime] = useState('');

    const [toDayState, setToDayState] = useState('');
    const [acoToTo, setToTo] = useState('');

    const [elements, setElements] = useState(null);
    const [math, setMath] = useState(['الكمية', 'السعر']);

    const [reportName, setReportName] = useState('');

    const Invoices = GetTrucks('invoices');
    const Shipping = GetTrucks('shipping');
    const Reports = GetTrucks('ReportsChoises');
    const KindsConncert = GetTrucks('kinds concrete');

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
            else {
                array2.push(splitString[index]);
            }
        }
        let lastStr = "";
        for (let index = 0; index < array2?.length; index++) {
            lastStr += array2[index];
        }
        return lastStr;
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
    const GetCurrentPrice = (val4) => {
        for (let index = 0; index < KindsConncert?.length; index++) {
            if (val4 === 'طينة ناشفة' && KindsConncert[index]?.kinds_concrete_name === 'طينة') {
                return KindsConncert[index]?.priceN;
            }
            else if (val4 === 'طينة مبلولة' && KindsConncert[index]?.kinds_concrete_name === 'طينة') {
                return KindsConncert[index]?.priceM;
            }
            else if (KindsConncert[index]?.kinds_concrete_name === val4) {
                return KindsConncert[index]?.price;
            }
        }
    }




    const wichProcMath = () => {
        if (kindReport === "رسم بياني"){
            return Circle(mathTime, kindMathTime, Invoices, elements, KindsConncert, toDayState, acoToTo,false);
        }
        else if (kindReport === 'دائرة') {
            return Circle(mathTime, kindMathTime, Invoices, elements, KindsConncert, toDayState, acoToTo,true);
        }
        else if (kindReport === 'جدول') {
            if (elements === 'المواد النهائية') {
                let resualt = [];
                for (let index = 0; index < endMaterials?.length; index++) {
                    resualt.push(QuantityPrice(mathTime, kindMathTime, Invoices, endMaterials[index], GetCurrentPrice(endMaterials[index]), toDayState, acoToTo, math,true));
                }
                return resualt;
            }
            else if(elements === 'المبيعات'){
                let resualt = [];
                for (let index = 0; index < endMaterials?.length; index++) {
                    resualt.push(QuantityPrice(mathTime, kindMathTime, Invoices, endMaterials[index], GetCurrentPrice(endMaterials[index]), toDayState, acoToTo, math,false));
                }
                return resualt;
            }
            else if (elements === 'عدد الفواتير') {
                return InvoiceNumber(mathTime, kindMathTime, Invoices, elements, toDayState, acoToTo);
            }
            else if (elements === 'عدد الارساليات') {
                return ShippingProps(mathTime, kindMathTime, Shipping, elements, Invoices, toDayState, acoToTo);
            }
            else {
                return QuantityPrice(mathTime, kindMathTime, Invoices, elements, GetCurrentPrice(elements), toDayState, acoToTo, math);
            }
        }


    }

    const currectInvoiceId = () => {
        let maxValue = 0;
        for (let index = 0; index < Reports?.length; index++) {
            maxValue = Math.max(maxValue, Reports[index]?.idRep)
        }
        return maxValue + 1;
    }

    const SaveReport = async () => {
        const Data = {
            elements: elements,
            first_time: toDayState,
            idRep: currectInvoiceId(),
            kind: kindReport,
            kind_two: kindReportKind,
            last_time: acoToTo,
            math: math,
            record_time: mathTime,
            RebortName: `${kindReport} ${elements} ${GetTypeTimeCurrectArbic(kindMathTime)} ${GetTypeTimeWords(mathTime)}`,
            type_time: kindMathTime,
            date: currentdate
        }
        await addDoc(collection(firestore, "ReportsChoises"), Data);
        props.disable();
    }

    const updateReport = async() => {
        props.disable();
    }

    const deleteReport = async() => {
        await deleteDoc(doc(firestore, "ReportsChoises", props.report.id));
        props.disable();
    }

    const GetTypeTimeCurrectArbic = (val) => {
        return val === 'يوم' ? 'اليومية' :
            val === 'شهر' ? 'الشهرية' :
                val === 'سنة' ? 'السنوية' : null
        // val === 'من - الى' ? '' :
    }

    const GetTypeTimeWords = (val) => {
        return val === 'تلقائي' ? '(تلقائي)' :
            val === 'محدد' && kindMathTime === 'يوم' ? toDayState :
                val === 'محدد' && kindMathTime === 'شهر' ? toDayState :
                    val === 'محدد' && kindMathTime === 'سنة' ? toDayState :
                        val === 'محدد' && kindMathTime === "من - الى" ? `${toDayState}-${acoToTo}` : null
    }

    props.isCurrentRep ? () => {
        setKindReport(props.report.kind);
        setKindReportKind(props.report.kind_two);
        setMathTime(props.report.record_time);
        setKindMathTime(props.report.type_time);
        setToDayState(props.report.first_time);
        setToTo(props.report.last_time);
        setElements(props.report.elements);
        setMath(props.report.math);
        setReportName(props.report.RebortName);
    }
        :
        null

    props.isCurrentRep && useEffect(() => {
        setKindReport(props.report.kind);
        setKindReportKind(props.report.kind_two);
        setMathTime(props.report.record_time);
        setKindMathTime(props.report.type_time);
        setToDayState(props.report.first_time);
        setToTo(props.report.last_time);
        setElements(props.report.elements);
        setMath(props.report.math);
        setReportName(props.report.RebortName);
    }, [props])


    return (
        <div className="w-full md:w-9/12 mx-auto fixed z-10 top-32 right-0 left-0 border-2 border-[#334155] rounded-xl">
            <div className="flex flex-col p-5 rounded-lg shadow bg-[#f5f5f5]">
                <div className="flex flex-col items-center text-center">
                    <h2 className="mt-2 font-semibold text-black text-xl">اضافة تقرير جديد</h2>
                </div>
                <div className="m-1 pr-5 pl-5 pb-5 bg-white rounded-xl overflow-auto form_Box_Charts_Reports">
                    <div className="flex">
                        <div className="w-1/2">
                            <div className="text-sm flex justify-center m-5 text-black bg-gray-400 rounded-xl" dir="rtl">
                                <div className="m-2">رقم التقرير : {currectInvoiceId()}</div>
                                <div className="m-2">اسم التقرير : {kindReport} {elements} {GetTypeTimeCurrectArbic(kindMathTime)} {GetTypeTimeWords(mathTime)}</div>
                            </div>
                            <div className="flex justify-center">

                                <table className="overflow-auto">
                                    {
                                        kindReport === 'جدول' && <tbody>
                                            <tr>
                                                <th className="text-base">اصغر قيمة</th>
                                                <th className="text-base">اكبر قيمة</th>
                                                <th className="text-base">المعدل</th>
                                                <th className="text-base">المجموع</th>
                                                <th className="text-base">العناصر</th>
                                            </tr>
                                            {
                                                wichProcMath()
                                            }
                                        </tbody>
                                    }
                                </table>
                                {
                                    (kindReport === 'دائرة' || kindReport === "رسم بياني") && wichProcMath()
                                }
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-center m-4 text-xl text-black p-3 bg-gray-400 rounded-xl">
                                العناصر
                            </div>
                            <div className="flex w-full justify-end mb-4">
                                <div dir="rtl" className="mr-10 ml-10 mt-4">
                                    <div className="flex items-end mb-5">
                                        <div className="ml-4">حساب التاريخ : </div>
                                        <Dropdown dir="rtl" className="test-fontt">
                                            <DropdownTrigger>
                                                <Button size="sm">{mathTime}<IoIosArrowDown className="text-xl" /></Button>
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => { setMathTime("تلقائي"); setKindMathTime(""); }}>تلقائي</DropdownItem>
                                                <DropdownItem onClick={() => { setMathTime("محدد"); setKindMathTime(""); }}>محدد</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                    {
                                        mathTime === "تلقائي" && <div className="flex items-end">
                                            <div className="ml-4">المعيار الزمني : </div>
                                            <Dropdown dir="rtl" className="test-fontt">
                                                <DropdownTrigger>
                                                    <Button size="sm">{kindMathTime}<IoIosArrowDown className="text-xl" /></Button>
                                                </DropdownTrigger>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={() => setKindMathTime("يوم")}>يوم</DropdownItem>
                                                    <DropdownItem onClick={() => setKindMathTime("شهر")}>شهر</DropdownItem>
                                                    <DropdownItem onClick={() => setKindMathTime("سنة")}>سنة</DropdownItem>
                                                    <DropdownItem onClick={() => setKindMathTime("الزمن الكلي")}>الزمن الكلي</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    }
                                    {
                                        mathTime === "محدد" && <div className="flex items-end mb-3">
                                            <div className="ml-4">المعيار الزمني : </div>
                                            <Dropdown dir="rtl" className="test-fontt">
                                                <DropdownTrigger>
                                                    <Button size="sm">{kindMathTime}<IoIosArrowDown className="text-xl" /></Button>
                                                </DropdownTrigger>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={() => setKindMathTime("يوم")}>يوم</DropdownItem>
                                                    <DropdownItem onClick={() => setKindMathTime("شهر")}>شهر</DropdownItem>
                                                    <DropdownItem onClick={() => setKindMathTime("سنة")}>سنة</DropdownItem>
                                                    <DropdownItem onClick={() => setKindMathTime("من - الى")}>من - الى</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    }
                                    {
                                        kindMathTime === "يوم" && mathTime === "محدد" && <div className="flex items-end">
                                            <label dir="rtl" for="AcoToDay" className="text-base ml-5">حسب اليوم : </label>
                                            <input onChange={(e) => setToDayState(e.target.value)} dir="rtl" type="text" name="AcoToDay" id="AcoToDay" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder={currentdate} required />
                                        </div>
                                    }
                                    {
                                        kindMathTime === "شهر" && mathTime === "محدد" && <div className="flex items-end">
                                            <label dir="rtl" for="AcoToMonth" className="text-base ml-5">حسب الشهر : </label>
                                            <input onChange={(e) => setToDayState(e.target.value)} dir="rtl" type="text" name="AcoToMonth" id="AcoToMonth" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder={getJustMonth(currentdate)} required />
                                        </div>
                                    }
                                    {
                                        kindMathTime === "سنة" && mathTime === "محدد" && <div className="flex items-end">
                                            <label dir="rtl" for="AcoToYear" className="text-base ml-5">حسب السنة : </label>
                                            <input onChange={(e) => setToDayState(e.target.value)} dir="rtl" type="text" name="AcoToYear" id="AcoToYear" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder={getJustYear(currentdate)} required />
                                        </div>
                                    }
                                    {
                                        kindMathTime === "من - الى" && mathTime === "محدد" && <div>
                                            <div className="flex items-end">
                                                <label dir="rtl" for="AcoToFrom" className="text-base ml-5">من : </label>
                                                <input onChange={(e) => setToDayState(e.target.value)} dir="rtl" type="text" name="AcoToFrom" id="AcoToFrom" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder={currentdate} required />
                                            </div>
                                            <div className="flex items-end">
                                                <label dir="rtl" for="AcoToTo" className="text-base ml-5">الى : </label>
                                                <input onChange={(e) => setToTo(e.target.value)} dir="rtl" type="text" name="AcoToTo" id="AcoToTo" className="block py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder={currentdate} required />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="">
                                    <div dir="rtl" className="">
                                        <div className="flex items-end m-5">
                                            <div className="ml-4">نوع التقرير : </div>
                                            <Dropdown dir="rtl" className="test-fontt">
                                                <DropdownTrigger>
                                                    <Button size="sm">{kindReport}<IoIosArrowDown className="text-xl" /></Button>
                                                </DropdownTrigger>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={() => { setKindReport("رسم بياني"); setKindReportKind(""); setElements(null); }}>رسم بياني</DropdownItem>
                                                    <DropdownItem onClick={() => { setKindReport("دائرة"); setKindReportKind(""); setElements(null); }}>دائرة</DropdownItem>
                                                    <DropdownItem onClick={() => { setKindReport("جدول"); setKindReportKind(""); setElements(null); }}>جدول</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                        {
                                            kindReport === 'جدول' &&
                                            <div className="flex items-end m-5">
                                                <div className="ml-4">نوع الجدول : </div>
                                                <Dropdown dir="rtl" className="test-fontt">
                                                    <DropdownTrigger>
                                                        <Button size="sm">{kindReportKind}<IoIosArrowDown className="text-xl" /></Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => setKindReportKind("جدول عام")}>جدول عام</DropdownItem>
                                                        <DropdownItem onClick={() => setKindReportKind("جدول المواد")}>جدول المواد</DropdownItem>
                                                        <DropdownItem onClick={() => setKindReportKind("جدول الزبائن")}>جدول الزبائن</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex justify-center m-4 text-xl text-black p-3 bg-gray-400 rounded-xl">
                                    العناصر
                                </div>
                                {
                                    kindReport === 'جدول' && kindReportKind === 'جدول المواد' &&

                                    <RadioGroup
                                        defaultValue={elements}
                                        dir="rtl"
                                        onValueChange={(value) => {
                                            setElements(value);
                                        }}
                                    >
                                        <Radio value='المبيعات'>&nbsp;&nbsp;&nbsp;المبيعات</Radio>
                                        <Radio isDisabled value='المصروفات'>&nbsp;&nbsp;&nbsp;المصروفات</Radio>
                                        <Radio isDisabled value='الارباح'>&nbsp;&nbsp;&nbsp;الارباح</Radio>
                                        <Radio value='المواد النهائية'>&nbsp;&nbsp;&nbsp;المواد النهائية</Radio>
                                        <Radio isDisabled value='المواد الخام'>&nbsp;&nbsp;&nbsp;المواد الخام</Radio>
                                    </RadioGroup>
                                }
                                {
                                    kindReport === 'جدول' && kindReportKind === 'جدول الزبائن' &&

                                    <RadioGroup
                                        defaultValue={elements}
                                        dir="rtl"
                                        onValueChange={(value) => {
                                            setElements(value);
                                        }}
                                    >
                                        <Radio value='زبون محدد'>&nbsp;&nbsp;&nbsp;زبون محدد</Radio>
                                        {
                                            elements === 'زبون محدد' && <Input className="m-3 w-72" label='اسم الزبون' />
                                        }
                                        <Radio value='كل الزبائن'>&nbsp;&nbsp;&nbsp;كل الزبائن</Radio>
                                    </RadioGroup>
                                }
                                {
                                    kindReport === 'دائرة' &&
                                    <RadioGroup
                                        defaultValue={elements}
                                        dir="rtl"
                                        onValueChange={(value) => {
                                            setElements(value);
                                        }}
                                    >
                                        <Radio value='اسعار المواد النهائية'>&nbsp;&nbsp;&nbsp;اسعار المواد النهائية</Radio>
                                        <Radio isDisabled value='اسعار المواد الخام'>&nbsp;&nbsp;&nbsp;اسعار المواد الخام</Radio>
                                        <Radio value='كمية المواد النهائية (كوب)'>&nbsp;&nbsp;&nbsp;كمية المواد النهائية (كوب)</Radio>
                                        <Radio isDisabled value='كمية المواد الخام الصلبة (طن)'>&nbsp;&nbsp;&nbsp;كمية المواد الخام الصلبة (طن)</Radio>
                                        <Radio isDisabled value='كمية المواد الخام الصلبة (كيلو)'>&nbsp;&nbsp;&nbsp;كمية المواد الخام الصلبة (كيلو)</Radio>
                                        <Radio isDisabled value='كمية المواد الخام السائلة (كوب)'>&nbsp;&nbsp;&nbsp;كمية المواد الخام السائلة (كوب)</Radio>
                                        <Radio isDisabled value='كمية المواد الخام السائلة (لتر)'>&nbsp;&nbsp;&nbsp;كمية المواد الخام السائلة (لتر)</Radio>
                                    </RadioGroup>
                                }
                                {
                                    kindReport === 'رسم بياني' &&
                                    <RadioGroup
                                        defaultValue={elements}
                                        dir="rtl"
                                        onValueChange={(value) => {
                                            setElements(value);
                                        }}
                                    >
                                        <Radio value='اسعار المواد النهائية'>&nbsp;&nbsp;&nbsp;اسعار المواد النهائية</Radio>
                                        <Radio isDisabled value='اسعار المواد الخام'>&nbsp;&nbsp;&nbsp;اسعار المواد الخام</Radio>
                                        <Radio value='كمية المواد النهائية (كوب)'>&nbsp;&nbsp;&nbsp;كمية المواد النهائية (كوب)</Radio>
                                        <Radio isDisabled value='كمية المواد الخام الصلبة (طن)'>&nbsp;&nbsp;&nbsp;كمية المواد الخام الصلبة (طن)</Radio>
                                        <Radio isDisabled value='كمية المواد الخام الصلبة (كيلو)'>&nbsp;&nbsp;&nbsp;كمية المواد الخام الصلبة (كيلو)</Radio>
                                        <Radio isDisabled value='كمية المواد الخام السائلة (كوب)'>&nbsp;&nbsp;&nbsp;كمية المواد الخام السائلة (كوب)</Radio>
                                        <Radio isDisabled value='كمية المواد الخام السائلة (لتر)'>&nbsp;&nbsp;&nbsp;كمية المواد الخام السائلة (لتر)</Radio>
                                    </RadioGroup>
                                }

                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex items-center mt-3">
                    <button onClick={() => props.disable()} className="flex-1 px-4 py-2 bg-[#334155] hover:bg-yellow-600 text-white text-2xl font-medium rounded-md">
                        الغاء
                    </button>
                    {
                        props.isCurrentRep && <>
                            <div className="mr-16 ml-16" />
                            <button onClick={deleteReport} className="flex-1 px-4 py-2 bg-[#334155] hover:bg-[#ef4444] text-white text-2xl font-medium rounded-md">
                                حذف
                            </button>
                        </>
                    }
                    <div className="mr-16 ml-16" />
                    {
                        props.isCurrentRep ?
                            <button onClick={updateReport} className="flex-1 px-4 py-2 bg-[#334155] hover:bg-green-800 text-white text-2xl font-medium rounded-md">
                                حفظ التغييرات
                            </button>
                            :
                            <button onClick={SaveReport} className="flex-1 px-4 py-2 bg-[#334155] hover:bg-green-800 text-white text-2xl font-medium rounded-md">
                                حفظ
                            </button>
                    }

                </div>
            </div>
        </div>
    )
}