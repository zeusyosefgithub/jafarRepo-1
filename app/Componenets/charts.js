import { Button } from '@nextui-org/button'
import React, { useState } from 'react';
import { FiPlus } from "react-icons/fi";
import GetTrucks from './getDocs';
import { TfiBarChartAlt } from "react-icons/tfi";
import FormBoxChart from './formBoxChart';

export default function Charts() {

    const [showChart,setShowChart] = useState(false);

    return (
        <div className=''>

            {showChart && <FormBoxChart disable={() => setShowChart(false)}/>}

            <div className='flex justify-around items-center bg-gray-400 rounded-lg p-2'>
                <div>
                    <Button onClick={() => setShowChart(true)}><FiPlus />مخطط جديد</Button>
                </div>
                <div className='text-xl'>
                    المخططات
                </div>
            </div>

            <div>
                <div className="overflow-auto max-h-96 border-2 border-black">
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <th className="text-lg">عرض التقرير</th>
                                <th className="text-lg">نوع التقرير</th>
                                <th className="text-lg">اسم التقرير</th>
                                <th className="text-lg">الرقم</th>
                                <th className="text-lg">اختيار</th>
                            </tr>
                            {
                                <>
                                <tr>
                                    <th><div className='text-sm flex justify-center'><Button>عرض</Button></div></th>
                                    <th><div className='text-sm flex justify-center'>يدوي</div></th>
                                    <th><div className='text-sm flex justify-center'>المبيعات اليومية</div></th>
                                    <th><div className='text-sm flex justify-center'>44</div></th>
                                    <th className='text-2xl'><div className='flex justify-center'><TfiBarChartAlt /></div></th>
                                </tr>
                                <tr>
                                    <th><div className='text-sm flex justify-center'><Button>عرض</Button></div></th>
                                    <th><div className='text-sm flex justify-center'>يدوي</div></th>
                                    <th><div className='text-sm flex justify-center'>المبيعات اليومية</div></th>
                                    <th><div className='text-sm flex justify-center'>44</div></th>
                                    <th className='text-2xl'><div className='flex justify-center'><TfiBarChartAlt /></div></th>
                                </tr>
                                <tr>
                                    <th><div className='text-sm flex justify-center'><Button>عرض</Button></div></th>
                                    <th><div className='text-sm flex justify-center'>يدوي</div></th>
                                    <th><div className='text-sm flex justify-center'>المبيعات اليومية</div></th>
                                    <th><div className='text-sm flex justify-center'>44</div></th>
                                    <th className='text-2xl'><div className='flex justify-center'><TfiBarChartAlt /></div></th>
                                </tr>
                                <tr>
                                    <th><div className='text-sm flex justify-center'><Button>عرض</Button></div></th>
                                    <th><div className='text-sm flex justify-center'>يدوي</div></th>
                                    <th><div className='text-sm flex justify-center'>المبيعات اليومية</div></th>
                                    <th><div className='text-sm flex justify-center'>44</div></th>
                                    <th className='text-2xl'><div className='flex justify-center'><TfiBarChartAlt /></div></th>
                                </tr>
                                <tr>
                                    <th><div className='text-sm flex justify-center'><Button>عرض</Button></div></th>
                                    <th><div className='text-sm flex justify-center'>يدوي</div></th>
                                    <th><div className='text-sm flex justify-center'>المبيعات اليومية</div></th>
                                    <th><div className='text-sm flex justify-center'>44</div></th>
                                    <th className='text-2xl'><div className='flex justify-center'><TfiBarChartAlt /></div></th>
                                </tr>
                                <tr>
                                    <th><div className='text-sm flex justify-center'><Button>عرض</Button></div></th>
                                    <th><div className='text-sm flex justify-center'>يدوي</div></th>
                                    <th><div className='text-sm flex justify-center'>المبيعات اليومية</div></th>
                                    <th><div className='text-sm flex justify-center'>44</div></th>
                                    <th className='text-2xl'><div className='flex justify-center'><TfiBarChartAlt /></div></th>
                                </tr>
                                <tr>
                                    <th><div className='text-sm flex justify-center'><Button>عرض</Button></div></th>
                                    <th><div className='text-sm flex justify-center'>يدوي</div></th>
                                    <th><div className='text-sm flex justify-center'>المبيعات اليومية</div></th>
                                    <th><div className='text-sm flex justify-center'>44</div></th>
                                    <th className='text-2xl'><div className='flex justify-center'><TfiBarChartAlt /></div></th>
                                </tr>
                                <tr>
                                    <th><div className='text-sm flex justify-center'><Button>عرض</Button></div></th>
                                    <th><div className='text-sm flex justify-center'>يدوي</div></th>
                                    <th><div className='text-sm flex justify-center'>المبيعات اليومية</div></th>
                                    <th><div className='text-sm flex justify-center'>44</div></th>
                                    <th className='text-2xl'><div className='flex justify-center'><TfiBarChartAlt /></div></th>
                                </tr>
                                </>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}