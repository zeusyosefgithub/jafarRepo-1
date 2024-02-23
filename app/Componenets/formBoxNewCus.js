'use client';
import { useEffect, useRef, useState } from "react";
import GetTrucks from "./getDocs";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { AiOutlinePlus } from "react-icons/ai";


export default function FormBoxNewCus(props) {

    const customers = GetTrucks("customers");
    const searchCustomer = useRef();
    const [listCus, setListCus] = useState(customers);
    let count = 1;

    const getLineCus = (customers, index) => {
        return <tr onClick={() => { props.disable(); props.getNewCus(customers[index]?.customer_id, customers[index]); }} className="border-b-2 border-black text-lg margining_table">
            <th className="text-lg">{customers[index]?.customer_street}</th>
            <th className="text-lg">{customers[index]?.customer_city}</th>
            <th className="text-lg">{customers[index]?.customer_id}</th>
            <th className="text-lg">{customers[index]?.customer_name}</th>
            <th className="text-lg">{index + 1}</th>
        </tr>
    }

    const getDefaultCus = () => {

        let listCus = [];
        for (let index = 0; index < customers?.length; index++) {
            listCus.push(getLineCus(customers, index));
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
        for (let index = 0; index < customers?.length; index++) {
            var StringName = customers[index]?.customer_name.toString();
            var StringInput = searchCustomer.current?.value.toString();
            if (StringName.startsWith(StringInput)) {
                setListCus(listCus => [...listCus, getLineCus(customers, index)]);
                getAll.push(customers[index]);
            }
        }
        for (let index = 0; index < customers?.length; index++) {
            var StringName = customers[index]?.customer_name.toString();
            var StringInput = searchCustomer.current?.value.toString();
            if (!getAll.length || !checkIfEqualCus(getAll, customers[index])) {
                if (StringName.includes(StringInput)) {
                    setListCus(listCus => [...listCus, getLineCus(customers, index)]);
                    getAll.push(customers[index]);
                }
            }
        }
    }


    return (
        <>

            <Modal className="test-fontt" backdrop={"blur"} size="5xl" isOpen={props.showCustomer} onClose={props.disable}>
                <ModalContent>
                    <>
                        <ModalHeader className="flex justify-center">قائمة الزبائن</ModalHeader>
                        <ModalBody>
                            <div dir="rtl" className="m-7 flex">
                                <div className="w-1/3 flex items-center">
                                    <Input ref={searchCustomer} onChange={GetSearchVal} label="ابحث :" />
                                </div>
                                {
                                    !listCus?.length && searchCustomer.current?.value && <div className="m-5">
                                        <Button onClick={() => { props.disable(); props.newCustomer(); }}>اضافة زبون جديد</Button>
                                    </div>
                                }
                            </div>
                            <div className="m-1 pr-5 pl-5 pb-5 bg-white rounded-xl overflow-auto h-72">
                                <table className="w-full text-center">
                                    <tbody>
                                        <tr className="border-4 border-[#334155] sticky top-0 z-10 bg-[#334155] text-white">
                                            <th><div className="text-xl">الشارع</div></th>
                                            <th><div className="text-xl">العنوان</div></th>
                                            <th><div className="text-xl">رقم الزبون</div></th>
                                            <th><div className="text-xl">اسم الزبون</div></th>
                                        </tr>
                                        {
                                            searchCustomer.current?.value
                                                ?
                                                listCus
                                                :
                                                getDefaultCus()
                                        }
                                        {
                                            !listCus?.length && searchCustomer.current?.value && <tr>
                                                <th colSpan={4} className="p-20 text-lg">لا يوجد زبائن مطابقة لبحثك يمكنك الاضافة بالضفط على الاضافة فوق</th>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button size="lg" color="primary" onClick={props.disable}>
                                اغلاق
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>

    )
}