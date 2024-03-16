'use client';
import NavBar from "./navBar";
import { useEffect, useState } from "react";
import { UserAuth } from "../FireBase/authContext";
import LogIn from "./logIn";
import GetTrucks from "./getDocs";
import NotAdmin from "./notAdmin";
import { NextUIProvider } from "@nextui-org/react";

export default function CheckAuth(props) {

    const [loading, setLoading] = useState(true);
    const { user, googleSignIn, logOut } = UserAuth();

    const Admins = GetTrucks("admins");
    const NotAnAdmin = () => {
        for (let index = 0; index < Admins.length; index++) {
            console.log(user.uid)
            if (user.uid === Admins[index].id) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        const checkAuth = async () => {
            await new Promise((res) => setTimeout(res, 50));
            setLoading(false);
        };
        checkAuth();
    }, [user])

    return (
        <div>
            {
                // user && !loading && !NotAnAdmin() ?
                // <>
                //     <NotAdmin/>
                // </>
                // :
                !loading && !user ?
                    <>
                        <LogIn />
                    </>
                    :
                    !loading && user ?
                        <div>
                            <NextUIProvider>
                                <div>
                                    <NavBar />
                                </div>
                                <div className='mt-10'>
                                    {props.children}
                                </div>
                            </NextUIProvider>
                        </div>
                        :
                        null
            }
        </div>
    )
}