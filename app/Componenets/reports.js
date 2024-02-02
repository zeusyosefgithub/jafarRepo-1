import { Button } from '@nextui-org/button'
import React, { useState } from 'react';
import { FiPlus } from "react-icons/fi";
import GetTrucks from './getDocs';
import { TbReportAnalytics } from "react-icons/tb";
import FormBoxReport from './formBoxReport';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../FireBase/firebase';

export default function Reports(props) {

    const listInvoices = GetTrucks('invoices');
    const [showReport,setShowReport] = useState(false);
    const Reports = GetTrucks('ReportsChoises');

    const deleteReport = async(id) => {
        await deleteDoc(doc(firestore, "ReportsChoises", id))
    }

    return (
        <div className=''>
            {
                showReport && <FormBoxReport disable={() => setShowReport(false)}/>
            }
            <div className='flex justify-around items-center bg-gray-400 rounded-lg p-2'>
                <div>
                    <Button onClick={() => setShowReport(true)}><FiPlus/>تقرير جديد</Button>
                </div>
                <div className='text-xl'>
                    التقارير
                </div>
            </div>

            <div>
                <div className="overflow-auto max-h-96 border-2 border-black">
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <th className="text-lg">عرض التقرير</th>
                                <th className="text-lg">صيفة الوقت</th>
                                <th className="text-lg">نوع التقرير</th>
                                <th className="text-lg">اسم التقرير</th>
                                <th className="text-lg">الرقم</th>
                                <th className="text-lg">اختيار</th>
                            </tr>
                            {
                                Reports.map((rep,i) => {
                                    return <tr>
                                        <th><div className='flex justify-around'><Button color="danger" variant="bordered" size='sm' onClick={() => {deleteReport(rep.id)}}>حذف</Button><Button size='sm' onClick={() => props.TakeRepo(rep)}>عرض</Button></div></th>
                                        <th>{rep.record_time} - {rep.type_time}</th>
                                        <th>{rep.kind}</th>
                                        <th>{rep.RebortName}</th>
                                        <th>{rep.idRep}</th>
                                        <th className='text-2xl'><div className='flex justify-center'><TbReportAnalytics/></div></th>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}