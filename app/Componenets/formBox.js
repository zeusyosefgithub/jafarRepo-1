'use client';
import { useState } from "react";
import GetTrucks from "./getDocs";
import { Button } from "@nextui-org/button";
import { MdEditDocument } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

export default function FormBox(props) {
    let trucks = GetTrucks("trucks");
    let count = 1;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Modal className="test-fontt" backdrop={"blur"} size="5xl" isOpen={props.showTruck} onClose={props.disable}>
                <ModalContent>
                    <>
                        <ModalHeader className="flex justify-center">قائمة الخلاطات</ModalHeader>
                        <ModalBody>
                            <div className="m-1 pr-5 pl-5 pb-5 bg-white rounded-xl overflow-auto h-72">
                                <table className="w-full text-center">
                                    <tbody>
                                        <tr className="border-4 border-[#334155] sticky top-0 z-10 bg-[#334155] text-white">
                                            <th><div className="text-xl">ملاحظات</div></th>
                                            <th><div className="text-xl">سائق الخلاطه</div></th>
                                            <th><div className="text-xl">رقم الخلاطه</div></th>
                                        </tr>
                                        {
                                            trucks.map(doc => {
                                                return <tr onClick={() => { props.getTruck(doc.truck_id);props.disable();}} className="border-b-2 border-black text-lg margining_table">
                                                    <th className="text-lg">{doc.truck_disc}</th>
                                                    <th className="text-lg">{doc.truck_driver}</th>
                                                    <th className="text-lg">{doc.truck_id}</th>
                                                    <th className="text-lg">{count++}</th>
                                                </tr>
                                            })
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