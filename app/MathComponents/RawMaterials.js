'use client';
import { Bar,Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as chartJS } from 'chart.js/auto';
import plugin from "chartjs-plugin-datalabels";

export default function RawMaterials(typeTime, Time, listInvoices, listRaws,kindsearch,isCircle,typeElemet,isForQuan) {

    const getAllPropDate = (date) => {
        let day = "";
        let month = "";
        let year = "";

        let count1 = 0;
        let count2 = 0;
        let count3 = 0;

        for (let index = 0; index < date.length; index++) {
            if (date[index] == "/") {
                count1++;
            }
            else if (count1 == 0) {
                day += date[index];
            }
        }
        for (let index = 0; index < date.length; index++) {
            if (date[index] == "/") {
                count2++;
            }
            else if (count2 == 1) {
                month += date[index];
            }
        }
        for (let index = 0; index < date.length; index++) {
            if (date[index] == "/") {
                count3++;
            }
            else if (count3 == 2) {
                year += date[index];
            }
        }
        return { day: parseFloat(day), month: parseFloat(month), year: parseFloat(year) }
    }
    const getDaysArray = (start, end) => {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            let date = new Date(dt);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let fullDate = `${day}/${month}/${year}`;
            arr.push(fullDate);
        }
        return arr;
    };
    const getJustMonth = (date) => {
        var conStr = date?.toString();
        var splitString = conStr?.split("");
        var array1 = [];
        var array2 = [];
        let count = 0;
        for (let index = 0; index < splitString?.length; index++) {
            if (splitString[index] === "/" && count == 0) {
                count++;
            }
            else if (count == 0) {
                array1.push(splitString[index]);
            }
            else {
                array2.push(splitString[index]);
            }
        }
        let lastStr = "";
        for (let index = 0; index < array2?.length; index++) {
            lastStr += array2[index];
        }
        return lastStr;
    }
    const GetJustYear = (date) => {
        var conStr = date?.toString();
        var splitString = conStr?.split("");
        var array1 = [];
        var array2 = [];
        var array3 = [];
        let count = 0;
        for (let index = 0; index < splitString?.length; index++) {
            if (splitString[index] === "/" && count == 0) {
                count++;
            }
            else if (count == 0) {
                array1.push(splitString[index]);
            }
            else if (splitString[index] === "/" && count == 1) {
                count++;
            }
            else if (count == 1) {
                array2.push(splitString[index]);
            }
            else if (splitString[index] !== "/") {
                array3.push(splitString[index])
            }
        }
        let lastStr = "";
        for (let index = 0; index < array3?.length; index++) {
            lastStr += array3[index];
        }
        return lastStr;
    }

    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let currentdate = `${day}/${month}/${year}`;

    const GetSum = (val, searchdate) => {

        let search = searchdate ? searchdate : currentdate;

        let sumD = 0;
        let sumM = 0;
        let sumY = 0;

        let values = val?.values;
        let name = val?.name;

        for (let index = 0; index < listInvoices?.length; index++) {

            if (listInvoices[index]?.invoices_data === search) {
                for (let index1 = 0; index1 < values.length; index1++) {
                    if(name === 'عدس' || name === 'فولية' || name === 'سمسم'){
                        if(values[index1]?.name === listInvoices[index]?.invoices_kind_material){
                            sumD += values[index1]?.quan * listInvoices[index]?.provide;
                        }
                    }
                    else{
                        if(values[index1]?.name === listInvoices[index]?.invoices_kind_type_of_concrete){
                            sumD += values[index1]?.quan * listInvoices[index]?.provide;
                        }
                    }     
                }
            }
            if (getJustMonth(listInvoices[index]?.invoices_data) === getJustMonth(search)) {
                for (let index1 = 0; index1 < values.length; index1++) {
                    if(name === 'عدس' || name === 'فولية' || name === 'سمسم'){
                        if(values[index1]?.name === listInvoices[index]?.invoices_kind_material){
                            sumM += values[index1]?.quan * listInvoices[index]?.provide;
                        }
                    }
                    else{
                        if(values[index1]?.name === listInvoices[index]?.invoices_kind_type_of_concrete){
                            sumM += values[index1]?.quan * listInvoices[index]?.provide;
                        }
                    }
                }
            }
            if (GetJustYear(listInvoices[index]?.invoices_data) === GetJustYear(search)) {
                for (let index1 = 0; index1 < values.length; index1++) {
                    if(name === 'عدس' || name === 'فولية' || name === 'سمسم'){
                        if(values[index1]?.name === listInvoices[index]?.invoices_kind_material){
                            sumY += values[index1]?.quan * listInvoices[index]?.provide;
                        }
                    }
                    else{
                        if(values[index1]?.name === listInvoices[index]?.invoices_kind_type_of_concrete){
                            sumY += values[index1]?.quan * listInvoices[index]?.provide;
                        }
                    }
                }
            }
        }

        return {
            day: sumD,
            month: sumM,
            year: sumY
        }
    }



    const GetLinesTables = (sum,avg,max,min,price,val4) => {
        return (
            <>
                {
                    isForQuan && <tr>
                        <th>
                            {min}
                        </th>
                        <th>
                            {max}
                        </th>
                        <th>
                            {avg}
                        </th>
                        <th>
                            {sum}
                        </th>
                        <th>{val4}</th>
                    </tr>
                }
                {
                    !isForQuan && <tr>
                        <th>
                            {min * price}
                        </th>
                        <th>
                            {max * price}
                        </th>
                        <th>
                            {(avg * price * 10 - (avg * price * 10) % 1) / 10}
                        </th>
                        <th>
                            {sum * price}
                        </th>
                        <th>{val4}</th>
                    </tr>
                }
            </>
        )
    }

    const GetResualt = () => {
        let values = [];
        let listName = [];
        for (let index = 0; index < listRaws?.length; index++) {
            listName.push(listRaws[index]?.name);
        }

        if(typeTime === 'تلقائي' && Time === 'يوم'){
            for (let index = 0; index < listRaws?.length; index++) {
                values.push(GetSum(listRaws[index]).day);
            }
        }
        else if(typeTime === 'تلقائي' && Time === 'شهر'){
            for (let index = 0; index < listRaws?.length; index++) {
                values.push(GetSum(listRaws[index]).month);
            }
        }
        else if(typeTime === 'تلقائي' && Time === 'سنة'){
            for (let index = 0; index < listRaws?.length; index++) {
                values.push(GetSum(listRaws[index]).year);
            }
        }
        else if(typeTime === 'تلقائي' && Time === 'الزمن الكلي'){
            
        }
        else if(typeTime === 'محدد' && Time === 'يوم'){

        }
        else if (typeTime === 'محدد' && Time === 'شهر') {

        }
        else if (typeTime === 'محدد' && Time === 'سنة') {

        }
        let listtables = [];
        let newNames = [];
        let newValues = [];
        if(typeElemet === 'ton'){
            for (let index = 0; index < values.length; index++) {
                if(listRaws[index]?.name != 'ماء' && listRaws[index]?.name != 'سوبر'){
                    newValues.push(values[index] /= 1000);
                    newNames.push(listRaws[index]?.name);
                }
            }
        }
        else if(typeElemet === 'kob'){
            for (let index = 0; index < values.length; index++) {
                if(listRaws[index]?.name == 'ماء' || listRaws[index]?.name == 'سوبر'){
                    newValues.push(values[index] /= 1000);
                    newNames.push(listRaws[index]?.name);
                }
            }
        }
        else if(typeElemet === 'kg'){
            for (let index = 0; index < values.length; index++) {
                if(listRaws[index]?.name != 'ماء' && listRaws[index]?.name != 'سوبر'){
                    newValues.push(values[index]);
                    newNames.push(listRaws[index]?.name);
                }
            }
        }
        else if(typeElemet === 'lter'){
            for (let index = 0; index < values.length; index++) {
                if(listRaws[index]?.name == 'ماء' || listRaws[index]?.name == 'سوبر'){
                    newValues.push(values[index]);
                    newNames.push(listRaws[index]?.name);
                }
            }
        }
        else if(typeElemet === ''){
            for (let index = 0; index < values.length; index++) {
                newValues.push(values[index] * listRaws[index]?.price);
                newNames.push(listRaws[index]?.name);
            }
        }
        else if (typeElemet === 'tabel') {
            for (let index = 0; index < values.length; index++) {
                listtables.push(GetLinesTables(values[index],0,0,0,values[index] * listRaws[index]?.price,listRaws[index]?.name));
            }
            return listtables;
        }
        // else if(typeElemet === 'kg'){
            
        // }

        let data = {
            labels: newNames,
            datasets: [
                {
                    label: 'المواد الخام',
                    data: newValues,
                    backgroundColor: ['#fecdd3', '#f5d0fe', '#ddd6fe', '#bfdbfe', '#a5f3fc', '#a7f3d0', '#d9f99d']
                },
            ],
        }
        return typeTime && Time &&  (
            <div className="w-full">
                {
                    isCircle && <div className="w-min">
                        <Pie className="w-96" plugins={[plugin]} data={data} />
                    </div>
                }
                {
                    !isCircle && <div className="p-5 w-full">
                        <Bar options={{ responsive: true }} plugins={[plugin]} data={data} />
                    </div>
                }
            </div>

        )

    }

    return GetResualt();
}