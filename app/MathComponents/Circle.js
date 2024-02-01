'use client';
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as chartJS } from 'chart.js/auto';
import plugin from "chartjs-plugin-datalabels";
export default function Circle(typeTime, Time,list,kindSearch,listConncerts,firstDate,lastDate){

    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let currentdate = `${day}/${month}/${year}`;


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

    const GetSum = (val4,searchdate,isBetween) => {
        if(isBetween){
            let sum = 0;
            for (let index = 0; index < searchdate?.length; index++) {
                for (let index1 = 0; index1 < list?.length; index1++) {
                    if(searchdate[index] === list[index1]?.invoices_data){
                        if(list[index1]?.invoices_kind_type_of_concrete === val4){
                            sum++;
                        }          
                    }
                }
            }
            return {
                day : sum,
                month : null,
                year : null
            }
        }
        let sum = 0;
        let sumM = 0;
        let sumY = 0;
        let search = searchdate ? searchdate : currentdate;
        for (let index = 0; index < list?.length; index++) {
            if (list[index]?.invoices_data == search) {
                if (list[index]?.invoices_kind_type_of_concrete === val4) {
                    sum += parseFloat(list[index]?.provide);
                }
            }
            if (getJustMonth(list[index]?.invoices_data) == getJustMonth(search)) {
                if (list[index]?.invoices_kind_type_of_concrete === val4) {
                    sumM += parseFloat(list[index]?.provide);
                }
            }
            if (GetJustYear(list[index]?.invoices_data) == GetJustYear(search)) {
                if (list[index]?.invoices_kind_type_of_concrete === val4) {
                    sumY += parseFloat(list[index]?.provide);
                }
            }
        }
        return {
            day : sum,
            month : sumM,
            year : sumY
        };
    }

    const GetConncertPrice = (val) => {
        for (let index = 0; index < listConncerts.length; index++) {
            if(val === listConncerts[index].kinds_concrete_name){
                return listConncerts[index].price;
            }    
        }
    }

    const GetRes = () => {
        let data = {};
        const types = ['بطون 300','بطون 400','دحوس','اسمنتيت','هربتسا'];
        let SumAll = [];
        if(kindSearch === 'كمية المواد النهائية (كوب)'){
            if(typeTime === 'تلقائي' && Time === 'يوم'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index]).day);
                }
            }
            else if(typeTime === 'تلقائي' && Time === 'شهر'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index]).month);
                }
            }
            else if(typeTime === 'تلقائي' && Time === 'سنة'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index]).year);
                }
            }
            else if(typeTime === 'تلقائي' && Time === 'الزمن الكلي'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(list.length);
                }
            }
            else if(typeTime === 'محدد' && Time === 'يوم'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index],firstDate).day);
                }
            }
            else if(typeTime === 'محدد' && Time === 'شهر'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index],firstDate).month);
                }
            }
            else if(typeTime === 'محدد' && Time === 'سنة'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index], firstDate).year);
                }
            }
            else if (typeTime === 'محدد' && Time === 'من - الى') {
                let convStartDate = `${getAllPropDate(firstDate).year}-${getAllPropDate(firstDate).month}-${getAllPropDate(firstDate).day}`;
                let conveEndDate = `${getAllPropDate(lastDate).year}-${getAllPropDate(lastDate).month}-${getAllPropDate(lastDate).day}`;
                let listDays = getDaysArray(new Date(convStartDate), new Date(conveEndDate));
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index],listDays,true).day);
                }
            }
        }
        else if (kindSearch === 'اسعار المواد النهائية'){
            if(typeTime === 'تلقائي' && Time === 'يوم'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index]).day * GetConncertPrice(types[index]));
                }
            }
            else if(typeTime === 'تلقائي' && Time === 'شهر'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index]).month * GetConncertPrice(types[index]));
                }
            }
            else if(typeTime === 'تلقائي' && Time === 'سنة'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index]).year * GetConncertPrice(types[index]));
                }
            }
            else if(typeTime === 'محدد' && Time === 'يوم'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index],firstDate).day * GetConncertPrice(types[index]));
                }
            }
            else if(typeTime === 'محدد' && Time === 'شهر'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index],firstDate).month * GetConncertPrice(types[index]));
                }
            }
            else if(typeTime === 'محدد' && Time === 'سنة'){
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index], firstDate).year * GetConncertPrice(types[index]));
                }
            }
            else if (typeTime === 'محدد' && Time === 'من - الى') {
                let convStartDate = `${getAllPropDate(firstDate).year}-${getAllPropDate(firstDate).month}-${getAllPropDate(firstDate).day}`;
                let conveEndDate = `${getAllPropDate(lastDate).year}-${getAllPropDate(lastDate).month}-${getAllPropDate(lastDate).day}`;
                let listDays = getDaysArray(new Date(convStartDate), new Date(conveEndDate));
                for (let index = 0; index < types.length; index++) {
                    SumAll.push(GetSum(types[index],listDays,true).day * GetConncertPrice(types[index]));
                }
            }
        }
        data = {
            labels: ['بطون 300','بطون 400','دحوس','اسمنتيت','هربتسا'],
            datasets: [
                {
                    label: '',
                    data: SumAll,
                    backgroundColor:['#fecdd3','#f5d0fe','#ddd6fe','#bfdbfe','#a5f3fc']
                },
            ],
        }
        return typeTime && Time && (
            <div className="w-min">
                <Pie className="w-96" plugins={[plugin]} data={data} />
            </div>
        )
    }

    return GetRes();
}