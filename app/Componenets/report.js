'use client';
import { useEffect, useState } from "react"
import QuantityPrice from "../MathComponents/QuantityPrice";
import GetTrucks from "./getDocs";
import Circle from "../MathComponents/Circle";
import ShippingProps from "../MathComponents/ShippingProps";
import InvoiceNumber from "../MathComponents/InvoicesNumber";

export default function Report(props) {

    const Invoices = GetTrucks('invoices');
    const Shippings = GetTrucks('shipping');
    const KindsConncert = GetTrucks('kinds concrete');

    const GetCurrentPrice = (val4) => {
        for (let index = 0; index < KindsConncert?.length; index++) {
            if(val4 === 'طينة ناشفة' && KindsConncert[index]?.kinds_concrete_name === 'طينة'){
                return KindsConncert[index]?.priceN;
            }
            else if(val4 === 'طينة مبلولة' && KindsConncert[index]?.kinds_concrete_name === 'طينة'){
                return KindsConncert[index]?.priceM;
            }
            else if(KindsConncert[index]?.kinds_concrete_name === val4){
                return KindsConncert[index]?.price;
            }
        }
    }

    const sortReturnedValues = (ele) => {
        if(ele === 'عدد الارساليات'){
            return ShippingProps(props.repo.record_time, props.repo.type_time, Shippings,ele,Invoices,props.repo.first_time,props.repo.last_time);
        }
        else if (ele === 'عدد الفواتير'){
            return InvoiceNumber(props.repo.record_time, props.repo.type_time, Invoices,ele,props.repo.first_time,props.repo.last_time)
        }
        return QuantityPrice(props.repo.record_time, props.repo.type_time, Invoices,ele,GetCurrentPrice(ele),props.repo.first_time,props.repo.last_time,props.repo.math);
    }

    return(
        <div>
            {
                props.kind === 'جدول' && 
                <table className="w-full">
                    <tbody>
                        <tr>
                            <th>اصغر قيمة</th>
                            <th>اكبر قيمة</th>
                            <th>المعدل</th>
                            <th>المجموع</th>
                            <th>العناصر</th>
                        </tr>
                        {
                            props.repo.elements.map((ele,i) => {
                                return sortReturnedValues(ele);
                            })
                        }
                    </tbody>
                </table>
            }
            {
                console.log(props)
            }
            {
                props.kind === 'دائرة' && Circle(props.repo.record_time, props.repo.type_time, Invoices,props.repo.elements,KindsConncert)
            }
        </div>
    )
}