'use client';

export default function QuantityPrice(val1, val2, Invoices, val4, price, dateSearch, endDateSearch, QuanOrPrice,wichConn) {

    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let currentdate = `${day}/${month}/${year}`;


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

    const checkIfCurrentInList = (list, invo) => {
        for (let index = 0; index < list?.length; index++) {
            if (list[index]?.invoices_id == invo?.invoices_id) {
                return true;
            }
        }
        return false;
    }

    function SortListInvoicesByDate(list) {
        let listInvo = list;
        let newKistInvo = [];
        let maxDay = 0;
        let maxMonth = 0;
        let maxYear = 0;
        for (let index = 0; index < Invoices?.length; index++) {
            for (let index1 = 0; index1 < listInvo?.length; index1++) {
                if (!checkIfCurrentInList(newKistInvo, listInvo[index1])) {
                    maxYear = Math.max(maxYear, getAllPropDate(listInvo[index1]?.invoices_data).year);
                }
            }
            for (let index2 = 0; index2 < listInvo?.length; index2++) {
                if (getAllPropDate(listInvo[index2]?.invoices_data).year === maxYear) {
                    if (!checkIfCurrentInList(newKistInvo, listInvo[index2])) {
                        maxMonth = Math.max(maxMonth, getAllPropDate(listInvo[index2]?.invoices_data).month);
                    }
                }
            }
            for (let index3 = 0; index3 < listInvo?.length; index3++) {
                if (getAllPropDate(listInvo[index3]?.invoices_data).year === maxYear &&
                    getAllPropDate(listInvo[index3]?.invoices_data).month === maxMonth) {
                    if (!checkIfCurrentInList(newKistInvo, listInvo[index3])) {
                        maxDay = Math.max(maxDay, getAllPropDate(listInvo[index3]?.invoices_data).day);
                    }
                }
            }
            for (let index4 = 0; index4 < listInvo?.length; index4++) {
                if (getAllPropDate(listInvo[index4]?.invoices_data).year === maxYear &&
                    getAllPropDate(listInvo[index4]?.invoices_data).month === maxMonth &&
                    getAllPropDate(listInvo[index4]?.invoices_data).day === maxDay) {
                    if (!checkIfCurrentInList(newKistInvo, listInvo[index4])) {
                        newKistInvo.push(listInvo[index4]);
                    }
                }
            }
            maxDay = 0;
            maxMonth = 0;
            maxYear = 0;
        }
        return newKistInvo;
    }

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
    const getJustYear = (date) => {
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

    const NumberWorksDayes = () => {
        let listDays = [];
        for (let index = 0; index < Invoices?.length; index++) {
            !checkIfDayExist(listDays, Invoices[index].invoices_data) && listDays.push(Invoices[index]?.invoices_data);
        }
        return listDays;
    }
    const NumberMonthsWorks = () => {
        let listMonths = [];
        for (let index = 0; index < Invoices?.length; index++) {
            !checkIfMonthExist(listMonths, Invoices[index].invoices_data) && listMonths.push(getJustMonth(Invoices[index]?.invoices_data));
        }
        return listMonths;
    }
    const NumberWorksYears = () => {
        let ListYears = [];
        for (let index = 0; index < Invoices?.length; index++) {
            !checkIfYearExist(ListYears, Invoices[index].invoices_data) && ListYears.push(getJustYear(Invoices[index]?.invoices_data));
        }
        return ListYears;
    }




    const NumberAllInvoices = (list, val) => {
        let sum = 0;
        for (let index = 0; index < list?.length; index++) {
            if(list[index]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة مبلولة'){
                if(parseFloat(list[index]?.invoices_concretd_grade) != 0){
                    sum += parseFloat(list[index]?.provide);
                }
            }
            else if(list[index]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة ناشفة'){
                if(parseFloat(list[index]?.invoices_concretd_grade) == 0){
                    sum += parseFloat(list[index]?.provide);
                }
            }
            else if(list[index]?.invoices_kind_type_of_concrete === val4) {
                sum += parseFloat(list[index]?.provide);
            }
        }
        return sum;
    }

    const numberINvoINDay = (list, searchdate, isBetweenTwo) => {
        let sum = 0;
        if (isBetweenTwo) {
            for (let index = 0; index < searchdate?.length; index++) {
                for (let index1 = 0; index1 < list?.length; index1++) {
                    if (list[index1]?.invoices_data == searchdate[index]) {
                        if(list[index1]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة مبلولة'){
                            if(parseFloat(list[index1]?.invoices_concretd_grade) != 0){
                                sum += parseFloat(list[index1]?.provide);
                            }
                        }
                        else if(list[index1]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة ناشفة'){
                            if(parseFloat(list[index1]?.invoices_concretd_grade) == 0){
                                sum += parseFloat(list[index1]?.provide);
                            }
                        }
                        else if(list[index1]?.invoices_kind_type_of_concrete === val4) {
                            sum += parseFloat(list[index1]?.provide);
                        }
                    }
                }
            }
            return sum;
        }
        let search = searchdate ? searchdate : currentdate;
        for (let index = 0; index < list?.length; index++) {
            if (list[index]?.invoices_data == search) {
                if(list[index]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة مبلولة'){
                    if(parseFloat(list[index]?.invoices_concretd_grade) != 0){
                        sum += parseFloat(list[index]?.provide);
                    }
                }
                else if(list[index]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة ناشفة'){
                    if(parseFloat(list[index]?.invoices_concretd_grade) == 0){
                        sum += parseFloat(list[index]?.provide);
                    }
                }
                else if(list[index]?.invoices_kind_type_of_concrete === val4) {
                    sum += parseFloat(list[index]?.provide);
                }
            }
        }
        return sum;
    }
    const checkIfDayExist = (list, month) => {
        for (let index = 0; index < list?.length; index++) {
            if (list[index] == month) {
                return true;
            }
        }
        return false;
    }
    const GetAvgDay = (list, val) => {
        let worksDayes = NumberWorksDayes();
        return (((NumberAllInvoices(list, val) / worksDayes.length) * 10) - (((NumberAllInvoices(list, val) / worksDayes.length) * 10) % 1)) / 10;
    }
    const GetMaxValueDay = (list, val) => {
        let max = 0;
        let worksDayes = NumberWorksDayes();
        let maxInDay = 0;
        for (let index = 0; index < worksDayes?.length; index++) {
            for (let index1 = 0; index1 < list?.length; index1++) {
                if (worksDayes[index] === list[index1]?.invoices_data) {
                    if(list[index1]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة مبلولة'){
                        if(parseFloat(list[index1]?.invoices_concretd_grade) != 0){
                            maxInDay = Math.max(maxInDay, parseFloat(list[index1]?.provide));
                        }
                    }
                    else if(list[index1]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة ناشفة'){
                        if(parseFloat(list[index1]?.invoices_concretd_grade) == 0){
                            maxInDay = Math.max(maxInDay, parseFloat(list[index1]?.provide));
                        }
                    }
                    else if(list[index1]?.invoices_kind_type_of_concrete === val4) {
                        maxInDay = Math.max(maxInDay, parseFloat(list[index1]?.provide));
                    }
                }
            }
            max = Math.max(max, maxInDay);
            maxInDay = 0;
        }
        return max;
    }
    const GetMinValueDay = (list, val) => {
        let min = 9999999;
        let minInDays = 0;
        let worksDayes = NumberWorksDayes();
        for (let index = 0; index < worksDayes?.length; index++) {
            for (let index1 = 0; index1 < list?.length; index1++) {
                if (worksDayes[index] === list[index1]?.invoices_data) {
                    if(list[index1]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة مبلولة'){
                        if(parseFloat(list[index1]?.invoices_concretd_grade) != 0){
                            minInDays = Math.max(minInDays, parseFloat(list[index1]?.provide));
                        }
                    }
                    else if(list[index1]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة ناشفة'){
                        if(parseFloat(list[index1]?.invoices_concretd_grade) == 0){
                            minInDays = Math.max(minInDays, parseFloat(list[index1]?.provide));
                        }
                    }
                    else if(list[index1]?.invoices_kind_type_of_concrete === val4) {
                        minInDays = Math.max(minInDays, parseFloat(list[index1]?.provide));
                    }
                }
            }
            min = Math.min(min, minInDays);
            minInDays = 0;
        }
        return min;
    }

    const numberINvoINmonth = (list, searchdate) => {
        let sum = 0;
        let search = searchdate ? searchdate : currentdate;
        for (let index = 0; index < list?.length; index++) {
            if (getJustMonth(list[index]?.invoices_data) == getJustMonth(search)) {
                if(list[index]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة مبلولة'){
                    if(parseFloat(list[index]?.invoices_concretd_grade) != 0){
                        sum += parseFloat(list[index]?.provide);
                    }
                }
                else if(list[index]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة ناشفة'){
                    if(parseFloat(list[index]?.invoices_concretd_grade) == 0){
                        sum += parseFloat(list[index]?.provide);
                    }
                }
                else if(list[index]?.invoices_kind_type_of_concrete === val4) {
                    sum += parseFloat(list[index]?.provide);
                }
            }
        }
        return sum;
    }
    const checkIfMonthExist = (list, month) => {
        for (let index = 0; index < list?.length; index++) {
            if (list[index] == getJustMonth(month)) {
                return true;
            }
        }
        return false;
    }
    const GetAvgMonth = (list, val) => {
        let listMonths = NumberMonthsWorks();
        return (((NumberAllInvoices(list, val) / listMonths.length) * 10) - (((NumberAllInvoices(list, val) / listMonths.length) * 10) % 1)) / 10;
    }
    const GetMaxValueMonth = (list, val) => {
        let max = 0;
        let worksMonths = NumberMonthsWorks();
        let maxInMonth = 0;
        for (let index = 0; index < worksMonths?.length; index++) {
            for (let index1 = 0; index1 < list?.length; index1++) {
                if (worksMonths[index] === getJustMonth(list[index1]?.invoices_data)) {
                    if(list[index]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة مبلولة'){
                        if(parseFloat(list[index]?.invoices_concretd_grade) != 0){
                            maxInMonth += parseFloat(list[index1]?.provide);
                        }
                    }
                    else if(list[index]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة ناشفة'){
                        if(parseFloat(list[index]?.invoices_concretd_grade) == 0){
                            maxInMonth += parseFloat(list[index1]?.provide);
                        }
                    }
                    else if(list[index]?.invoices_kind_type_of_concrete === val4) {
                        maxInMonth += parseFloat(list[index1]?.provide);
                    }
                }
            }
            max = Math.max(max, maxInMonth);
            maxInMonth = 0;
        }
        return max;
    }
    const GetMinValueMonth = (list, val) => {
        let min = 9999999;
        let worksMonths = NumberMonthsWorks();
        let maxInMonth = 0;
        for (let index = 0; index < worksMonths?.length; index++) {
            for (let index1 = 0; index1 < list?.length; index1++) {
                if (worksMonths[index] === getJustMonth(list[index1]?.invoices_data)) {
                    if(list[index]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة مبلولة'){
                        if(parseFloat(list[index]?.invoices_concretd_grade) != 0){
                            maxInMonth += parseFloat(list[index1]?.provide);
                        }
                    }
                    else if(list[index]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة ناشفة'){
                        if(parseFloat(list[index]?.invoices_concretd_grade) == 0){
                            maxInMonth += parseFloat(list[index1]?.provide);
                        }
                    }
                    else if(list[index]?.invoices_kind_type_of_concrete === val4) {
                        maxInMonth += parseFloat(list[index1]?.provide);
                    }
                }
            }
            min = Math.min(min, maxInMonth);
            maxInMonth = 0;
        }
        return min;
    }

    const numberINvoINYear = (list, searchdate) => {
        let sum = 0;
        let search = searchdate ? searchdate : currentdate;
        for (let index = 0; index < list?.length; index++) {
            if (getJustYear(list[index]?.invoices_data) == getJustYear(search)) {
                if(list[index]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة مبلولة'){
                    if(parseFloat(list[index]?.invoices_concretd_grade) != 0){
                        sum += parseFloat(list[index]?.provide);
                    }
                }
                else if(list[index]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة ناشفة'){
                    if(parseFloat(list[index]?.invoices_concretd_grade) == 0){
                        sum += parseFloat(list[index]?.provide);
                    }
                }
                else if(list[index]?.invoices_kind_type_of_concrete === val4) {
                    sum += parseFloat(list[index]?.provide);
                }
            }
        }
        return sum;
    }
    const checkIfYearExist = (list, month) => {
        for (let index = 0; index < list?.length; index++) {
            if (list[index] == getJustYear(month)) {
                return true;
            }
        }
        return false;
    }
    const GetAvgYear = (list, val) => {
        let listYears = NumberMonthsWorks();
        return (((NumberAllInvoices(list, val) / listYears.length) * 10) - (((NumberAllInvoices(list, val) / listYears.length) * 10) % 1)) / 10;
    }
    const GetMaxValueYear = (list) => {
        let max = 0;
        let worksYears = NumberWorksYears();
        let maxInYear = 0;
        for (let index = 0; index < worksYears?.length; index++) {
            for (let index1 = 0; index1 < list?.length; index1++) {
                if(list[index1]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة مبلولة'){
                    if(parseFloat(list[index1]?.invoices_concretd_grade) != 0){
                        maxInYear += parseFloat(list[index1]?.provide);
                    }
                }
                else if(list[index1]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة ناشفة'){
                    if(parseFloat(list[index1]?.invoices_concretd_grade) == 0){
                        maxInYear += parseFloat(list[index1]?.provide);
                    }
                }
                else if(list[index1]?.invoices_kind_type_of_concrete === val4) {
                    maxInYear += parseFloat(list[index1]?.provide);
                }
            }
            max = Math.max(max, maxInYear);
            maxInYear = 0;
        }
        return max;
    }
    const GetMinValueYear = (list) => {
        let min = 9999999;
        let worksYears = NumberWorksYears();
        let maxInYear = 0;
        for (let index = 0; index < worksYears?.length; index++) {
            for (let index1 = 0; index1 < list?.length; index1++) {
                if(list[index1]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة مبلولة'){
                    if(parseFloat(list[index1]?.invoices_concretd_grade) != 0){
                        maxInYear += parseFloat(list[index1]?.provide);
                    }
                }
                else if(list[index1]?.invoices_kind_type_of_concrete === 'طينة' && val4 === 'طينة ناشفة'){
                    if(parseFloat(list[index1]?.invoices_concretd_grade) == 0){
                        maxInYear += parseFloat(list[index1]?.provide);
                    }
                }
                else if(list[index1]?.invoices_kind_type_of_concrete === val4) {
                    maxInYear += parseFloat(list[index1]?.provide);
                }
            }
            min = Math.min(min, maxInYear);
            maxInYear = 0;
        }
        return min;
    }




    const checkIfThereInList = (val) => {
        for (let index = 0; index < QuanOrPrice?.length; index++) {
            if (val === QuanOrPrice[index]) {
                return true;
            }
        }
        return false;
    }

    const GetLinesTables = (sum,avg,max,min,price,val4) => {
        return (
            <>
            <tr>
                <th colSpan={5} className="p-3 text-lg">{val4}</th>
            </tr>
                {
                    checkIfThereInList('الكمية') && <tr>
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
                        <th>الكمية</th>
                    </tr>
                }
                {
                    checkIfThereInList('السعر') && <tr>
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
                        <th>السعر</th>
                    </tr>
                }
            </>
        )
    }
    const GetNumberInvoices = () => {
        const sortedList = SortListInvoicesByDate(Invoices);
        let sum, avg, min, max;
        if (val1 === 'تلقائي' && val2 === 'يوم') {
            sum = numberINvoINDay(sortedList, currentdate, null, null, val4);
            console.log(sum)
            avg = GetAvgDay(sortedList, val4);
            max = GetMaxValueDay(sortedList, val4);
            min = GetMinValueDay(sortedList, val4);
            return QuanOrPrice != 0 && GetLinesTables(sum,avg,max,min,price,val4);
        }
        else if (val1 === 'تلقائي' && val2 === 'شهر') {
            sum = numberINvoINmonth(sortedList, currentdate, val4);
            avg = GetAvgMonth(sortedList, val4);
            max = GetMaxValueMonth(sortedList, val4);
            min = GetMinValueMonth(sortedList, val4);
            return QuanOrPrice != 0 && GetLinesTables(sum,avg,max,min,price,val4);
        }
        else if (val1 === 'تلقائي' && val2 === 'سنة') {
            sum = numberINvoINYear(sortedList, currentdate, val4);
            avg = GetAvgYear(sortedList, val4);
            max = GetMaxValueYear(sortedList, val4);
            min = GetMinValueYear(sortedList, val4);
            return QuanOrPrice != 0 && GetLinesTables(sum, avg, max, min, price, val4);
        }
        else if (val1 === 'تلقائي' && val2 === "الزمن الكلي") {
            let sum = 0;
            for (let index = 0; index < sortedList?.length; index++) {
                if (val4 === sortedList[index]?.invoices_kind_type_of_concrete) {
                    sum += parseFloat(sortedList[index]?.provide);
                }
                else if(parseFloat(sortedList[index]?.invoices_concretd_grade) != 0 && val4 === 'طينة مبلولة' && sortedList[index]?.invoices_kind_type_of_concrete === 'طينة'){
                    sum += parseFloat(sortedList[index]?.provide);
                }
                else if(parseFloat(sortedList[index]?.invoices_concretd_grade) == 0 && val4 === 'طينة ناشفة' && sortedList[index]?.invoices_kind_type_of_concrete === 'طينة'){
                    sum += parseFloat(sortedList[index]?.provide);
                }
            }
            return QuanOrPrice != 0 && (
                <>
                    <tr>
                        <th colSpan={5} className="p-3 text-lg">{val4}</th>
                    </tr>
                    {
                        checkIfThereInList('الكمية') && <tr>
                            <th>
                                {sum}
                            </th>
                            <th>
                                {sum}
                            </th>
                            <th>
                                {sum}
                            </th>
                            <th>
                                {sum}
                            </th>
                            <th>الكمية</th>
                        </tr>
                    }
                    {
                        checkIfThereInList('السعر') && <tr>
                            <th>
                                {sum * price}
                            </th>
                            <th>
                                {sum * price}
                            </th>
                            <th>
                                {sum * price}
                            </th>
                            <th>
                                {sum * price}
                            </th>
                            <th>السعر</th>
                        </tr>
                    }
                </>
            )
        }
        else if (val1 === 'محدد' && val2 === 'يوم') {
            let sum = numberINvoINDay(sortedList, dateSearch);
            let avg = GetAvgDay(sortedList, val4);
            let max = GetMaxValueDay(sortedList, val4);
            let min = GetMinValueDay(sortedList, val4);
            return QuanOrPrice != 0 && GetLinesTables(sum, avg, max, min, price, val4);
        }
        else if (val1 === 'محدد' && val2 === 'شهر') {
            sum = numberINvoINmonth(sortedList, "1/" + dateSearch);
            avg = GetAvgMonth(sortedList, val4);
            max = GetMaxValueMonth(sortedList, val4);
            min = GetMinValueMonth(sortedList, val4);
            return QuanOrPrice != 0 && GetLinesTables(sum, avg, max, min, price, val4);
        }
        else if (val1 === 'محدد' && val2 === 'سنة') {
            sum = numberINvoINYear(sortedList, "1/" + "1/" + dateSearch);
            avg = GetAvgYear(sortedList, val4);
            max = GetMaxValueYear(sortedList, val4);
            min = GetMinValueYear(sortedList, val4);
            return QuanOrPrice != 0 && GetLinesTables(sum, avg, max, min, price, val4);
        }
        else if (val1 === 'محدد' && val2 === "من - الى") {
            let convStartDate = `${getAllPropDate(dateSearch).year}-${getAllPropDate(dateSearch).month}-${getAllPropDate(dateSearch).day}`;
            let conveEndDate = `${getAllPropDate(endDateSearch).year}-${getAllPropDate(endDateSearch).month}-${getAllPropDate(endDateSearch).day}`;
            let daylist = getDaysArray(new Date(convStartDate), new Date(conveEndDate));
            sum = numberINvoINDay(sortedList, daylist, true);
            avg = GetAvgDay(sortedList, val4);
            max = GetMaxValueDay(sortedList, val4);
            min = GetMinValueDay(sortedList, val4);
            return QuanOrPrice != 0 && GetLinesTables(sum, avg, max, min, price, val4);
        }
    }

    return GetNumberInvoices();
}