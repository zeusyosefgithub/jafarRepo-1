import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { FaWhatsapp } from "react-icons/fa";

export default function ModalEditCustomer(props) {

    const sendWhatsaap = () => {
        var phoneNumber = `+972${props.customer.customer_id.substring(1)}`;
        var url = "https://wa.me/" + phoneNumber + "?text="
            + encodeURIComponent('https://jafar-repo-1.vercel.app/') + "%0a"
            + `${props.customer.password} : الكود الخاص بك لدخول كزبون هو`;
        ;
        window.open(url, '_blank').focus();
    }

    return (
        <Modal className="test-fontt" backdrop={"blur"} size="5xl" isOpen={props.show} onClose={props.disable}>
            <ModalContent>
                <>
                    <ModalHeader className="flex justify-center">{props.customer.customer_name}</ModalHeader>
                    <ModalBody>
                        <div dir="rtl">
                            <div>
                                <Button onClick={() => { sendWhatsaap(); }} color="success" variant="bordered" className="text-sm"><FaWhatsapp className="text-2xl" />ارسال لتفاصيل الخاصة</Button>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex justify-between">
                        <Button size="lg" color="primary" onPress={props.disable}>
                            اغلاق
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}