'use client';
import { useEffect, useState } from "react"
import QuantityPrice from "../MathComponents/QuantityPrice";
import GetTrucks from "./getDocs";
import Circle from "../MathComponents/Circle";
import ShippingProps from "../MathComponents/ShippingProps";
import InvoiceNumber from "../MathComponents/InvoicesNumber";

export default function Report(props) {

    const endMaterials = ['بطون 400','طينة مبلولة','طينة ناشفة','دحوس','بطون 300','اسمنتيت','هربتسا'];

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

    const sortReturnedValues = () => {
        if(props.repo.elements === 'المواد النهائية'){
            let resualt = [];
            for (let index = 0; index < endMaterials?.length; index++) {
                resualt.push(QuantityPrice(props.repo.record_time, props.repo.type_time, Invoices, endMaterials[index], GetCurrentPrice(endMaterials[index]),props.repo.first_time,props.repo.last_time, props.repo.math,true));
            }
            return resualt;
        }
        else if (props.repo.elements === 'المبيعات'){
            let resualt = [];
            for (let index = 0; index < endMaterials?.length; index++) {
                resualt.push(QuantityPrice(props.repo.record_time, props.repo.type_time, Invoices, endMaterials[index], GetCurrentPrice(endMaterials[index]),props.repo.first_time,props.repo.last_time, props.repo.math,false));
            }
            return resualt;
        }
        else if(props.repo.elements === 'عدد الارساليات'){
            return ShippingProps(props.repo.record_time, props.repo.type_time, Shippings,props.repo.elements,Invoices,props.repo.first_time,props.repo.last_time);
        }
        else if (props.repo.elements === 'عدد الفواتير'){
            return InvoiceNumber(props.repo.record_time, props.repo.type_time, Invoices,props.repo.elements,props.repo.first_time,props.repo.last_time)
        }
    }

    return(
        <div className="overflow-auto max-h-96">
            {
                props.kind === 'جدول' && 
                <table className="w-full main_hight_elements">
                    <tbody>
                        <tr>
                            <th>اصغر قيمة</th>
                            <th>اكبر قيمة</th>
                            <th>المعدل</th>
                            <th>المجموع</th>
                            <th>العناصر</th>
                        </tr>
                        {
                            sortReturnedValues()
                        }
                    </tbody>
                </table>
            }
            {
                props.kind === 'دائرة' && Circle(props.repo.record_time, props.repo.type_time, Invoices, props.repo.elements, KindsConncert, null, null, true)
            }
            {
                props.kind === 'رسم بياني' && Circle(props.repo.record_time, props.repo.type_time, Invoices, props.repo.elements, KindsConncert, null, null, false)
            }
        </div>
    )
}