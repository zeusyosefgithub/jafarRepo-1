'use client';
import { TbReportSearch } from "react-icons/tb";
import GetTrucks from "./Componenets/getDocs";

export default function Home() {

  const listInvoices = GetTrucks('invoices');
  const listShippings = GetTrucks('shipping');

  var date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let currentdate = `${day}/${month}/${year}`;

  const GetInvoByDate = (date) => {
    let count = 0;
    for (let index = 0; index < listInvoices.length; index++) {
      if(date === listInvoices[index]?.invoices_data){
        count++;
      }
    }
    return count;
  }

  const GetStartPrintInvoByDate = (date) => {
    let count = 0;
    for (let index = 0; index < listInvoices.length; index++) {
      if(date == listInvoices[index]?.invoices_data){
        for (let index1 = 0; index1 < listShippings.length; index1++) {
          if(listInvoices[index]?.invoices_id == listShippings[index1]?.invoice_id){
            count++;
          }
        }
      }
    }
    return count;
  }

  const GetNotDoneInvoByDate = (date) => {
    let count = 0;
    for (let index = 0; index < listInvoices.length; index++) {
      if(date === listInvoices[index]?.invoices_data && (listInvoices[index]?.provide < listInvoices[index]?.invoices_quantity)){
        count++;
      }
    }
    return count;
  }

  const GetDoneInvoByDate = (date) => {
    let count = 0;
    for (let index = 0; index < listInvoices.length; index++) {
      if(date === listInvoices[index]?.invoices_data && !(listInvoices[index]?.provide < listInvoices[index]?.invoices_quantity)){
        count++;
      }
    }
    return count;
  }

  const GetAllQuantityNumberByDate = (date) => {
    let count = 0;
    for (let index = 0; index < listInvoices.length; index++) {
      if(date === listInvoices[index]?.invoices_data){
        count += parseFloat(listInvoices[index]?.invoices_quantity);
      }
    }
    return count;
  }



  return (
    <div>
      <div className="flex justify-center">
        <div className="flex w-1/2 bg-slate-400 border-r-8 p-6 rounded border-r-[#334155] items-center">
          <div className="flex justify-around w-full text-xl"><div className="bg-[#334155] text-white p-2 rounded-xl flex items-center"><TbReportSearch className="text-2xl mr-2"/> التقارير العامة</div></div>
          <div className="left-0 w-56 text-xl">مصنع ابو جعفر كبها</div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-9/12 mt-20 flex">
          <div className="w-1/2 bg-gray-300 rounded border-r-4 border-r-[#334155]">
            <div className="text-2xl flex justify-center p-3">تقرير أمس</div>
            <div dir="rtl" className="p-5 text-xl">
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
          </div>
          <div className="mr-4 ml-5"></div>
          <div className="w-1/2 bg-gray-300 rounded border-r-4 border-r-[#334155]">
            <div className="text-2xl flex justify-center p-3">التقرير اليومي</div>
            <div dir="rtl" className="p-5 text-xl">
              <div>عدد الزبائن الذين اشتروا : {}</div>
              <div className="mt-3">عدد الفواتير التي تم اضافتها : {GetInvoByDate(currentdate)}</div>
              <div className="mt-3">عدد الفواتير التي تم البدأ في طباعتها : {GetStartPrintInvoByDate(currentdate)}</div>
              <div className="mt-3">عدد الفواتير المفتوحة : {GetNotDoneInvoByDate(currentdate)}</div>
              <div className="mt-3">عدد الفواتير المفلقة : {GetDoneInvoByDate(currentdate)}</div>
              <div className="mt-3">مجموع الاكواب التي تم تزويدها : {GetAllQuantityNumberByDate(currentdate)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
