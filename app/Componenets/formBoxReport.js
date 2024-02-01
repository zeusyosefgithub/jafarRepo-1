'use client';
import React from "react";
import { useRef, useState } from "react";
import GetTrucks from "./getDocs";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@nextui-org/button";
import { Checkbox, CheckboxGroup, Input, Radio, RadioGroup, Switch } from "@nextui-org/react";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import InvoiceNumber from "../MathComponents/InvoicesNumber";
import QuantityPrice from "../MathComponents/QuantityPrice";
import ShippingProps from "../MathComponents/ShippingProps";
import { Pie } from "react-chartjs-2";

import { Chart as chartJS } from 'chart.js/auto';
import Circle from "../MathComponents/Circle";

export default function FormBoxReport(props) {

    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let currentdate = `${day}/${month}/${year}`;

    const [kindReport, setKindReport] = useState('');
    const [kindReportKind, setKindReportKind] = useState("");
    const [mathTime, setMathTime] = useState('');
    const [kindMathTime, setKindMathTime] = useState('');

    const [toDayState,setToDayState] = useState('');
    const [acoToTo,setToTo] = useState('');

    const [elements,setElements] = useState(null);
    const [math,setMath] = useState(['الكمية','السعر']);

    const [reportName,setReportName] = useState('');

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
            if(val4 === 'طينة ناشفة' && KindsConncert[index]?.kinds_concrete_name === 'طينة'){
                return KindsConncert[index]?.priceN;
            }
            else if(val4 === 'طينة مبلولة' && KindsConncert[index]?.kinds_concrete_name === 'طينة'){
                return KindsConncert[index]?.priceM;
            }
            else if(KindsConncert[index]?.kinds_concrete_name === val4){
                return KindsConncert[index]?.price;
            }
        }
    }




    const wichProcMath = (typeTime, Time, ele) => {
        if (kindReport === 'دائرة') {
            return Circle(typeTime, Time, Invoices, ele, KindsConncert, toDayState, acoToTo);
        }
        else if (kindReport === 'جدول') {
            if (ele === 'عدد الفواتير') {
                return InvoiceNumber(typeTime, Time, Invoices, ele, toDayState, acoToTo);
            }
            else if (ele === 'عدد الارساليات') {
                return ShippingProps(typeTime, Time, Shipping, ele, Invoices, toDayState, acoToTo);
            }
            else {
                return QuantityPrice(typeTime, Time, Invoices, ele, GetCurrentPrice(ele), toDayState, acoToTo, math);
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

    const SaveReport = async() => {
        const Data = {
            elements : elements,
            first_time : toDayState,
            idRep : currectInvoiceId(),
            kind : kindReport,
            kind_two : kindReportKind,
            last_time : acoToTo,
            math : math,
            record_time : mathTime,
            RebortName : reportName,
            type_time : kindMathTime,
            date: currentdate
        }
        await addDoc(collection(firestore, "ReportsChoises"), Data);
        props.disable();
    }
    



    return (
        <div className="w-full md:w-9/12 mx-auto fixed z-10 top-32 right-0 left-0 border-2 border-[#334155] rounded-xl">
            <div className="flex flex-col p-5 rounded-lg shadow bg-[#f5f5f5]">
                <div className="flex flex-col items-center text-center">
                    <h2 className="mt-2 font-semibold text-black text-xl">اضافة تقرير جديد</h2>
                </div>
                <div className="m-1 pr-5 pl-5 pb-5 bg-white rounded-xl overflow-auto form_Box_Charts_Reports">
                    <div className="flex">
                        <div className="w-1/2 border-r-2 border-black">
                            {
                                kindReport === 'جدول' && elements?.length && (mathTime === "تلقائي" || mathTime === "محدد") &&
                                <div className="flex justify-center m-5" dir="rtl">
                                    <CheckboxGroup
                                    defaultValue={['الكمية','السعر']}
                                    onValueChange={(value) => {
                                        setMath(value)
                                    }}
                                    >
                                        <div className="flex">
                                            <div>اظهار فقط : </div>
                                            <Checkbox value='الكمية'>الكمية</Checkbox>
                                            <Checkbox value='السعر'>السعر</Checkbox>
                                        </div>
                                    </CheckboxGroup>
                                </div>
                            }
                            <div className="flex justify-center">

                                <table className="overflow-auto">
                                    {
                                        kindReport === 'جدول' && elements?.length && (mathTime === "تلقائي" || mathTime === "محدد") && <tbody>
                                            <tr>
                                                <th className="text-base">اصغر قيمة</th>
                                                <th className="text-base">اكبر قيمة</th>
                                                <th className="text-base">المعدل</th>
                                                <th className="text-base">المجموع</th>
                                                <th className="text-base">العناصر</th>
                                            </tr>
                                            {
                                                elements?.map((ele, i) => {
                                                    return wichProcMath(mathTime, kindMathTime, ele, i);
                                                })
                                            }
                                        </tbody>
                                    }
                                </table>
                                {
                                    kindReport === 'دائرة' && wichProcMath(mathTime, kindMathTime, elements)
                                }
                            </div>
                        </div>
                        <div className="w-full">
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
                                        <div className="m-5 flex text-xl">
                                            <div className="ml-3">التقرير رقم</div>
                                            <div>{currectInvoiceId()}</div>
                                        </div>
                                        <Input className="m-5" value={reportName} size="sm" onValueChange={(value) => { setReportName(value) }} type="text" label="اسم التقرير" />
                                        <div className="flex items-end mb-5">
                                            <div className="ml-4">نوع التقرير : </div>
                                            <Dropdown dir="rtl" className="test-fontt">
                                                <DropdownTrigger>
                                                    <Button size="sm">{kindReport}<IoIosArrowDown className="text-xl" /></Button>
                                                </DropdownTrigger>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={() => { setKindReport("رسم بياني"); setKindReportKind("");setElements(null); }}>رسم بياني</DropdownItem>
                                                    <DropdownItem onClick={() => { setKindReport("دائرة"); setKindReportKind("");setElements(null); }}>دائرة</DropdownItem>
                                                    <DropdownItem onClick={() => { setKindReport("جدول"); setKindReportKind(""); setElements(null);}}>جدول</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                        {
                                            kindReport === "رسم بياني" && <div className="flex items-end">
                                                <div className="ml-4">نوع الرسم البياني : </div>
                                                <Dropdown dir="rtl" className="test-fontt">
                                                    <DropdownTrigger>
                                                        <Button size="sm">{kindReportKind}<IoIosArrowDown className="text-xl" /></Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => setKindReportKind("خطوط")}>خطوط</DropdownItem>
                                                        <DropdownItem onClick={() => setKindReportKind("اعمدة")}>اعمدة</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        }
                                        {
                                            kindReport === "دائرة" && <div className="flex items-end">
                                                <div className="ml-4">نوع الدائرة : </div>
                                                <Dropdown dir="rtl" className="test-fontt">
                                                    <DropdownTrigger>
                                                        <Button size="sm">{kindReportKind}<IoIosArrowDown className="text-xl" /></Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => setKindReportKind("حلقة")}>حلقة</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        }
                                        {
                                            kindReport === "جدول" && <div className="flex items-end">
                                                <div className="ml-4">نوع ال{kindReport} : </div>
                                                <Dropdown dir="rtl" className="test-fontt">
                                                    <DropdownTrigger>
                                                        <Button size="sm">{kindReportKind}<IoIosArrowDown className="text-xl" /></Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => setKindReportKind("جدول شامل")}>جدول شامل</DropdownItem>
                                                        <DropdownItem onClick={() => setKindReportKind("جدول الزبائن")}>جدول الزبائن</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="border-t-2 border-black">
                                <div className="flex justify-center m-4 text-xl">
                                    العناصر
                                </div>
                                {
                                    kindReport === 'جدول' &&
                                    <CheckboxGroup

                                        dir="rtl"
                                        onValueChange={(value) => {
                                            setElements(value);
                                        }}>
                                       
                                            <div className="flex justify-around">
                                            <div>
                                                <div className="m-5">
                                                    عام
                                                </div>
                                                <Checkbox value='عدد الفواتير'>&nbsp;&nbsp;&nbsp;عدد الفواتير</Checkbox>
                                                <br />
                                                <Checkbox value='عدد الارساليات'>&nbsp;&nbsp;&nbsp;عدد الارساليات</Checkbox>
                                                <br />
                                                <Checkbox isDisabled value='اجمالي المبيعات'>&nbsp;&nbsp;&nbsp;اجمالي المبيعات</Checkbox>
                                                <br />
                                                <Checkbox isDisabled value='عدد الزبائن'>&nbsp;&nbsp;&nbsp;عدد الزبائن</Checkbox>
                                                <br />
                                                <Checkbox isDisabled value='اجمالي المصروفات'>&nbsp;&nbsp;&nbsp;اجمالي المصروفات</Checkbox>
                                                <br />
                                                <Checkbox isDisabled value='اجمالي الارباح'>&nbsp;&nbsp;&nbsp;اجمالي الارباح</Checkbox>
                                                <br />

                                            </div>
                                            <div>
                                                <div className="m-5">
                                                    بطون
                                                </div>
                                                <Checkbox value='بطون 300'>&nbsp;&nbsp;&nbsp;بطون 300</Checkbox>
                                                <br />
                                                <Checkbox value='بطون 400'>&nbsp;&nbsp;&nbsp;بطون 400</Checkbox>
                                                <br />
                                                <Checkbox value='اسمنتيت'>&nbsp;&nbsp;&nbsp;اسمنتيت</Checkbox>
                                                <br />
                                                <Checkbox value='هربتسا'>&nbsp;&nbsp;&nbsp;هربتسا</Checkbox>
                                                <br />
                                                <Checkbox value='طينة مبلولة'>&nbsp;&nbsp;&nbsp;طينة مبلولة</Checkbox>
                                                <br />
                                                <Checkbox value='طينة ناشفة'>&nbsp;&nbsp;&nbsp;طينة ناشفة</Checkbox>
                                                <br />
                                            </div>
                                            <div>
                                                <div className="m-5">
                                                    صرار
                                                </div>
                                                <Checkbox isDisabled value='اسمنت اسود'>&nbsp;&nbsp;&nbsp;اسمنت اسود</Checkbox>
                                                <br />
                                                <Checkbox isDisabled value='عدس'>&nbsp;&nbsp;&nbsp;عدس</Checkbox>
                                                <br />
                                                <Checkbox isDisabled value='سمسم'>&nbsp;&nbsp;&nbsp;سمسم</Checkbox>
                                                <br />
                                                <Checkbox isDisabled value='مودراغ'>&nbsp;&nbsp;&nbsp;مودراغ</Checkbox>
                                                <br />
                                                <Checkbox isDisabled value='سوبر'>&nbsp;&nbsp;&nbsp;سوبر</Checkbox>
                                                <br />
                                                <Checkbox isDisabled value='فولية'>&nbsp;&nbsp;&nbsp;فولية</Checkbox>
                                                <br />
                                                <Checkbox isDisabled value='رمل'>&nbsp;&nbsp;&nbsp;رمل</Checkbox>
                                                <br />
                                                <Checkbox isDisabled value='ناعمة'>&nbsp;&nbsp;&nbsp;ناعمة</Checkbox>
                                                <br />
                                                <Checkbox isDisabled value='ماء'>&nbsp;&nbsp;&nbsp;ماء</Checkbox>
                                                <br />
                                            </div>
                                        </div>
                                    </CheckboxGroup>
                                }
                                {
                                    kindReport === 'دائرة' &&
                                    <RadioGroup
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
                    <div className="mr-16 ml-16"/>
                    <button onClick={SaveReport} className="flex-1 px-4 py-2 bg-[#334155] hover:bg-green-800 text-white text-2xl font-medium rounded-md">
                        حفظ
                    </button>
                </div>
            </div>
        </div>
    )
}