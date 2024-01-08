'use client';
import { UserAuth } from "../FireBase/authContext";

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
                user && <button onClick={logout} className="p-6 bg-black text-white mr-5">logOut</button> 
            }
        </div>
    )
}