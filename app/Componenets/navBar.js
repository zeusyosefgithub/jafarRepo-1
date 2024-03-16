'use client';
import Link from 'next/link';
import { FaHome } from "react-icons/fa";
import { IoListSharp } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import { LuPlusSquare } from "react-icons/lu";
import { GrUpdate } from "react-icons/gr";
import rep6 from "../../images/rep6.png";
import Image from 'next/image';
import LogOut from './logout';
import { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { generate } from 'generate-password';
import GetTrucks from './getDocs';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../FireBase/firebase';
export default function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    const Customers = GetTrucks('customers');
    const Invoices = GetTrucks('invoices');
    const CustomersDeatils = GetTrucks('CustomerDetails');
    const Shippings = GetTrucks('shipping');

    function GetInvoicesShippings(id) {
        let shipps = [];
        for (let index = 0; index < Shippings?.length; index++) {
            if (id === Shippings[index]?.invoice_id) {
                shipps.push(Shippings[index]);
            }
        }
        return shipps;
    }

    function GetMyInvoices(id) {
        let invoo = [];
        for (let index = 0; index < Invoices.length; index++) {
            if (id === Invoices[index].invoices_customer_id) {
                invoo.push({
                    shippings: GetInvoicesShippings(Invoices[index]?.invoices_id),
                    invoices_data: Invoices[index]?.invoices_data,
                    invoices_id: Invoices[index]?.invoices_id,
                    invoices_kind_egree_of_Exposure: Invoices[index]?.invoices_kind_egree_of_Exposure,
                    invoices_kind_material: Invoices[index]?.invoices_kind_material,
                    invoices_kind_type_of_concrete: Invoices[index]?.invoices_kind_type_of_concrete,
                    invoices_pump: Invoices[index]?.invoices_pump,
                    invoices_quantity: Invoices[index]?.invoices_quantity,
                });
            }
        }
        return invoo;
    }


    const adddd = async () => {
        for (let index = 0; index < Customers?.length; index++) {
            // await updateDoc(doc(firestore, 'customers', Customers[index]?.id), {
            //     password: generate({
            //         length: 6,
            //         numbers: true,
            //         symbols: false,
            //         uppercase: false,
            //         lowercase: true,
            //     })
            // })
            let NewcustomersList = {
                customer_id: Customers[index]?.customer_id,
                customer_name: Customers[index]?.customer_name,
                customer_city: Customers[index]?.customer_city,
                customer_street: Customers[index]?.customer_street,
                Invoices: GetMyInvoices(Customers[index]?.customer_id)
            }
            await setDoc(doc(firestore, "CustomerDetails", `${Customers[index]?.password}`), NewcustomersList);
        }
    }

    return (
        <>
            {/* <div className='items-center z-30 fixed top-0 w-full bg-[#334155] flex justify-between p-5'>
            <div className='flex justify-around w-3/6 test-fontt'>
                <Link href="/lists" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
                    <IoListSharp />
                    <button className='ml-2'>
                        القوائم
                    </button>
                </Link>

                <Link href="/processes" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
                    <LuPlusSquare />
                    <button className='ml-2'>
                        اضافة
                    </button>
                </Link>

                <Link href="/" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
                    <FaHome />
                    <button className='ml-2'>
                        الصفحة الرئيسية
                    </button>
                </Link>

                <Link href="/updates" className='flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded-xl'>
                    <GrUpdate/>
                    <button className='ml-2'>
                        تحديثات البرنامج
                    </button>
                </Link>
            </div>

            <div className='flex items-center'>

                <div className='mr-4'>
                    <LogOut />
                </div>


                <Image
                    className="rounded-lg bg-gray-300"
                    src={rep6}
                    width={90} />

            </div>
        </div> */}
            <Navbar className='bg-[#334155] p-3' dir='rtl' onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        <Image
                            className="rounded-lg bg-gray-300"
                            src={rep6}
                            width={70} />
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link className='flex items-center text-white mr-4' dir='ltr' color="foreground" href="/updates">
                            <GrUpdate className='mr-2' />تحديثات البرنامج
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link className='flex items-center text-white mr-4' dir='ltr' href="/" aria-current="page">
                            <FaHome className='mr-2' />الصفحة الرئيسية 
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className='flex items-center text-white mr-4' dir='ltr' color="foreground" href="/processes">
                            <LuPlusSquare className='mr-2' />اضافة
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className='flex items-center text-white mr-4' dir='ltr' color="foreground" href="/lists">
                            <IoListSharp className='mr-2' />القوائم
                        </Link>
                    </NavbarItem>
                    {/* <NavbarItem>
                        <Button onClick={adddd}>22</Button>
                    </NavbarItem> */}
                </NavbarContent>
                <NavbarContent justify="end">
                    <LogOut />
                </NavbarContent>
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                className="w-full"
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </>
    )
}