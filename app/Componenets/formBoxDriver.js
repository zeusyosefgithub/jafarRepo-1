'use client';
import { useState } from "react";
import GetTrucks from "./getDocs";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { AiOutlinePlus } from "react-icons/ai";


export default function FormBoxDriver(props) {

    let drivers = GetTrucks("drivers");
    let count = 1;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button size="lg" onPress={onOpen}><AiOutlinePlus />اختر سائق</Button>
            <Modal className="test-fontt" backdrop={"blur"} size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-center">قائمة السائقين</ModalHeader>
                            <ModalBody>
                                <div className="m-1 pr-5 pl-5 pb-5 bg-white rounded-xl overflow-auto h-72">
                                    <table className="w-full text-center">
                                        <tbody>
                                            <tr className="border-4 border-[#334155] sticky top-0 z-10 bg-[#334155] text-white">
                                                <th><div className="text-xl">ملاحظات</div></th>
                                                <th><div className="text-xl">اسم السائق</div></th>
                                                <th><div className="text-xl">رقم السائق</div></th>
                                            </tr>
                                            {
                                                drivers.map(doc => {
                                                    return <tr onClick={() => { props.getDriver(doc.driver_name);}} onPress={onClose} className="border-b-2 border-black text-lg margining_table">
                                                        <th className="text-lg">{doc.driver_disc}</th>
                                                        <th className="text-lg">{doc.driver_name}</th>
                                                        <th className="text-lg">{doc.driver_id}</th>
                                                        <th className="text-lg">{count++}</th>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button size="lg" color="primary" onPress={onClose}>
                                    اغلاق
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}