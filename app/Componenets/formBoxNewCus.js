'use client';
import { useRef, useState } from "react";
import GetTrucks from "./getDocs";


export default function FormBoxNewCus(props) {

    let drivers = GetTrucks("customers");
    let count = 1;
    const [get, setGet] = useState([]);
    const degreeOfExposureRef = useRef();
    const [resRadio, setResRadio] = useState("اسم الزبون");

    const GetSearchVal = () => {
        let SearchOutPut = [];
        if (degreeOfExposureRef.current?.value) {
            if (resRadio === "اسم الزبون") {
                for (let index = 0; index < drivers.length; index++) {
                    if (degreeOfExposureRef.current?.value == drivers[index]?.customer_name) {
                        SearchOutPut.push(
                            <tr onClick={() => { props.getNewCus(drivers[index]?.customer_id, drivers[index]); props.showDisableNewCus(false) }} className="styling_lines_lists bordering_list1">
                                <th className="text-lg">{drivers[index]?.customer_street}</th>
                                <th className="text-lg">{drivers[index]?.customer_city}</th>
                                <th className="text-lg">{drivers[index]?.customer_id}</th>
                                <th className="text-lg">{drivers[index]?.customer_name}</th>
                                <th className="text-lg">{count++}</th>
                            </tr>
                        )
                    }
                }
            }
            else{
                for (let index = 0; index < drivers.length; index++) {
                    if (degreeOfExposureRef.current?.value == drivers[index]?.customer_id) {
                        SearchOutPut.push(
                            <tr onClick={() => { props.getNewCus(drivers[index]?.customer_id, drivers[index]); props.showDisableNewCus(false) }} className="styling_lines_lists bordering_list1">
                                <th className="text-lg">{drivers[index]?.customer_street}</th>
                                <th className="text-lg">{drivers[index]?.customer_city}</th>
                                <th className="text-lg">{drivers[index]?.customer_id}</th>
                                <th className="text-lg">{drivers[index]?.customer_name}</th>
                                <th className="text-lg">{count++}</th>
                            </tr>
                        )
                    }
                }
            }
            setGet(SearchOutPut);
        }
        else{
            setGet(null);
        }
    }

    return (
        <div className="w-full md:w-1/2 mx-auto fixed z-10 top-32 right-0 left-0 border-2 border-[#334155] rounded-xl">
            <div className="flex flex-col p-5 rounded-lg shadow bg-[#f5f5f5]">
                <div className="flex flex-col items-center text-center">

                    <h2 className="mt-2 font-semibold text-black text-xl">قائمة الزبائن</h2>
                    <div className="mt-2 text-sm text-black leading-relaxed w-full text-right text-xl">اختر زبون من القائمة لديك</div>
                </div>

                <div>
                    <div className="border-r-4 border-[#334155] bg-gray-300 p-8 mb-5">
                        <div dir="rtl" className="mb-8 flex justify-around">
                            <label className="container w-64">اسم الزبون
                                <input onChange={(e) => setResRadio(e.target.value)} value={"اسم الزبون"} type="radio" defaultChecked name="radio" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container w-64">رقم الزبون
                                <input onChange={(e) => setResRadio(e.target.value)} value={"رقم الزبون"} type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>                     
                        </div>
                        <div className="" dir="rtl">
                            {
                                resRadio === "اسم الزبون" ?
                                    <>
                                        <label htmlFor="search" className="text-xl">بحث حسب : {resRadio}</label>
                                        <input className="bg-white rounded-xl mt-2 block w-1/3 py-2.5 px-0 text-xl text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" onChange={GetSearchVal} type="text" ref={degreeOfExposureRef} id="search" name="search" />
                                    </>
                                    :

                                    <>
                                        <label htmlFor="search" className="text-xl">بحث حسب : {resRadio}</label>
                                        <input className="bg-white rounded-xl mt-2 block w-1/3 py-2.5 px-0 text-xl text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" onChange={GetSearchVal} type="text" ref={degreeOfExposureRef} id="search" name="search" />
                                    </>
                            }

                        </div>
                    </div>
                </div>
                

                <div className="m-1 pr-5 pl-5 pb-5 bg-white rounded-xl overflow-scroll h-72">
                    <table className="w-full text-center">
                        <tbody>
                            <tr className="border-4 border-[#334155] sticky top-0 z-10 bg-[#334155] text-white">
                                <th><div className="text-xl">الشارع</div></th>
                                <th><div className="text-xl">العنوان</div></th>
                                <th><div className="text-xl">رقم الزبون</div></th>
                                <th><div className="text-xl">اسم الزبون</div></th>
                            </tr>
                            {
                                degreeOfExposureRef.current?.value ?
                                get
                                :
                                drivers.map(doc => {
                                    return <tr onClick={() => { props.getNewCus(doc.customer_id, doc); props.showDisableNewCus(false) }} className="border-b-2 border-black text-lg margining_table">
                                        <th className="text-lg">{doc.customer_street}</th>
                                        <th className="text-lg">{doc.customer_city}</th>
                                        <th className="text-lg">{doc.customer_id}</th>
                                        <th className="text-lg">{doc.customer_name}</th>
                                        <th className="text-lg">{count++}</th>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center mt-3">
                    <button onClick={() => props.showDisableNewCus(false)} className="flex-1 px-4 py-2 bg-[#334155] hover:bg-yellow-600 text-white text-2xl font-medium rounded-md">
                        الغاء
                    </button>
                </div>
            </div>
        </div>
    )
}