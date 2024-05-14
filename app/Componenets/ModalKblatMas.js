import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { useRef, useState } from "react";
import { FaPlus, FaWhatsapp } from "react-icons/fa";
import GetTrucks from "./getDocs";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useReactToPrint } from "react-to-print";
import { KblatMasToPrint } from "./KblatMasPrint";

export default function ModalKblatMas({show,disable}) {

    const [msbar,setMsbar] = useState('');
    const [aoskMorshe,setAoskMorshe] = useState('');
    const [msbarkhem,setMsbarkhem] = useState('');
    const [hktsaMsbar,setHktsamsbar] = useState('');
    const [lkbod,setLkbod] = useState('');
    const [taodtZehot,setTaodtZehot] = useState('');
    const [bretem,setBrtem] = useState([{taor : '',kmot : null,shahLeheda : null}]);

    const handleChange = (index, field, value) => {
        const updatedBretem = [...bretem];
        updatedBretem[index][field] = value;
        setBrtem(updatedBretem);
    }
    const addRow = () => {
        setBrtem([...bretem, { taor: '', kmot: null, shahLeheda: null }]);
    };

    const handlePrint2KblatMas = useRef();

    const handlePrint2 = useReactToPrint({
        pageStyle: `@page {
      size: A4;
      margin: 0;
  }`,
        content: () => handlePrint2KblatMas.current,
    });

    return (
        <Modal className="test-fontt" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="flex justify-center"></ModalHeader>
                    <ModalBody>
                        <div dir="rtl" className="h-[600px] overflow-auto">
                            <Input value={msbar} onValueChange={(val) => setMsbar(val)} type="text" className="max-w-lg mt-5" label="מספר" />
                            <Input value={msbarkhem} onValueChange={(val) => setMsbarkhem(val)} type="text" className="max-w-lg mt-5" label="מספרכם" />
                            <Input value={hktsaMsbar} onValueChange={(val) => setHktsamsbar(val)} type="text" className="max-w-lg mt-5" label="הקצאה מספר" />
                            <Input value={aoskMorshe} onValueChange={(val) => setAoskMorshe(val)} type="text" className="max-w-lg mt-5" label="עוסק מורשה" />
                            <Input value={lkbod} onValueChange={(val) => setLkbod(val)} type="text" className="max-w-lg mt-5" label="לכבוד" />
                            <Input value={taodtZehot} onValueChange={(val) => setTaodtZehot(val)} type="text" className="max-w-lg mt-5" label="ת-ז" />
                            {
                                bretem.map((bret, index) => {
                                    return <div className="flex mt-10 items-center">
                                        <Input value={bret.taor} onChange={(e) => handleChange(index, 'taor', e.target.value)} type="text" className="max-w-[160px] mr-5" label="תאור פריט" />
                                        <Input value={bret.kmot} onChange={(e) => handleChange(index, 'kmot', e.target.value)} type="number" className="max-w-[160px] mr-5" label="כמות" />
                                        <Input value={bret.shahLeheda} onChange={(e) => handleChange(index, 'shahLeheda', e.target.value)} type="number" className="max-w-[160px] mr-5" label={`ש"ח ליחידה`} />
                                        {index === bretem.length - 1 && (
                                            <Button className="mr-10" onClick={addRow}>
                                                <FaPlus />
                                            </Button>
                                        )}
                                    </div>
                                })
                            }
                            <div className="hidden">
                                <KblatMasToPrint
                                    msbar={msbar}
                                    aoskMorshe={aoskMorshe}
                                    msbarKhem={msbarkhem}
                                    hktsaMsbar={hktsaMsbar}
                                    Lkbod={lkbod}
                                    taodtZehot={taodtZehot}
                                    bretem={bretem}
                                    ref={handlePrint2KblatMas} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex justify-start">
                        <Button size="lg" onClick={handlePrint2}>طباعة</Button>
                        <Button size="lg" color="primary" onPress={disable}>
                            اغلاق
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}



    