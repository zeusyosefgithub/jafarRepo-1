'use client';
import { list } from "postcss";
import GetTrucks from "./getDocs";
import { useEffect, useState } from "react";
import EditBoard from "./editBoard";

export default function AllLists(props) {

    const theList = GetTrucks("invoices");
    const theList1 = GetTrucks("concert pumps");
    const theList2 = GetTrucks("drivers");
    const theList3 = GetTrucks("trucks");
    const theList4 = GetTrucks("customers");
    let count = 1;

    const [showInvoEdit,setShowInvoEdit] = useState(false);
    const [invData,setInvData] = useState({});

    return (
        <div className="rounded-3xl bg-[#f5f5f5] border-2 border-[#334155] p-10">
            {
                props.wichList == "invoices" ?
                    <div>
                        <div className="text-end text-2xl mb-7">جميع الفواتير التي تم ادخالها</div>
                        <div className="w-auto overflow-scroll hight_for_table_list">
                            <table className="w-full ">
                                <tbody className="">
                                    <tr>
                                        <th className="text-xl">درجة الثقة</th>
                                        <th className="text-xl">درجة التعرض</th>
                                        <th className="text-xl">نوع الخرسانة</th>
                                        <th className="text-xl">نوع المادة</th>
                                        <th className="text-xl">الكمية</th>
                                        <th className="text-xl">السائق</th>
                                        <th className="text-xl">المضخة</th>
                                        <th className="text-xl">الشحانة</th>
                                        <th className="text-xl">العنوان</th>
                                        <th className="text-xl">الشارع</th>
                                        <th className="text-xl">الاسم</th>
                                        <th className="text-xl">الرقم</th>
                                    </tr>
                                    {
                                        theList.map(list => {
                                            return <tr onClick={() => {setShowInvoEdit(true);setInvData(list)}} className="styling_lines_lists bordering_list">
                                                <th className="text-base">{list.invoices_concretd_grade}</th>
                                                <th className="text-base">{list.invoices_kind_egree_of_Exposure}</th>
                                                <th className="text-base">{list.invoices_kind_type_of_concrete}</th>
                                                <th className="text-base">{list.invoices_kind_material}</th>
                                                <th className="text-base">{list.invoices_quantity}</th>
                                                <th className="text-base">{list.invoices_driver}</th>
                                                <th className="text-base">{list.invoices_pump}</th>
                                                <th className="text-base">{list.invoices_truck}</th>
                                                <th className="text-base">{list.invoices_customer_city}</th>
                                                <th className="text-base">{list.invoices_customer_street}</th>
                                                <th className="text-base">{list.invoices_customer_name}</th>
                                                <th className="text-base">{list.invoices_customer_id}</th>
                                                <th className="text-base">{count++}</th>
                                                
                                            </tr>
                                        })
                                    }
                                    {
                                        showInvoEdit ? <EditBoard showInv={() => setShowInvoEdit(false)} data={invData} /> : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    props.wichList == "concert pumps" ?
                        <div>
                            <div className="text-end text-2xl mb-7">جميع المضخات التي تم ادخالها</div>
                            <div className="w-full overflow-scroll hight_for_table_list">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="text-xl">ملاحظات</th>
                                            <th className="text-xl">سائق المضخة</th>
                                            <th className="text-xl">رقم المضخة</th>
                                        </tr>
                                        {
                                            theList1.map(list => {
                                                return <tr>
                                                    <th className="text-base">{list.pump_disc}</th>
                                                    <th className="text-base">{list.pump_d_name}</th>
                                                    <th className="text-base">{list.pump_id}</th>
                                                    <th className="text-base">{count++}</th>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        props.wichList == "drivers" ?
                            <div>
                                <div className="text-end text-2xl mb-7">جميع السائقين الذين تم ادخالهم</div>
                                    <div className="w-full overflow-scroll hight_for_table_list">
                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <th className="text-xl">ملاحظات</th>
                                                    <th className="text-xl">اسم السائق</th>
                                                    <th className="text-xl">رقم السائق</th>
                                                </tr>
                                                {
                                                    theList2.map(list => {
                                                        return <tr className="pointer_line">
                                                            <th className="text-base">{list.driver_disc}</th>
                                                            <th className="text-base">{list.driver_name}</th>
                                                            <th className="text-base">{list.driver_id}</th>
                                                            <th className="text-base">{count++}</th>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                            </div>
                            :
                            props.wichList == "trucks" ?
                                <div>
                                    <div className="text-end text-2xl mb-7">جميع الشاحنات التي تم ادخالها</div>
                                    <div className="w-full overflow-scroll hight_for_table_list">
                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <th className="text-xl">ملاحظات</th>
                                                    <th className="text-xl">اسم سائق الشاحنة</th>
                                                    <th className="text-xl">رقم الشاحنة</th>
                                                </tr>
                                                {
                                                    theList3.map(list => {
                                                        return <tr className="pointer_line">
                                                            <th className="text-base">{list.truck_disc}</th>
                                                            <th className="text-base">{list.truck_driver}</th>
                                                            <th className="text-base">{list.truck_id}</th>
                                                            <th className="text-base">{count++}</th>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="text-end text-2xl mb-7">34</div>
                                        <div className="w-full overflow-scroll hight_for_table_list">
                                            <table className="w-full">
                                                <tbody>
                                                    <tr>
                                                        <th className="text-xl">العنوان</th>
                                                        <th className="text-xl">الشارع</th>
                                                        <th className="text-xl">اسم الزبون</th>
                                                        <th className="text-xl">رقم الزبون</th>
                                                    </tr>
                                                    {
                                                        theList4.map(list => {
                                                            return <tr className="pointer_line">
                                                                <th className="text-base">{list.customer_city}</th>
                                                                <th className="text-base">{list.customer_street}</th>
                                                                <th className="text-base">{list.customer_name}</th>
                                                                <th className="text-base">{list.customer_id}</th>
                                                                <th className="text-base">{count++}</th>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                </div>
            }
        </div>
    )
}