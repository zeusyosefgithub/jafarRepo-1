'use client';
import { UserAuth } from "../FireBase/authContext";
import { CiLogout } from "react-icons/ci";

export default function LogOut() {

    const { user, googleSignIn, logOut } = UserAuth();

    const logout = async () => {
        try {
            await logOut();
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            {
                user && <button onClick={logout} className="test-fontt text-2xl bg-gray-400 p-3 rounded-3xl hover:bg-black hover:text-white flex items-center"><CiLogout className="mr-3 text-3xl"/> تسجيل خروج</button> 
            }
        </div>
    )
}