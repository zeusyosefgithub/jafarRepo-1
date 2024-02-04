'use client';

export default function FormBoxEditReport(props) {

    const SaveReport = () => {

    }
    return(
        <div className="w-full md:w-9/12 mx-auto fixed z-10 top-32 right-0 left-0 border-2 border-[#334155] rounded-xl">
            <div className="flex flex-col p-5 rounded-lg shadow bg-[#f5f5f5]">
                <div className="flex flex-col items-center text-center">
                    <h2 className="mt-2 font-semibold text-black text-xl">تعديل التقرير</h2>
                </div>
                <div className="m-1 pr-5 pl-5 pb-5 bg-white rounded-xl overflow-auto form_Box_Charts_Reports">
                    <div className="flex">

                    </div>

                </div>

                <div className="flex items-center mt-3">
                    <button onClick={() => props.disable()} className="flex-1 px-4 py-2 bg-[#334155] hover:bg-yellow-600 text-white text-2xl font-medium rounded-md">
                        الغاء
                    </button>
                    <div className="mr-16 ml-16"/>
                    <button onClick={SaveReport} className="flex-1 px-4 py-2 bg-[#334155] hover:bg-green-800 text-white text-2xl font-medium rounded-md">
                        حفظ
                    </button>
                </div>
            </div>
        </div>
    )
}