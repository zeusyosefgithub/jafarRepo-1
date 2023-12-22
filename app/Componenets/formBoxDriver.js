'use client';
import { useState } from "react";
import GetTrucks from "./getDocs";


export default function FormBoxDriver(props) {

    let drivers = GetTrucks("drivers");
    let count = 1;


    return (
        <div className="w-full md:w-1/2 mx-auto fixed z-10 top-28 right-0 left-0 border-2 border-[#334155] rounded-xl">
            <div className="flex flex-col p-5 rounded-lg shadow bg-[#f5f5f5]">
                <div className="flex flex-col items-center text-center">
                    
                    <h2 className="mt-2 font-semibold text-black text-xl">قائمة السائقين</h2>
                    <p className="mt-2 text-sm text-black leading-relaxed w-full text-right text-xl">اختر سائق من القائمة لديك</p>
                </div>

                <div className="m-1 p-5 bg-white rounded-xl overflow-scroll h-72">
                    <table className="w-full text-center">
                        <tbody>
                            <tr className="border-4 border-[#334155]">
                                <th><p className="text-xl">ملاحظات</p></th>
                                <th><p className="text-xl">اسم السائق</p></th>
                                <th><p className="text-xl">رقم السائق</p></th>
                            </tr>
                            {
                                drivers.map(doc => {
                                    return <tr onClick={() => {props.getDriver(doc.driver_id);props.showDisableDriver(false)}} className="border-b-2 border-black text-lg margining_table">
                                        <td>{doc.driver_disc}</td>
                                        <td>{doc.driver_name}</td>
                                        <td>{doc.driver_id}</td>
                                        <td>({count++}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center mt-3">
                    <button onClick={() => props.showDisableDriver(false)} className="flex-1 px-4 py-2 bg-[#334155] hover:bg-yellow-600 text-white text-2xl font-medium rounded-md">
                        الغاء
                    </button>
                </div>
            </div>
        </div>
    )
}