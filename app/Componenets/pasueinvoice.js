
import { firestore } from "../FireBase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRef } from "react";
import { useEffect,useState } from "react";
import GetTrucks from "./getDocs";
import EditBoard from "./editBoard";

export default function PasueInvoice(){

    const invoices = GetTrucks("invoices");
    const [showEdit,setShowEdit] = useState(false);
    const [invData,setInvData] = useState({});

    const [showElement, setShowElement] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowElement(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const collec = collection(firestore, "invoices");

    const handelAddPrint = () => {
    }
    return (
        <div className="rounded-3xl bg-[#f5f5f5] border-2 border-[#334155] p-10">

            <div className="m-5">
                <div className=" h-72 overflow-auto">
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <th>متبقي</th>
                                <th>تم التزويد</th>
                                <th>الطلب الاجمالي</th>
                                <th>رقم الفاتورة</th>
                                <th>المشتري</th>
                            </tr>
                            {
                                invoices.map(invo => {
                                    return <tr onClick={()  => {setShowEdit(true);setInvData(invo)}} className="margining_table">
                                        <th>{invo.invoices_stil}</th>
                                        <th>{invo.invoices_taked}</th>
                                        <th>{invo.invoices_quantity}</th>
                                        <th>{invo.invoices_id}</th>
                                        <th>{invo.invoices_customer_name}</th>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                showEdit && <EditBoard setButtonName={"التقدم"} showInv={() => setShowEdit(false)} data={invData} />
            }

        </div>
    )
}