import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { useRef, useState } from "react";
import rep6 from "../../images/rep6.png";
import Link from "next/link";
import { GrUpdate } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { LuPlusSquare } from "react-icons/lu";
import { IoListSharp } from "react-icons/io5";
import Image from "next/image";
import LogOut from "./logout";
import GetTrucks from "./getDocs";
import { FiArrowRight } from "react-icons/fi";
import { ComponentToPrint } from "./toPrint";
import html2canvas from "html2canvas";
import { Invoiceimage } from "./Invoiceimage";
import { CiLogout } from "react-icons/ci";


export default function CustomerLogin(props) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "التفاصيل الشخصية",
        "الطلبيات",
        "Activity",
        "Analytics"
    ];


    function getAllPropDate(date) {
        let day = "";
        let month = "";
        let year = "";

        let count1 = 0;
        let count2 = 0;
        let count3 = 0;

        for (let index = 0; index < date.length; index++) {
            if (date[index] == "/") {
                count1++;
            }
            else if (count1 == 0) {
                day += date[index];
            }
        }
        for (let index = 0; index < date.length; index++) {
            if (date[index] == "/") {
                count2++;
            }
            else if (count2 == 1) {
                month += date[index];
            }
        }
        for (let index = 0; index < date.length; index++) {
            if (date[index] == "/") {
                count3++;
            }
            else if (count3 == 2) {
                year += date[index];
            }
        }
        return { day: parseFloat(day), month: parseFloat(month), year: parseFloat(year) }
    }

    function sortDateInvoice(a, b) {
        let bb = `${getAllPropDate(b.invoices_data)?.year}-${getAllPropDate(b.invoices_data)?.month}-${getAllPropDate(b.invoices_data)?.day}`;
        let aa = `${getAllPropDate(a.invoices_data)?.year}-${getAllPropDate(a.invoices_data)?.month}-${getAllPropDate(a.invoices_data)?.day}`;
        return new Date(bb) - new Date(aa);
    }


    const CustomersDetails = GetTrucks('CustomerDetails');

    let customerProps = {};

    function GetCustomerInvoices(pass) {
        let iinvoices = null;
        for (let index = 0; index < CustomersDetails.length; index++) {
            if (CustomersDetails[index].id === pass) {
                iinvoices = CustomersDetails[index].Invoices.sort(sortDateInvoice);
                customerProps = {
                    customer_city : CustomersDetails[index].customer_city,
                    customer_id : CustomersDetails[index].customer_id,
                    customer_name : CustomersDetails[index].customer_name,
                    customer_street : CustomersDetails[index].customer_street,
                }
            }
        }
        return iinvoices;
    }


    const CustomerInvoices = GetCustomerInvoices(props.Data.id);

    const [invoice, setInvoice] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);

    const downloadImageInvoice = async (imageFileName,ref) => {
        const canvasss = await html2canvas(ref,{ scale: 2 }).then(function (canvas){
            const image = canvas.toDataURL("image/png", 1.0);
            downloadImage(image, imageFileName);
        });
    }

    const downloadImage = (blob, fileName) => {
        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;
        fakeLink.href = blob;
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
        fakeLink.remove();
    };

    const reff = useRef([]);

    let provide = 0;

    return (
        <div className="">
            <div className="flex justify-end m-5">
            <Button dir="ltr" onClick={() => props.disable()} color="danger" size="sm" variant="flat">
                <CiLogout className="mr-3 text-xl" />تسجيل خروج
            </Button>

            </div>
            <div className="flex justify-center mt-10">
                <div>

                </div>

                {
                    showInvoice ?
                        <div>
                            <div className="flex justify-center">
                                <Button onClick={() => { setInvoice(null); setShowInvoice(null); }}>الصفحة السابقة<FiArrowRight /></Button>
                            </div>
                            <div className="mt-10">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>تنزيل</th>
                                            <th className="w-fit">تاريخ الطلب</th>
                                            <th>الكمية المطلوبة</th>
                                        </tr>
                                        {
                                            invoice.shippings.map((ship, index) => {
                                                console.log(invoice);
                                                provide += parseFloat(ship?.current_quantity);
                                                return <>
                                                    <div className={`w-max absolute clipped`}>
                                                        <Invoiceimage customer={customerProps} provide={provide} ref={el => reff.current[index] = el} isLocated={ship?.location ? true : false} languge={false} currentTruck={index + 1} currentQuan={ship?.current_quantity} shippingList={ship} inewInv={invoice} />
                                                    </div>
                                                    <tr>
                                                        <th><Button size="sm" onClick={() => downloadImageInvoice(`${invoice.invoices_id}-${ship.shipp_id}.png`,reff.current[index])}>تنزيل</Button></th>
                                                        <th className="w-fit">{ship.shipping_date.replace("/", ' - ')}</th>
                                                        <th>{ship.current_quantity}</th>
                                                    </tr>
                                                </>
                                            })
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        :
                        <>
                            <table>
                                <tbody>
                                    <tr>
                                        <th className="p-5">نوع البطون</th>
                                        <th className="p-5">اجمالي الطلب</th>
                                        <th className="p-5">تاريخ الفاتورة</th>
                                        <th className="p-5">رقم الفاتورة</th>
                                    </tr>
                                    {
                                        CustomerInvoices?.map((cus) => {
                                            return <tr className="cursor-pointer" onClick={() => { setInvoice(cus); setShowInvoice(true) }}>
                                                <th className="p-5">{cus.invoices_kind_type_of_concrete}</th>
                                                <th className="p-5">{cus.invoices_quantity}</th>
                                                <th className="p-5">{cus.invoices_data}</th>
                                                <th className="p-5">{cus.invoices_id}</th>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </>
                }



            </div>
        </div>
    )
}