'use client';
import { useState } from "react";
import GetTrucks from "./getDocs";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

export default function FormBoxConcertPump(props) {
    let trucks = GetTrucks("concert pumps");
    let count = 1;

    return (
        <>
            
            <Modal className="test-fontt" backdrop={"blur"} size="5xl" isOpen={props.showPump} onClose={props.disable}>
                <ModalContent>
                <>
                            <ModalHeader className="flex justify-center">قائمة المضخات (משאבות)</ModalHeader>
                            <ModalBody>
                                <div className="m-1 pr-5 pl-5 pb-5 bg-white rounded-xl overflow-auto h-72">
                                    <table className="w-full text-center">
                                        <tbody>
                                            <tr className="border-4 border-[#334155] sticky top-0 z-10 bg-[#334155] text-white">
                                                <th><div className="text-xl">ملاحظات</div></th>
                                                <th><div className="text-xl">سائق المضخة</div></th>
                                                <th><div className="text-xl">رقم المضخة</div></th>
                                            </tr>
                                            {
                                                trucks.map(doc => {
                                                    return <tr onClick={() => { props.disable();props.getPump(doc.pump_id);}} className="border-b-2 border-black text-lg margining_table">
                                                        <th className="text-lg">{doc.pump_disc}</th>
                                                        <th className="text-lg">{doc.pump_d_name}</th>
                                                        <th className="text-lg">{doc.pump_id}</th>
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