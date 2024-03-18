import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import GetTrucks from "./getDocs";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";

export default function ModalEditCustomer(props) {

    const CustomersD = GetTrucks('CustomerDetails');
    const [loading,setLoading] = useState(false);

    const IsRightPhoneNumber = () => {
        const regexPhone = /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;
        if(regexPhone.test(props.customer.customer_id)){
            return true;
        }
        return false;
    }

    const CheckCustomerDetails = () => {
        for (let index = 0; index < CustomersD.length; index++) {
            if(CustomersD[index].id === props.customer.password){
                return true;
            }
        }
        return false;
    }

    const [errorPhoneNumber,setErrorPhoneNumber] = useState('');
    const [errorCustomerD,setErrorCustomerD] = useState('');

    const sendWhatsaap = () => {
        setErrorPhoneNumber('');
        setErrorCustomerD('');
        if(!IsRightPhoneNumber()){
            return setErrorPhoneNumber('رقم الهاتف الخاص بهذا الزبون غير صحيح يجب تعديلة !!');
        }
        if(!CheckCustomerDetails()){
            return setErrorCustomerD('حدث خطاء لايمكن ارسال تفاصيل هذا الزبون على واتس اب !!');
        }
        setErrorPhoneNumber('');
        setErrorCustomerD('');
        var phoneNumber = `+972${props.customer.customer_id.substring(1)}`;
        var url = "https://wa.me/" + phoneNumber + "?text="
            + encodeURIComponent('https://jafar-repo-1.vercel.app/') + "%0a"
            + `${props.customer.password} : الكود الخاص بك لدخول كزبون هو`;
        ;
        window.open(url, '_blank').focus();
    }

    const deleteDitails = async() => {
        setLoading(true);
        for (let index = 0; index < CustomersD.length; index++) {
            if(CustomersD[index].customer_id === props.customer.customer_id){
                await deleteDoc(doc(firestore, "CustomerDetails", CustomersD[index].id));
            }
        }
        setLoading(false);
    }

    return (
        <Modal className="test-fontt" backdrop={"blur"} size="5xl" isOpen={props.show} onClose={props.disable}>
            <ModalContent>
                <>
                    {loading && <Spinner className="absolute left-0 right-0 ml-auto mr-auto"/>}
                    <ModalHeader className="flex justify-center">{props.customer.customer_name}</ModalHeader>
                    <ModalBody>
                        <div dir="rtl">
                            <div>
                                <Button onClick={() => { sendWhatsaap(); }} color="success" variant="bordered" className="text-sm"><FaWhatsapp className="text-2xl" />ارسال التفاصيل الخاصة</Button>
                            </div>
                            {
                                errorPhoneNumber && <div className="text-right text-danger">{errorPhoneNumber}</div>
                            }
                            {
                                errorCustomerD && <div className="text-right text-danger">{errorCustomerD}</div>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex justify-start">
                        <Button onClick={() => {props.deleteCus(props.customer.id);deleteDitails();props.disable();}} size="lg" color="danger" variant="bordered">حذف الزبون</Button>
                        <Button size="lg" color="primary" onPress={props.disable}>
                            اغلاق
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}