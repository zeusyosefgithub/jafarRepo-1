'use client';
import { UserAuth } from "../FireBase/authContext";
import { CiLogout } from "react-icons/ci";

export default function NotAdmin(){

    const { user, googleSignIn, logOut } = UserAuth();

    const logout = async () => {
        try {
            await logOut();
        }
        catch (e) {
            console.log(e);
        }
    }

    return(
        <div className="absolute top-1/2">
            <div className="flex justify-center">
                <div className="text-3xl">
                    خطاء! ,الحساب الذي تم ادخالة لايملك الصلاحية للتحكم في هذا المشروع...
                </div>
                <button onClick={logout} className="mt-5 text-2xl bg-gray-400 p-3 rounded-3xl hover:bg-black hover:text-white flex items-center"><CiLogout className="mr-3 text-3xl"/> تسجيل خروج</button> 
            </div>
        </div>
    )
}