'use client';
import { Button } from "@nextui-org/button";
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
                user && <Button dir="ltr" onClick={logout} color="danger" className="" variant="flat">
                <CiLogout className="mr-3 text-3xl"/>تسجيل خروج 
            </Button>
            }
        </div>
    )
}