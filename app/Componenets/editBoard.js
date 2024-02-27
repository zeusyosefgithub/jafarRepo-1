'use client';
import { deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./loadingSpin";
import { FaEdit } from "react-icons/fa";
import ReactToPrint, { PrintContextConsumer, useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./toPrint";
import GetDocum from "./getDocum";
import GetTrucks from "./getDocs";
import { FaTrash } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { FaWhatsapp } from "react-icons/fa";
import rep2 from '../../images/rep2.jpg';
import * as htmltoimage from 'html-to-image'
import { CircularProgress, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from "@nextui-org/react";
import { MdEditDocument } from "react-icons/md";
import { NextResponse } from "next/server";
import { deleteObject, ref, uploadBytes, uploadString } from "firebase/storage";
import { storage } from "../FireBase/firebase";
import { v4 } from "uuid";
import html2canvas from "html2canvas";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { useQRCode } from "next-qrcode";

export default function EditBoard(props) {


    const componentRef = useRef();

    const [type, setType] = useState();
    const [chooise, setChooise] = useState("رقم الزبون");
    const [choVal, setChoVal] = useState(props.data?.invoices_customer_id);
    const inputRef = useRef();
    const AllComponentsRefs = useRef([]);
    const AllShippings = GetTrucks("shipping");

    const [invoValueProp, setInvoValueProp] = useState({ ...props.data })
    const docInvo = GetDocum(props.data?.id);

    const [invoiceImage, setInvoiceImage] = useState(null);


    const [loading, setLoading] = useState(false);

    const [isLanguge, setIsLanguge] = useState();



    const deleteInvo = async () => {
        alert(1);
        setLoading(true);
        try {
            await deleteDoc(doc(firestore, "invoices", props.data?.id));
            for (let index = 0; index < AllShippings.length; index++) {
                if (AllShippings[index]?.invoice_id == props.data?.invoices_id) {
                    await deleteDoc(doc(firestore, "shipping", AllShippings[index]?.id))
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        //props.showInv();
        setLoading(false);
        props.disable();
    }

    function compareByAge(a, b) {
        return a.shipp_id - b.shipp_id;
    }

    useEffect(() => {
        setInvoValueProp(props.data)
    }, [props.data, choVal])

    const editInvo = async () => {
        const newData = {
            invoices_id: invoValueProp.invoices_id,
            invoices_customer_id: chooise == "رقم الزبون" ? inputRef.current.value : invoValueProp.invoices_customer_id,
            invoices_customer_name: chooise == "اسم الزبون" ? inputRef.current.value : invoValueProp.invoices_customer_name,
            invoices_customer_street: chooise == "الشارع" ? inputRef.current.value : invoValueProp.invoices_customer_street,
            invoices_quantity: chooise == "الكمية" ? inputRef.current.value : invoValueProp.invoices_quantity,
            invoices_concretd_grade: chooise == "كثافة الخرسانة" ? inputRef.current.value : invoValueProp.invoices_concretd_grade,
            invoices_kind_material: chooise == "نوع الخرسانة2" ? inputRef.current.value : invoValueProp.invoices_kind_material,
            invoices_kind_type_of_concrete: chooise == "نوع الخرسانة1" ? inputRef.current.value : invoValueProp.invoices_kind_type_of_concrete,
            invoices_kind_egree_of_Exposure: chooise == "درجة الضغط" ? inputRef.current.value : invoValueProp.invoices_kind_egree_of_Exposure,
            invoices_pump: chooise == "المضخة" ? inputRef.current.value : invoValueProp.invoices_pump,
            invoices_data: chooise == "تاريخ الفاتورة" ? inputRef.current.value : invoValueProp.invoices_data
        }
        const invId = doc(firestore, "invoices", props.data?.id)
        setLoading(true);
        try {
            await updateDoc(invId, newData);
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
        //props.showInv();
    }

    const refsImages = useRef([]);


    const sendWhatsaap = async (refImage, phone,name) => {
        setLoading(true);
        let url;
        const one = await html2canvas(refImage).then((canvas) => {
            url = canvas.toDataURL("image/png");
            //const loc = ref(storage,`files/test`);
            //uploadString(loc,url,'data_url');
        }) 
        // const respon = await fetch("/api/", {
        //     method: "GET",
        //     headers: {
        //         "content-type": "application/json",
        //     },
        // })
        // const data = await respon.json();
        // console.log(data);
        // return Response.json({data});

        const newUrl = url.split(",").pop();

        try{
            const res = await fetch("/api/", {
                method: "POST",
                body: JSON.stringify({"id": phone.substring(1),"url": newUrl,"name" : name}),
                headers: {
                    "content-type": "application/json",
                },
            })
            if (res.ok) {
                console.log("Yeai!")
            } else {
                console.log("Oops! Something is wrong.")
            }
        }
        catch(e){
            console.log(e);
        }
        setLoading(false);






        // var phoneNumber = "+972503209026";
        // var url = "https://wa.me/" + phoneNumber + "?text="
        //     + encodeURIComponent('https://firebasestorage.googleapis.com/v0/b/jafar-test.appspot.com/o/files%2Ftest?alt=media&token=d43dbf66-2217-4f76-ada9-0ff68dfb6244.png') + "%0a";
        // ;
        // window.open(url, '_blank').focus();
    }




    const handlePrint = useReactToPrint({
        content: () => AllComponentsRefs.current[componentRef.current],
    });

    const getAllToPrints = () => {
        let shippingList = AllShippings;
        let countShipps1 = [];
        for (let index = 0; index < shippingList.length; index++) {
            if (shippingList[index]?.invoice_id === props.data?.invoices_id) {
                countShipps1.push(shippingList[index]);
            }
        }
        let countShipps = countShipps1.sort(compareByAge);
        let valuesProvide = [];
        let currenvlaues = 0;
        for (let index = 0; index < countShipps.length; index++) {
            currenvlaues += parseFloat(countShipps[index].current_quantity);
            valuesProvide.push({
                id: props.data?.id,
                invoices_id: props.data?.invoices_id,
                invoices_customer_id: props.data?.invoices_customer_id,
                invoices_customer_name: props.data?.invoices_customer_name,
                invoices_customer_street: props.data?.invoices_customer_street,
                invoices_customer_city: props.data?.invoices_customer_city,
                invoices_quantity: props.data?.invoices_quantity,
                invoices_concretd_grade: props.data?.invoices_concretd_grade,
                invoices_kind_material: props.data?.invoices_kind_material,
                invoices_kind_type_of_concrete: props.data?.invoices_kind_type_of_concrete,
                invoices_kind_egree_of_Exposure: props.data?.invoices_kind_egree_of_Exposure,
                invoices_pump: props.data?.invoices_pump,
                provide: currenvlaues,
                stayed: props.data?.stayed,
                invoices_data: props.data?.invoices_data
            })

        }
        let takeAllPrints = [];
        for (let index = 0; index < countShipps.length; index++) {
            takeAllPrints.push(
                <div className="mb-10 w-full">
                    <div className="text-center text-xl border-r-4 border-[#334155] bg-gray-200">{index + 1} الطلبية رقم</div>
                    <div className="border-r-4 border-[#334155] bg-gray-200 pb-3 respon_shipping_edit_borad">
                        <div ref={el => refsImages.current[index] = el}>
                            <ComponentToPrint isLocated={countShipps[index]?.location ? true : false} languge={isLanguge} currentTruck={index + 1} currentQuan={countShipps[index].current_quantity} shippingList={countShipps[index]} inewInv={valuesProvide[index]} ref={el => AllComponentsRefs.current[index] = el} />
                        </div>
                        <div className="flex justify-around mt-5 mb-5 items-center">
                            <div className="flex items-center">
                                <label class="switch">
                                    <input onChange={(e) => setIsLanguge(e.target.checked)} checked={isLanguge} className="toggle_check" type="checkbox" />
                                    <span class="slider round"></span>
                                </label>
                                <div className="ml-2">تحويل بالعربي</div>
                            </div>
                            <div>
                                <button onClick={() => { deleteMyShipp(index) }} className="px-4 ml-2 py-2 text-black border-2 border-black bg-white hover:text-white hover:bg-[#dc2626] text-2xl font-medium rounded-md">حذف</button>
                            </div>
                            <div>
                                <button onClick={() => { componentRef.current = index, handlePrint(); }} className="px-4 ml-2 py-2 text-black border-2 border-black bg-white hover:text-white hover:bg-black text-2xl font-medium rounded-md">
                                    {props.setButtonName ? props.setButtonName : "طباعة"}
                                </button>
                            </div>
                            <div>
                                <Button onClick={() => sendWhatsaap(refsImages.current[index], valuesProvide[index].invoices_customer_id,valuesProvide[index].invoices_customer_name)} color="success" variant="bordered" className="text-sm"><FaWhatsapp className="text-2xl" /> ارسال رسالة</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return takeAllPrints;

    }

    const getNumberShipps = () => {
        let count = 0;
        for (let index = 0; index < AllShippings.length; index++) {
            if (props?.data.invoices_id === AllShippings[index].invoice_id) {
                count++;
            }
        }
        return count;
    }

    const statusinvoice = () => {
        if ((props.data?.invoices_quantity - props.data?.provide) == 0) {
            return <div className="text-xl text-[#dc2626]">مغلقة</div>
        }
        else {
            return <div className="text-xl text-green-600">قيد العمل</div>
        }
    }

    const getListShipps = () => {
        let myShipps = [];
        for (let index = 0; index < AllShippings.length; index++) {
            if (props.data?.invoices_id == AllShippings[index]?.invoice_id) {
                myShipps.push(AllShippings[index]);
            }
        }
        return myShipps;
    }

    const getAllPropByNumber = (num) => {
        let newlist = getListShipps().sort(compareByAge);
        for (let index = 0; index < newlist.length; index++) {
            if (index == num) {
                return newlist[index];
            }
        }
        return null;
    }

    const deleteMyShipp = async (num) => {
        const invId = doc(firestore, "invoices", props.data?.id);
        const newInvo = {
            id: props.data?.id,
            invoices_id: props.data?.invoices_id,
            invoices_customer_id: props.data?.invoices_customer_id,
            invoices_customer_name: props.data?.invoices_customer_name,
            invoices_customer_street: props.data?.invoices_customer_street,
            invoices_customer_city: props.data?.invoices_customer_city,
            invoices_quantity: props.data?.invoices_quantity,
            invoices_concretd_grade: props.data?.invoices_concretd_grade,
            invoices_kind_material: props.data?.invoices_kind_material,
            invoices_kind_type_of_concrete: props.data?.invoices_kind_type_of_concrete,
            invoices_kind_egree_of_Exposure: props.data?.invoices_kind_egree_of_Exposure,
            invoices_pump: props.data?.invoices_pump,
            provide: (props.data.provide -= getAllPropByNumber(num)?.current_quantity),
            stayed: props.data?.stayed,
            invoices_data: props.data?.invoices_data
        }
        try {
            await updateDoc(invId, newInvo);
            await deleteDoc(doc(firestore, "shipping", getAllPropByNumber(num)?.id))
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Modal className="test-fontt" backdrop={"blur"} size="5xl" isOpen={props.showInvoEdit} onClose={props.disable}>
                <ModalContent>
                    <>
                        <ModalHeader className="flex justify-center">الفاتورة رقم {props.data?.invoices_id}</ModalHeader>
                        <ModalBody>
                            {loading && <Spinner className="fixed left-1/2 top-1/2 z-50" size="lg" />}
                            <div className="flex flex-col items-center text-center">
                                <div dir="rtl" className="flex w-full items-center">
                                    <div className="ml-1 text-black leading-relaxed text-right text-xl">حالة الفاتورة :</div>
                                    {
                                        statusinvoice()
                                    }
                                </div>
                            </div>
                            <div className="m-1 p-5 bg-white rounded-xl overflow-auto highting_edit_Board">

                                <div className="bg-slate-200 p-7 pr-10 rounded-tl-xl rounded-bl-xl border-r-5 border-[#334155]">
                                    <table className="w-full text-center">
                                        <tbody>
                                            <tr className="border-2 border-[#334155]">
                                                <th><div className="text-xl">المضخة</div></th>
                                                <th><div className="text-xl">الشارع</div></th>
                                                <th><div className="text-xl">اسم الزبون</div></th>
                                                <th><div className="text-xl">رقم الزبون</div></th>
                                                <th><div className="text-xl">تاريخ الفتورة</div></th>
                                            </tr>
                                            <tr className="">
                                                <th className="lins_edit_board" onClick={() => { setChooise("المضخة"); setChoVal(invoValueProp.invoices_pump); setType("number") }}><div className="text-lg pt-2 pb-2">{docInvo.invoices_pump}</div><FaEdit className="m-auto text-xl" /></th>
                                                <th className="lins_edit_board" onClick={() => { setChooise("الشارع"); setChoVal(invoValueProp.invoices_customer_street); setType("text") }}><div className="text-lg pt-2 pb-2">{docInvo.invoices_customer_street}</div><FaEdit className="m-auto text-xl" /></th>
                                                <th className="lins_edit_board" onClick={() => { setChooise("اسم الزبون"); setChoVal(invoValueProp.invoices_customer_name); setType("text") }}><div className="text-lg pt-2 pb-2">{docInvo.invoices_customer_name}</div><FaEdit className="m-auto text-xl" /></th>
                                                <th className="lins_edit_board" onClick={() => { setChooise("رقم الزبون"); setChoVal(invoValueProp.invoices_customer_id); setType("number") }}><div className="text-lg pt-2 pb-2">{docInvo.invoices_customer_id}</div><FaEdit className="m-auto text-xl" /></th>
                                                <th className="lins_edit_board" onClick={() => { setChooise("تاريخ الفاتورة"); setChoVal(invoValueProp.invoices_data); setType("text") }}><div className="text-lg pt-2 pb-2">{docInvo.invoices_data}</div><FaEdit className="m-auto text-xl" /></th>
                                            </tr>
                                            <tr className="border-2 border-[#334155]">
                                                <th><div className="text-xl">كثافة الخرسانة</div></th>
                                                <th><div className="text-xl">درجة الضغط</div></th>
                                                <th><div className="text-xl">نوع الخرسانة</div></th>
                                                <th><div className="text-xl">نوع الخرسانة</div></th>
                                                <th><div className="text-xl">الكمية</div></th>
                                            </tr>
                                            <tr>
                                                <th className="lins_edit_board" onClick={() => { setChooise("كثافة الخرسانة"); setChoVal(invoValueProp.invoices_concretd_grade); setType("number") }}><div className="text-lg pt-2 pb-2">{docInvo.invoices_concretd_grade}</div><FaEdit className="m-auto text-xl" /></th>
                                                <th className="lins_edit_board" onClick={() => { setChooise("درجة الضغط"); setChoVal(invoValueProp.invoices_kind_egree_of_Exposure); setType("number") }}><div className="text-lg pt-2 pb-2">{docInvo.invoices_kind_egree_of_Exposure}</div><FaEdit className="m-auto text-xl" /></th>
                                                <th className="lins_edit_board" onClick={() => { setChooise("نوع الخرسانة1"); setChoVal(invoValueProp.invoices_kind_type_of_concrete); setType("text") }}><div className="text-lg pt-2 pb-2">{docInvo.invoices_kind_type_of_concrete}</div><FaEdit className="m-auto text-xl" /></th>
                                                <th className="lins_edit_board" onClick={() => { setChooise("نوع الخرسانة2"); setChoVal(invoValueProp.invoices_kind_material); setType("text") }}><div className="text-lg pt-2 pb-2">{docInvo.invoices_kind_material}</div><FaEdit className="m-auto text-xl" /></th>
                                                <th className="lins_edit_board" onClick={() => { setChooise("الكمية"); setChoVal(invoValueProp.invoices_quantity); setType("number") }}><div className="text-lg pt-2 pb-2">{docInvo.invoices_quantity}</div><FaEdit className="m-auto text-xl" /></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-10 mb-10"></div>
                                <div className="bg-slate-200 p-7 pr-10 rounded-tl-xl rounded-bl-xl border-r-5 border-[#334155]">
                                    <div dir="rtl" className="mb-2 text-xl">تم اختيار تعديل : {chooise}</div>
                                    <div className="flex justify-between items-center">
                                        <div className="m-auto mr-20">
                                            <button onClick={editInvo} className="px-4 ml-2 py-2 text-black border-2 border-black bg-white hover:text-white hover:bg-black text-2xl font-medium rounded-md">
                                                تعديل
                                            </button>
                                        </div>
                                        <div className="w-full">
                                            <Input onChange={(e) => setChoVal(e.target.value)} value={choVal} ref={inputRef} dir="rtl" type={type} />
                                        </div>
                                    </div>
                                </div>
                                {
                                    getListShipps().length > 0 && <>
                                        <div className="bg-[#334155] h-1 mt-10 mb-10"></div>
                                        <div className="flex justify-center text-xl">جميع الطلبيات</div>
                                        <div dir="rtl" className="mb-3">عدد الطلبيات الكلي : {getNumberShipps()}</div>
                                        <div className="mt-10 mb-10"></div>
                                        <div dir='rtl' className="mb-10">
                                            <table dir="rtl" className="w-full">
                                                <tbody>
                                                    <tr>
                                                        <th className="text-xl"></th>
                                                        <th className="text-xl">الارسالية رقم</th>
                                                        <th className="text-xl">الطلب الاجمالي</th>
                                                        <th className="text-xl">الذي تم تزويدة</th>
                                                        <th className="text-xl">الطلب الحالي</th>
                                                    </tr>
                                                    {
                                                        getListShipps().map((shipp, i) => {
                                                            return <tr className="items-center mt-3">
                                                                <th onClick={() => { deleteMyShipp(i) }} className="cursor-pointer text-base p-4 hover:text-white hover:bg-[#dc2626]"><div className="flex justify-center items-center">حذف <FaTrash className="mr-2 text-xl" /></div></th>
                                                                <th className="text-base p-4">{i + 1}</th>
                                                                <th className="text-base p-4">{getAllPropByNumber(i)?.current_quantity}</th>
                                                                <th className="text-base p-4">{getAllPropByNumber(i)?.current_quantity}</th>
                                                                <th className="text-base p-4">{getAllPropByNumber(i)?.current_quantity}</th>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="bg-[#334155] h-1 mt-10 mb-10"></div>
                                        <div className="w-full m-auto">
                                            {
                                                getAllToPrints()
                                            }
                                        </div>
                                    </>
                                }
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-between">
                            <Button size="lg" onClick={deleteInvo} color="danger" variant="light">
                                حذف الفاتورة
                            </Button>
                            <Button size="lg" color="primary" onPress={props.disable}>
                                اغلاق
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    )
}