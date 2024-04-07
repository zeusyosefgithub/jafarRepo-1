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
import { addDoc, collection, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { ComponentToPrint } from "./Componenets/toPrint";
import { useReactToPrint } from "react-to-print";
import Report from "./Componenets/report";
import { Button } from "@nextui-org/button";
import { Input, Spinner } from "@nextui-org/react";
import { data } from "autoprefixer";
import { AiOutlinePlus } from "react-icons/ai";

export default function Home() {

  const [loading,setLoading] = useState(false);

  const CustomersDeatils = GetTrucks('CustomerDetails');
  const listInvoices = GetTrucks('invoices').sort(compareByAge);
  const listShippings = GetTrucks("shipping");
  const listRaws = GetTrucks("RawMaterials");
  const Customers = GetTrucks('customers');

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

  const PreventMultipleClickAddShipp = useRef(null);
  const PreventMultipleClickPrint = useRef(null);

  const [isLocated, setIsLocated] = useState(false);
  const [locationVal, setLocationVal] = useState('');

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
    setCheckClickedInv(true);
    if (shwoHidePrint) {
      setShowHidePrint(false);
      setDriver(false);
      setTruck(false);
      setShowHidePrint(false);
      setIsLocated(false);
      setLocationVal(null);
      clearColorData();
      setCurrentQuantity(currentQuantityRef.current?.value)
      currentQuantityRef.current && currentQuantityRef.current.value == "";
    }
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
    setLoading(true);
    PreventMultipleClickPrint.current.disabled = true;
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
    setIsLocated(false);
    setLocationVal(null);
    clearColorData();
    setCurrentQuantity(currentQuantityRef.current?.value)
    currentQuantityRef.current && currentQuantityRef.current.value == "";
    setLoading(false);
    PreventMultipleClickPrint.current.disabled = false;
  }
  const handlePrint = useReactToPrint({
  //   pageStyle: `@page {
  //     size: A5 landscape;
  //     margin: 0;
  // }`,
    content: () => componentRef.current,
  });

  const currectShippId = () => {
    let maxValue = 0;
    for (let index = 0; index < listShippings?.length; index++) {
      maxValue = Math.max(maxValue, listShippings[index]?.shipp_id)
    }
    return maxValue + 1;
  }

  function GetCustomerPassword() {
    for (let index = 0; index < Customers.length; index++) {
      if (Customers[index].customer_id === invData.invoices_customer_id){
        return Customers[index].password;
      }
    }
    return;
  }

  const handelAddShpping = async () => {
    let counterShipps = currectShippId();
    setErrorMessageDriverTruck("");
    if (!truck || !driver) {
      return setErrorMessageDriverTruck("!لم يتم اختيار خلاطه او سائق");
    }
    setErrorMessageDriverTruck("");
    if (!(invData?.provide >= invData?.invoices_quantity)) {
      if (currentQuantityRef.current.value > (invData?.invoices_quantity - invData?.provide)) {
        return setErrorMessage("خطاء,الكمية المزودة اعلى من الطلب الاجمالي!")
      }
      setLoading(true);
      PreventMultipleClickAddShipp.current.disabled = true;
      let shippingData = {
        shipp_id: counterShipps,
        current_quantity: currentQuantityRef.current.value,
        driver_name: driver,
        invoice_id: invData?.invoices_id,
        shipping_date: currenttime,
        truck_number: truck,
        location: isLocated ? locationVal : null
      };
      GetShippingInCustomerDitails(shippingData);
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
    setLoading(false);
    PreventMultipleClickAddShipp.current.disabled = false;
  }


  const sendWhatsaap = () => {
    var phoneNumber = "+972506742582";

    var url = "https://wa.me/" + phoneNumber + "?text="
      + "*Name :* " + "mahmod" + "%0a";

    window.open(url, '_blank').focus();
  }

  function GetDocCustomerDitails(){
    for (let index = 0; index < Customers.length; index++) {
      if(Customers[index].customer_id === invData.invoices_customer_id){
        return Customers[index].password;
      } 
    }
  }

  async function GetShippingInCustomerDitails(shippingData) {
    for (let index = 0; index < CustomersDeatils.length; index++) {
      if (CustomersDeatils[index].id === GetDocCustomerDitails()) {
        let InvoicesCustomerD = CustomersDeatils[index].Invoices;
        for (let index = 0; index < InvoicesCustomerD.length; index++) {
          if (InvoicesCustomerD[index].invoices_id === invData?.invoices_id) {
            InvoicesCustomerD[index].shippings.push(shippingData);
          }
        }
        return await updateDoc(doc(firestore,'CustomerDetails',CustomersDeatils[index].id),{Invoices : InvoicesCustomerD});
      }
    }
  }

  return (
    <div>
      {
        showDriver && <FormBoxDriver showDriver={showDriver} disable={() => setShowDriver(false)} getDriver={(driver) => setDriver(driver)} />
      }
      {
        showTruck && <FormBox showTruck={showTruck} disable={() => setShowTruck(false)} getTruck={(truck) => setTruck(truck)} />
      }
      {
        showInvoEdit && <EditBoard data={invData} showInvoEdit={showInvoEdit} disable={() => setShowInvoEdit(false)} />
      }

      {loading && <Spinner className="fixed left-1/2 top-1/2 z-50" size="lg" />}
      {/* {
        showTruck && <FormBox getTruck={(truck) => setTruck(truck)} showDisable={() => setShowTruck(false)} />
      }
      {
        showDriver && <FormBoxDriver getDriver={(driver) => setDriver(driver)} showDisableDriver={() => setShowDriver(false)} />
      } */}

      <div className="flex pr-14 pl-14 pb-14">


        {/* <div>
          <Button onClick={sendWhatsaap}>Send</Button>
        </div> */}

        <div className="w-1/2">
          <div className="flex items-start">
            <div className="w-1/2">
              <div className="bg-slate-100 shadow-xl p-3 highting_boxes_tabel_cir rounded-xl">
                {
                  currentRepoCir && <div className="text-base flex justify-center m-5 text-black bg-gray-400 rounded-xl" dir="rtl">
                    <div className="m-2">رقم : {currentRepoCir?.idRep}</div>
                    <div className="m-2">اسم : {currentRepoCir?.RebortName}</div>
                  </div>
                }
                <div className="flex justify-center">
                  {
                    currentRepoCir && <Report repo={currentRepoCir} kind={currentRepoCir?.kind} />
                  }
                </div>
              </div>
            </div>
            <div className="m-10"></div>
            <div className="w-1/2">
              <div className="bg-slate-100 shadow-xl p-3 highting_boxes_tabel_cir rounded-xl">
                {
                  currentRepoTable && <div className="text-base flex justify-center m-5 text-black bg-gray-400 rounded-xl" dir="rtl">
                    <div className="m-2">رقم : {currentRepoTable?.idRep}</div>
                    <div className="m-2">اسم : {currentRepoTable?.RebortName}</div>
                  </div>
                }
                <div className="flex justify-center overflow-auto max-h-96">
                  {
                    currentRepoTable && <Report repo={currentRepoTable} kind={currentRepoTable?.kind} />
                  }
                </div>
              </div>

            </div>
          </div>
          <div className="bg-slate-100 shadow-xl p-3 highting_boxes_tabel_cir rounded-xl mt-10">
            {
              currentRepoBar && <div className="text-base flex justify-center m-5 text-black bg-gray-400 rounded-xl" dir="rtl">
                <div className="m-2">رقم : {currentRepoBar?.idRep}</div>
                <div className="m-2">اسم : {currentRepoBar?.RebortName}</div>
              </div>
            }
            <div>
              {
                currentRepoBar && <Report repo={currentRepoBar} kind={currentRepoBar?.kind} />
              }
            </div>
          </div>

        </div>
        <div className="m-10"></div>
        <div className="w-1/2">
          <div className="bg-slate-100 shadow-xl p-7 rounded-xl">
            <div className="bg-gray-400 p-3 text-center rounded-lg text-xl">الطلبيات المفتوحة</div>
            <div className="">
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
                      <button ref={PreventMultipleClickPrint} onClick={handelAddPrint} className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">طباعة</button>
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

                        <div dir="rtl" className="mr-7 flex items-center">
                          {
                            isLocated ?
                              <Button onClick={() => setIsLocated(false)}>اضافة موقع</Button> :
                              <Button onClick={() => setIsLocated(true)}>بدون موقع</Button>
                          }
                          {
                            isLocated &&
                            <Input value={locationVal} onValueChange={(val) => { setLocationVal(val) }} color="primary" size="sm" className="w-1/4 m-5" label="اسم الموقع" />
                          }
                        </div>
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
                                    <Button color="danger" variant="bordered" size="lg" onClick={() => setDriver(null)}>
                                      <div className="text-xl font-bold text-[#dc2626]">ازالة</div>
                                    </Button>
                                  </div>
                                </div>
                                :
                                <div className="">
                                  <Button size="lg" onClick={() => setShowDriver(true)}><AiOutlinePlus />اختر سائق</Button>
                                 
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
                                    <Button color="danger" variant="bordered" size="lg" onClick={() => setTruck(null)} >
                                      <div className="text-xl font-bold text-[#dc2626]">ازالة</div>
                                    </Button>
                                  </div>
                                </div>
                                :
                                <div className="">
                                  <Button size="lg" onClick={() => setShowTruck(true)}><AiOutlinePlus/>اختر الخلاطه</Button>
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
                          <button ref={PreventMultipleClickAddShipp} onClick={handelAddShpping} className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">ادخال</button>
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
                        return invo.invoices_quantity - invo.provide > 0 && <tr onClick={() => { setClickedData(invo, i); }} className={`hover:bg-[#334155] hover:text-white cursor-pointer ${styleTabelLinsRefs.current[i]}`}>{/*bordering_list*/}
                          <th className="text-base">{invo.invoices_quantity - invo.provide}</th>
                          <th className="text-base">{invo.invoices_quantity}</th>
                          <th className="text-base">{invo.invoices_customer_name}</th>
                          <th className="text-base">{invo.invoices_id}</th>
                          <th className="bg-slate-100"><Button color="primary" onClick={() => {setInvData(invo);setShowInvoEdit(true)}}>تعديل</Button></th>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
                {
                  checkClickedInv && <div className="hide_invioc">
                    <ComponentToPrint isLocated={isLocated} inewInv={invData} shippingList={shippingToPrint} currentQuan={currentQuantity} languge={languge} ref={componentRef} />
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="m-10"></div>
          <div className="w-full flex">
            <div className="w-full">
              <div className="bg-slate-100 shadow-xl p-7 rounded-xl">
              <Reports TakeRepo={(repo) => { repo.kind === 'جدول' ? setCurrentRepoTable(repo) : repo.kind === 'دائرة' ? setCurrentRepoCir(repo) : setCurrentRepoBar(repo) }} /></div>
              </div>
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