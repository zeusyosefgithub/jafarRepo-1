import { Button } from '@nextui-org/button'
import React, { useRef, useState } from 'react';
import { FiPlus } from "react-icons/fi";
import GetTrucks from './getDocs';
import { TbReportAnalytics } from "react-icons/tb";
import FormBoxReport from './formBoxReport';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../FireBase/firebase';
import FormBoxEditReport from './FormBoxEditReport';

export default function Reports(props) {

    const listInvoices = GetTrucks('invoices');
    const [showReport,setShowReport] = useState(false);
    const Reports = GetTrucks('ReportsChoises');

    const [showEditReport,setShoEditReport] = useState(false);

    const [reportProp,setReportProp] = useState(null);
    const styleTabelLinsRefs = useRef([]);



    return (
        <div className=''>
            {
                showReport && <FormBoxReport disable={() => setShowReport(false)} isCurrentRep={showEditReport} report={reportProp}/>
            }
            <div className='flex justify-around items-center bg-gray-400 rounded-lg p-2'>
                <div>
                    <Button onClick={() => {setReportProp(null);setShoEditReport(false);setShowReport(true)}}><FiPlus/>تقرير جديد</Button>
                </div>
                <div className='text-xl'>
                    التقارير
                </div>
            </div>

            <div>
                <div className="overflow-auto max-h-96">
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <th className="text-lg p-2">عرض التقرير</th>
                                <th className="text-lg w-1/2 p-2">اسم التقرير</th>
                                <th className="text-lg p-2">الرقم</th>
                            </tr>
                            {
                                Reports.map((rep,i) => {
                                    return <tr className={`hover:bg-[#334155] hover:text-white cursor-pointer ${styleTabelLinsRefs.current[i]}`} onClick={() => {setReportProp(rep);setShoEditReport(true);setShowReport(true);}}>
                                        <th className='text-base p-2'><Button size='sm' onClick={() => props.TakeRepo(rep)}>عرض</Button></th>
                                        <th className='text-base p-2'>{rep.RebortName}</th>
                                        <th className='text-base p-2'>{rep.idRep}</th>
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