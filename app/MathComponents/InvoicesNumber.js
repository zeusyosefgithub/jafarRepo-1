'use client';

export default function InvoiceNumber(typeTime, Time,Invoices,ele,firstDate,lastDate) {

    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let currentdate = `${day}/${month}/${year}`;

    const GetJustMonth = (date) => {
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
    const checkIfDateExist = (list, date) => {
        for (let index = 0; index < list?.length; index++) {
            if (list[index] == date || list[index] == GetJustMonth(date) || list[index] == GetJustYear(date)) {
                return true;
            }
        }
        return false;
    }
    
    const GetSumInvoices = (searchdate,isBetween) => {
        if(isBetween){
            let sum = 0;
            for (let index = 0; index < searchdate?.length; index++) {
                for (let index1 = 0; index1 < Invoices?.length; index1++) {
                    if(searchdate[index] === Invoices[index1]?.invoices_data){
                        sum++;
                    }
                }
            }
            return {
                day : sum,
                month : null,
                year : null
            }
        }
        let search = searchdate ? searchdate : currentdate;
        let sumDay = 0;
        let sumMonth = 0;
        let sumYear = 0;
        for (let index = 0; index < Invoices?.length; index++) {
            if(Invoices[index]?.invoices_data === search){
                sumDay++;
            }
            if(GetJustMonth(Invoices[index]?.invoices_data) === GetJustMonth(search)){
                sumMonth++;
            }
            if(GetJustYear(Invoices[index]?.invoices_data) === GetJustYear(search)){
                sumYear++;
            }
        }
        return {day : sumDay,month : sumMonth,year : sumYear};
    }
    const GetAvgInvoices = () => {
        let listDays = [];
        let listMonths = [];
        let ListYears = [];
        for (let index = 0; index < Invoices?.length; index++) {
            !checkIfDateExist(listDays, Invoices[index].invoices_data) && listDays.push(Invoices[index]?.invoices_data);
            !checkIfDateExist(listMonths, Invoices[index].invoices_data) && listMonths.push(GetJustMonth(Invoices[index]?.invoices_data));
            !checkIfDateExist(ListYears, Invoices[index].invoices_data) && ListYears.push(GetJustYear(Invoices[index]?.invoices_data));
        }
        return {
            listDays : listDays,
            listMonths : listMonths,
            listYears : ListYears,
            days : (((Invoices.length / listDays.length) * 10) - (((Invoices.length / listDays.length) * 10) % 1)) / 10 ,
            month : (((Invoices.length / listMonths.length) * 10) - (((Invoices.length / listMonths.length) * 10) % 1)) / 10,
            year : (((Invoices.length / ListYears.length) * 10) - (((Invoices.length / ListYears.length) * 10) % 1)) / 10
        };
    }
    const GetMaxValue = () => {
        let max = 0;
        let worksDayes = GetAvgInvoices().listDays;
        let maxInDay = 0;
        for (let index = 0; index < worksDayes?.length; index++) {
            for (let index1 = 0; index1 < Invoices?.length; index1++) {
                if (worksDayes[index] === Invoices[index1]?.invoices_data) {
                    maxInDay++;
                }
            }
            max = Math.max(max, maxInDay);
            maxInDay = 0;
        }
        let maxMonth = 0;
        let worksMonths = GetAvgInvoices().listMonths;
        let maxInMonth = 0;
        for (let index = 0; index < worksMonths?.length; index++) {
            for (let index1 = 0; index1 < Invoices?.length; index1++) {
                if (worksMonths[index] === GetJustMonth(Invoices[index1]?.invoices_data)) {
                    maxInMonth++;
                }
            }
            maxMonth = Math.max(maxMonth, maxInMonth);
            maxInMonth = 0;
        }
        let maxYear = 0;
        let worksYears = GetAvgInvoices().listYears;
        let maxInYear = 0;
        for (let index = 0; index < worksYears?.length; index++) {
            for (let index1 = 0; index1 < Invoices?.length; index1++) {
                if (worksYears[index] === GetJustYear(Invoices[index1]?.invoices_data)) {
                    maxInYear++;
                }
            }
            maxYear = Math.max(maxYear, maxInYear);
            maxInYear = 0;
        }
        return {
            maxDay : max,
            maxMonth : maxMonth,
            maxYear : maxYear
        };
    }
    const GetMinValue = () => {
        let min = 99999999;
        let worksDayes = GetAvgInvoices().listDays;
        let minInDay = 0;
        for (let index = 0; index < worksDayes?.length; index++) {
            for (let index1 = 0; index1 < Invoices?.length; index1++) {
                if (worksDayes[index] === Invoices[index1]?.invoices_data) {
                    minInDay++;
                }
            }
            min = Math.min(min, minInDay);
            minInDay = 0;
        }
        let minMonth = 99999999;
        let worksMonths = GetAvgInvoices().listMonths;
        let minInMonth = 0;
        for (let index = 0; index < worksMonths?.length; index++) {
            for (let index1 = 0; index1 < Invoices?.length; index1++) {
                if (worksMonths[index] === GetJustMonth(Invoices[index1]?.invoices_data)) {
                    minInMonth++;
                }
            }
            minMonth = Math.min(minMonth, minInMonth);
            minInMonth = 0;
        }
        let minYear = 99999999;
        let worksYears = GetAvgInvoices().listYears;
        let minInYear = 0;
        for (let index = 0; index < worksYears?.length; index++) {
            for (let index1 = 0; index1 < Invoices?.length; index1++) {
                if (worksYears[index] === GetJustYear(Invoices[index1]?.invoices_data)) {
                    minInYear++;
                }
            }
            minYear = Math.min(minYear, minInYear);
            minInYear = 0;
        }
        return {
            minDay : min,
            minMonth : minMonth,
            minYear : minYear
        };
    }
    
    
    

    const GetInvoicesPropirtes = (sum, avg, max, min) => {
        return (
            <>
                <tr>
                    <th colSpan={5} className="p-3 text-lg">{ele}</th>
                </tr>
                <tr>
                    <th>{min}</th>
                    <th>{max}</th>
                    <th>{avg}</th>
                    <th>{sum}</th>
                    <th>{ele}</th>
                </tr>
            </>
        )
    }

    const resault = () => {
        let sum,avg,max,min;

        if (typeTime === 'تلقائي' && Time === 'يوم') {
            sum = GetSumInvoices().day;
            avg = GetAvgInvoices().days;
            max = GetMaxValue().maxDay;
            min = GetMinValue().minDay;
        }
        else if (typeTime === 'تلقائي' && Time === 'شهر') {
            sum = GetSumInvoices().month;
            avg = GetAvgInvoices().month;
            max = GetMaxValue().maxMonth;
            min = GetMinValue().minMonth;
        }
        else if (typeTime === 'تلقائي' && Time === 'سنة') {
            sum = GetSumInvoices().year;
            avg = GetAvgInvoices().year;
            max = GetMaxValue().maxYear;
            min = GetMinValue().minYear;
        }
        else if (typeTime === 'تلقائي' && Time === "الزمن الكلي") {
            sum = Invoices.length;
            avg = Invoices.length;
            max = Invoices.length;
            min = Invoices.length;
        }

        else if (typeTime === 'محدد' && Time === 'يوم') {
            sum = GetSumInvoices(firstDate).day;
            avg = GetAvgInvoices().days;
            max = GetMaxValue().maxDay;
            min = GetMinValue().minDay;
        }
        else if (typeTime === 'محدد' && Time === 'شهر') {
            sum = GetSumInvoices('1/' + firstDate).month;
            avg = GetAvgInvoices().month;
            max = GetMaxValue().maxMonth;
            min = GetMinValue().minMonth;
        }
        else if (typeTime === 'محدد' && Time === 'سنة') {
            sum = GetSumInvoices('1/1/' + firstDate).year;
            avg = GetAvgInvoices().year;
            max = GetMaxValue().maxYear;
            min = GetMinValue().minYear;
        }
        else if (typeTime === 'محدد' && Time === "من - الى") {
            let convStartDate = `${getAllPropDate(firstDate).year}-${getAllPropDate(firstDate).month}-${getAllPropDate(firstDate).day}`;
            let conveEndDate = `${getAllPropDate(lastDate).year}-${getAllPropDate(lastDate).month}-${getAllPropDate(lastDate).day}`;
            let listDays = getDaysArray(new Date(convStartDate), new Date(conveEndDate));
            sum = GetSumInvoices(listDays,true).day;
            avg = GetAvgInvoices().days;
            max = GetMaxValue().maxDay;
            min = GetMinValue().minDay;
        }

        return GetInvoicesPropirtes(sum,avg,max,min);
    }


    

    return resault();
}