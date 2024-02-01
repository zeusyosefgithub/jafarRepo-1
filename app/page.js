'use client';
import { TbReportSearch } from "react-icons/tb";
import GetTrucks from "./Componenets/getDocs";
import EditBoard from "./Componenets/editBoard";
import { useEffect, useRef, useState } from "react";
import { MdEditDocument } from "react-icons/md";
import Reports from "./Componenets/reports";
import Charts from "./Componenets/charts";
import FormBoxDriver from "./Componenets/formBoxDriver";
import FormBox from "./Componenets/formBox";
import { firestore } from "./FireBase/firebase";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { ComponentToPrint } from "./Componenets/toPrint";
import { useReactToPrint } from "react-to-print";
import Report from "./Componenets/report";
import { Button } from "@nextui-org/button";

export default function Home() {

  const listInvoices = GetTrucks('invoices').sort(compareByAge);
  const listShippings = GetTrucks("shipping");

  const [showInvoEdit, setShowInvoEdit] = useState(false);
  const [invData, setInvData] = useState();
  const styleTabelLinsRefs = useRef([]);
  const [checkClickedInv, setCheckClickedInv] = useState(false);

  const [idIn, setidIn] = useState();
  const [driver, setDriver] = useState();
  const [truck, setTruck] = useState();
  const currentQuantityRef = useRef();
  const [errorMessageDriverTruck, setErrorMessageDriverTruck] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState();
  const [shippingToPrint, setShippingToPrint] = useState({});
  const [shwoHidePrint, setShowHidePrint] = useState(false);
  const [showTruck, setShowTruck] = useState(false);
  const [showDriver, setShowDriver] = useState(false);
  const componentRef = useRef();
  const [languge, setLanguge] = useState(false);
  const [eroorMessage, setErrorMessage] = useState("");



  const [currentRepoTable, setCurrentRepoTable] = useState(null);
  const [currentRepoCir, setCurrentRepoCir] = useState(null);
  const [currentRepoBar, setCurrentRepoBar] = useState(null);

  var date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let time = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  });
  let currentdate = `${day}/${month}/${year}`;
  let currenttime = `${time}/${day}/${month}/${year}`;

  function compareByAge(a, b) {
    return b.invoices_id - a.invoices_id;
  }

  const clearColorData = () => {
    for (let index = 0; index < styleTabelLinsRefs.current?.length; index++) {
      if (styleTabelLinsRefs.current[index] === "bordering_list") {
        styleTabelLinsRefs.current[index] = "";
      }
    }
  }

  const setClickedData = (invo, i) => {
    for (let index = 0; index < styleTabelLinsRefs.current?.length; index++) {
      if (styleTabelLinsRefs.current[index] === "bordering_list") {
        styleTabelLinsRefs.current[index] = "";
      }
    }
    styleTabelLinsRefs.current[i] = "bordering_list";
    setidIn(invo.invoices_id);
    setInvData(invo);
  }

  const getCurrentShippingNumber = () => {
    let sumSameShippings = 1;
    for (let index = 0; index < listShippings?.length; index++) {
      if (listShippings[index]?.invoice_id == invData.invoices_id) {
        sumSameShippings++;
      }
    }
    return sumSameShippings;
  }

  const handelAddPrint = async () => {
    let sumAllCurrentQuant2 = 0;
    let sumSameShippings1 = 1;
    for (let index = 0; index < listShippings?.length; index++) {
      if (listShippings[index]?.invoice_id == invData.invoices_id) {
        sumAllCurrentQuant2 += parseFloat(listShippings[index]?.current_quantity);
        sumSameShippings1++;
      }
    }
    const newData = {
      id: invData.id,
      invoices_id: invData.invoices_id,
      invoices_customer_id: invData.invoices_customer_id,
      invoices_customer_name: invData.invoices_customer_name,
      invoices_customer_street: invData.invoices_customer_street,
      invoices_customer_city: invData.invoices_customer_city,
      invoices_quantity: invData.invoices_quantity,
      invoices_concretd_grade: invData.invoices_concretd_grade,
      invoices_kind_material: invData.invoices_kind_material,
      invoices_kind_type_of_concrete: invData.invoices_kind_type_of_concrete,
      invoices_kind_egree_of_Exposure: invData.invoices_kind_egree_of_Exposure,
      invoices_pump: invData.invoices_pump,
      provide: sumAllCurrentQuant2,
      stayed: invData.stayed,
      invoices_data: invData.invoices_data
    };
    setInvData(newData);
    try {
      await updateDoc(doc(firestore, "invoices", newData.id), newData);
    }
    catch (e) {
      console.log(e);
    }
    handlePrint();
    setDriver(false);
    setTruck(false);
    setShowHidePrint(false);
    setCheckClickedInv(false);
    setInvData(null);
    setidIn(null);
    clearColorData();
    setCurrentQuantity(currentQuantityRef.current?.value)
    currentQuantityRef.current && currentQuantityRef.current.value == "";
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handelAddShpping = async () => {
    let counterShipps = listShippings?.length + 1;
    setErrorMessageDriverTruck("");
    if (!truck || !driver) {
      return setErrorMessageDriverTruck("!لم يتم اختيار خلاطه او سائق");
    }
    setErrorMessageDriverTruck("");
    if (!(invData?.provide >= invData?.invoices_quantity)) {
      if (currentQuantityRef.current.value > (invData?.invoices_quantity - invData?.provide)) {
        return setErrorMessage("خطاء,الكمية المزودة اعلى من الطلب الاجمالي!")
      }
      let shippingData = {
        shipp_id: counterShipps,
        current_quantity: currentQuantityRef.current.value,
        driver_name: driver,
        invoice_id: invData?.invoices_id,
        shipping_date: currenttime,
        truck_number: truck
      };
      setCurrentQuantity(currentQuantityRef.current?.value);
      setShippingToPrint(shippingData);
      try {
        await addDoc(collection(firestore, "shipping"), shippingData);
      }
      catch (e) {
        console.log(e);
      }
    }
    setShowHidePrint(true);
    setErrorMessage("");
  }

  return (
    <div>
      {
        showTruck && <FormBox getTruck={(truck) => setTruck(truck)} showDisable={() => setShowTruck(false)} />
      }
      {
        showDriver && <FormBoxDriver getDriver={(driver) => setDriver(driver)} showDisableDriver={() => setShowDriver(false)} />
      }

      <div className="flex pr-14 pl-14 pb-14">
        <div className="w-1/2">
          <div className="flex items-start max-h-96">
            <div className="w-1/2 overflow-auto max-h-96">
              {
                currentRepoTable && <Report repo={currentRepoTable} kind={currentRepoTable?.kind}/>
              }
            </div>
            <div className="m-10"></div>
            <div className="w-1/2 ">
              <div className="">
                {
                  currentRepoCir && <Report repo={currentRepoCir} kind={currentRepoCir?.kind} />
                }
              </div>
            </div>
          </div>
          <div>
            {
              currentRepoBar && <Report repo={currentRepoBar} kind={currentRepoBar?.kind}/>
            }
          </div>

        </div>
        <div className="m-10"></div>
        <div className="w-1/2">
          <div>
            <div className="bg-gray-400 p-3 text-center rounded-lg text-xl">الطلبيات المفتوحة</div>
            <div className="border-2 border-black">
              {
                checkClickedInv && shwoHidePrint ?
                  <div>
                    <div className="flex justify-end text-3xl mt-10 border-r-4 border-[#334155] bg-gray-300 p-3 rounded-lg">طباعة الفاتورة</div>
                    <div className="flex justify-around w-full mb-7 mt-10 p-3 items-center">
                      <div className="flex items-center rounded-xl p-2">
                        <label class="switch">
                          <input onChange={(e) => setLanguge(e.target.checked)} checked={languge} className="toggle_check" type="checkbox" />
                          <span class="slider round"></span>
                        </label>
                        <div className="text-xl ml-4"> انشاء باللغة العربية</div>
                      </div>
                      <button onClick={handelAddPrint} className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">طباعة</button>
                    </div>
                  </div>
                  :
                  checkClickedInv && !shwoHidePrint ?
                    <div>
                      <div className="">
                        {
                          getCurrentShippingNumber(invData) > 1 ? <div className="flex justify-around text-3xl mt-10 mb-7 bg-gray-300 p-3 rounded-lg"><div>الفاتورة رقم {idIn}</div><div>اضافة الارسالية رقم : {getCurrentShippingNumber(invData)}</div></div>
                            :
                            <div className="p-3 flex justify-around text-3xl mt-10 mb-7 bg-gray-300"><div>الفاتورة رقم {idIn}</div><div>اضافة الارسالية رقم : 1</div></div>
                        }


                        <div className="flex justify-around w-full mt-7">
                          <div className="">
                            {

                              driver ?
                                <div className="flex justify-around">
                                  <div className="text-center mr-2 flex items-center border-r-4 border-[#334155] bg-gray-200 p-2">
                                    <div>
                                      {
                                        driver
                                      }
                                      &nbsp;
                                    </div>
                                    <div>
                                      : لقد تم اختيار
                                    </div>
                                  </div>
                                  <div className="w-1/3">
                                    <button onClick={() => setDriver(null)} class="w-full bg-white border border-[#dc2626] hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                      <div className="text-xl font-bold text-[#dc2626]">ازالة</div>
                                    </button>
                                  </div>
                                </div>
                                :
                                <div className="">
                                  <button onClick={() => { setShowDriver(true); setShowTruck(false); }} class="w-full bg-white border border-black hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <div className="text-xl font-bold">اختر سائق</div>
                                  </button>
                                </div>
                            }

                          </div>
                          <div className="">
                            {
                              truck ?
                                <div className="flex justify-around">
                                  <div className="text-center mr-2 flex items-center border-r-4 border-[#334155] bg-gray-200 p-2">
                                    <div>
                                      {truck}
                                      &nbsp;
                                    </div>
                                    <div>
                                      : لقد تم اختيار
                                    </div>
                                  </div>
                                  <div className="w-1/3">
                                    <button onClick={() => setTruck(null)} class="w-full bg-white hover:bg-gray-400 border border-[#dc2626] text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                      <div className="text-xl font-bold text-[#dc2626]">ازالة</div>
                                    </button>
                                  </div>
                                </div>
                                :
                                <div className="">
                                  <button onClick={() => { setShowTruck(true); setShowDriver(false); }} class="w-full bg-white hover:bg-gray-400 border border-black text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <div className="text-xl font-bold">اختر الخلاطه</div>
                                  </button>
                                </div>
                            }
                          </div>
                          <div className="z-0 flex">
                            <div className="flex justify-center">
                              <input ref={currentQuantityRef} dir="rtl" type="number" name="urrentQuantity" id="urrentQuantity" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="الكمية الحالية" required />
                              <label dir="rtl" htmlFor="urrentQuantity" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                            </div>
                          </div>
                        </div>


                        {
                          errorMessageDriverTruck && <div dir="rtl" className="mt-5 text-[#dc2626] text-base">{errorMessageDriverTruck}</div>
                        }
                        {
                          eroorMessage && <div className="flex justify-end mt-5">
                            <div className="text-[#dc2626]">{eroorMessage}</div>
                          </div>
                        }
                        <div className="flex justify-center mt-8 mb-8" dir="rtl">
                          <button onClick={handelAddShpping} className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">ادخال</button>
                        </div>
                      </div>
                    </div>
                    :
                    null
              }
              <div className="overflow-auto max-h-96">

                <table className="w-full">
                  <tbody>
                    <tr className="sticky top-0 bg-[#334155] text-white">
                      <th className="text-xl">المتبقي</th>
                      <th className="text-xl">اجمالي الطلب</th>
                      <th className="text-xl">اسم الزبون</th>
                      <th className="text-xl">رقم الفاتورة</th>
                      <th className="text-xl">تعديل الفاتورة</th>
                    </tr>
                    {
                      listInvoices.map((invo, i) => {
                        return invo.invoices_quantity - invo.provide > 0 && <tr onClick={() => { setClickedData(invo, i); setCheckClickedInv(true) }} className={`hover:bg-[#334155] hover:text-white cursor-pointer ${styleTabelLinsRefs.current[i]}`}>{/*bordering_list*/}
                          <th className="text-base">{invo.invoices_quantity - invo.provide}</th>
                          <th className="text-base">{invo.invoices_quantity}</th>
                          <th className="text-base">{invo.invoices_customer_name}</th>
                          <th className="text-base">{invo.invoices_id}</th>
                          <th className="hover:bg-[#ef4444] hover:text-white" onClick={() => setShowInvoEdit(true)}><MdEditDocument className="m-auto text-xl" /></th>
                        </tr>
                      })
                    }
                    {
                      showInvoEdit ? <EditBoard showInv={() => setShowInvoEdit(false)} data={invData} /> : null
                    }
                  </tbody>
                </table>
                {
                  checkClickedInv && <div className="hide_invioc">
                    <ComponentToPrint inewInv={invData} shippingList={shippingToPrint} currentQuan={currentQuantity} languge={languge} ref={componentRef} />
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="m-10"></div>
          <div className="w-full flex">
            <div className="w-1/2"><Reports TakeRepo={(repo) => {repo.kind === 'جدول' ? setCurrentRepoTable(repo) : repo.kind === 'دائرة' ? setCurrentRepoCir(repo) : setCurrentRepoBar(repo) }} /></div>
            <div className="m-4"></div>
          </div>
        </div>
      </div>

    </div>
  )
}








{/* <div className="flex justify-center">
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
      </div> */}